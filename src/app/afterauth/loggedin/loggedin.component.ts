import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader'; 
import { UserService } from "../../services/user.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../modal/modal.component";
import { NgForm } from "@angular/forms";
import { Employee } from "../../module/employeemodel.module";
declare var $: any;

@Component({
  selector: "app-loggedin",
  templateUrl: "./loggedin.component.html",
  styleUrls: ["./loggedin.component.css"]
})
export class LoggedinComponent implements OnInit, AfterViewChecked {
  firstName: String;
  username: String;
  ids: Number;
  closeResult: String;
  rows = [];
  columns;
  obj: any;
  mymodel: any;
  img1: any;
  img: {
    prop: string;
  }[];
  constructor(
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private authsevice: AuthService,
    private router: Router,
    private userservice: UserService
  ) {}

  getvaluebeforemodalopen(event) {
    this.obj = this.rows.filter(m => m._id == event);
    this.obj = this.obj[0];
    this.updatemodal(event);
  }
  //open modal for update value
  updatemodal(content) {
    this.mymodel = this.modalService.open(ModalComponent, {
      ariaLabelledBy: "modal-basic-title"
    });
    this.mymodel.componentInstance.rows = this.obj;
    this.mymodel.result.then(
      result => {
        this.getdata();
      },
      reason => {
        this.getdata();
      }
    );
  }
  getDismissReason2(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  //method for colseing modal
  closeModal() {
    this.getdata();
  }
  dtOptions: DataTables.Settings = {};
  





  open(content,id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result==="yes click"){
        this.ondelete(id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  //getdata function from backend
  getdata() {
    this.ngxService.start();
    this.userservice.getemployeelist().subscribe((emp: any) => {
      if(emp){
        this.ngxService.stop();
      }
      this.rows = [];
      this.rows = emp;
      this.columns = [];
      this.columns = [
        {
          prop: "firstName"
        },
        {
          prop: "lastName"
        },
        {
          prop: "Emailid"
        }
      ];
    });
  }

  ngAfterViewChecked() {
    if (!$("#example1_first").html()) {
      $("#example1 #example1_first").html(
        "<i style='font-size:24px' class='fa'>&#xf101;</i>"
      );
    }
  }
  ngOnInit() {
    this.dtOptions = {
      lengthMenu: [3, 5, 10, 20],
      pagingType: "full_numbers",
      info: false,
      pageLength: 3,
      language: {
        paginate: {
          first: `<i style="font-size:24px" class="fa">&#xf100;</i>`,
          last: `<i style="font-size:24px" class="fa">&#xf101;</i>`,
          next: `<i style="font-size:24px" class="fa">&#xf105;</i>`,
          previous: `<i style="font-size:24px" class="fa">&#xf104;</i>`
        },
        searchPlaceholder: `Search...`,
        search: `<i class="fa fa-search" aria-hidden="true"></i>`
        // showNEntries : false
      }
    };
    var user = JSON.parse(localStorage.getItem("user"));
    this.firstName = user.firstName;
    this.getdata();
  }

  loggedout() {
    this.router.navigate(["/login"]);
  }
  refreshemployeelist() {
    this.ngxService.start();
    this.userservice.getemployeelist().subscribe(res => {
      if(res){
        this.ngxService.stop();
      }
    
      this.userservice.employees = res as Employee[];
    });
  }
  ondelete(id: string) {
    // console.log(id)
    this.ngxService.start();
    this.userservice.deleteemployerr(id).subscribe(res => {
      if(res){
        this.ngxService.stop();
      }
    }); 
  }
}
