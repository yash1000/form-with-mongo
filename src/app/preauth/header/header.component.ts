import { Component, OnInit, OnChanges } from "@angular/core";
import { FormGroup, FormBuilder, NgForm } from "@angular/forms";
import { Validators } from "@angular/forms";
import { CustomValidators } from "./custom-validators";
import { Router } from "@angular/router";
import { Employee } from "../../module/employeemodel.module";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "../login/login.component";
import { ProfileComponent } from "../../afterauth/profile/profile.component";
import { isNullOrUndefined } from 'util';

declare var $: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  firstname: string;
  profileForm: FormGroup;
  closeResult: string;
  postemployee: any;
  firstName: String;
  isloggedin: boolean;
  img1: any;
  imgheader: any;
  constructor(
    private ngxService: NgxUiLoaderService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userservice: UserService,
    private authservice: AuthService,
    private modalService: NgbModal
  ) {}

  //modal open for ng template view
  open1(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
        }
      );
  }
  private getDismissReason1(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  //modal open for profile component

  open2(content) {
    this.modalService
      .open(ProfileComponent, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason2(reason)}`;
        }
      );
  }
  private getDismissReason2(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  //modal open for login component
  open() {
    this.modalService
      .open(LoginComponent, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    //for header dynamic view



    
    if (localStorage.getItem("user")) {
      this.isloggedin = true;
      console.log("loggedin true")
    } else {
      this.isloggedin = false;
      console.log("loggedin true")
    }
    
    var userfull = JSON.parse(localStorage.getItem("user"));

    if (localStorage.getItem("user")) {
      var user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      console.log("on user")
      this.imgheader=user.message.filename;
      if(user.message!=isNullOrUndefined){
        console.log("asdasdsadf")
      this.firstName = user.message.firstName;
      }else{
        this.firstName=user.name
      }
      if (user.message.img == null) {
        if(user.message.loginwith=="google"){
          this.img1 = user.message.filename;
        }else{
          if(user.message.filename){
        this.img1 = "http://localhost:8000/images/" + user.message.filename;}
      else{
        this.img1='';
      }}
      } else {
        this.img1 = user.message.img;
      }
    } else {
      this.firstName = "";
    }













    this.refreshemployeelist();
    this.profileForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      Emailid: ["", [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.compose([
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            CustomValidators.patternValidator(/[!@#\$%\^&]/, {
              haslengthCase: true
            }),
            ,
          ]),
          Validators.minLength(8)
        ]
      ]
    });
  }

  //button submit event of form
  onSubmit(event) {
    event.preventDefault();
    this.ngxService.start();
    this.userservice
      .registration(this.profileForm.value)
      .subscribe((res: any) => {
        if(res){
          this.ngxService.stop();
        }
        if (res.status) {
          this.toastr.success("successfully registerd");
          this.profileForm.reset();
        } else {
          this.toastr.warning("This email is already registered");
        }
        this.refreshemployeelist();
        this.modalService.dismissAll();
        this.open();
      });
  }

  //for logout of content

  loggedout() {
    localStorage.removeItem("user");
    this.router.navigate(["/header"]);
  }

  //take response from node and store it in user service on change refresh method
  refreshemployeelist() {
    this.userservice.getemployeelist().subscribe(res => {
      this.userservice.employees = res as Employee[];
    });
  }
}
