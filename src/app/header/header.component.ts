import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from "@angular/forms";
import { Validators } from "@angular/forms";
import { CustomValidators } from "../header/custom-validators";
import { Router } from "@angular/router";
import { Employee} from '../employeemodel.module';
import { UserService } from "../user.service";
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  firstname: string;
  profileForm: FormGroup;
  postemployee: any;
  firstName:String;
  isloggedin : boolean;
  constructor(  private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userservice: UserService,
    private authservice:AuthService) { }

  ngOnInit() {

    //for header dynamic view

    if(localStorage.getItem('user')){
      this.isloggedin = true
    }else{
      this.isloggedin = false
    }
    console.log("INSIDE ONINIT OF HEADER")

    //for display of firstname from localstorage in header

  var user=JSON.parse(localStorage.getItem("user"));
  if(localStorage.getItem('user')){
      var user=JSON.parse(localStorage.getItem("user"));
  console.log(user.firstName);
  this.firstName=user.firstName;
  }
  else{
    this.firstName="";
  }
  //validations for register pages
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


  onshow(){
     //for register modal show
    $("#exampleModal").modal("show");
  }
 
  onshow1(){
     //for login modal show
    $("#exampleModal11").modal("show");
  }
  onSubmit(event) {
  //register submit event
    event.preventDefault();
  
//add to database req
    this.userservice.postemployee(this.profileForm.value).subscribe((res:any) => {
      console.log("successfulLy added to database" + this.profileForm.value);
      
      if(res.status){
        this.toastr.success('successfully registerd');
        $("#exampleModal").modal("hide");
        this.profileForm.reset();
      }
      else{
        this.toastr.warning('This email is already registered');
        
      }
      console.log("********************************************")
      console.log(res.status);
      this.refreshemployeelist();     
    });
    
  }

    // onreset(event){
    //   event.preventDefault();
    //   this.firstname = this.profileForm.value;
    //   console.log(this.firstname);
    //   if(this.firstname){
    //     this.profileForm.value.reset();
    //     this.profileForm= this.fb.group({
    //       _id:"",
    //       firstName: "",
    //       lastname:"",
    //       email: "",
    //       password:"",
    //     })
    //     console.log("object");
    //   }
    //     }
    
      // onlogin() {
      //   this.router.navigate(["/login"]);
      //   $("#exampleModal").modal("hide");
        
      // }


      //for logout of content
      loggedout(){
        localStorage.removeItem("user");
        this.router.navigate(['/login']);
      }
      //take response from node and store it in user service
      refreshemployeelist(){
        this.userservice.getemployeelist().subscribe((res)=>{
          this.userservice.employees=res as Employee[];
        })
      }

      /**
       * for update and delete data from database
       */

    //   onupdate(emp:Employee){
    // this.userservice.selectedemployee =emp;
    // console.log(emp)
    //   }
      // ondelete(id:string,profileForm:NgForm){
      //   if(confirm('are you sure you want to delete this entry')==true){
      //     this.userservice.deleteemployerr(id).subscribe((res)=>{
      //       console.log('delete successfully');
      //       this.refreshemployeelist();
      //     });
      //   }
      // }
}



