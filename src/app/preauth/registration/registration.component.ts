import { Component, OnInit } from "@angular/core";
import { AuthService as GoogleAuthService} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
// import { FormControl, FormGroup, FormBuilder, NgForm } from "@angular/forms";
// import { Validators } from "@angular/forms";
// import { CustomValidators } from "../header/custom-validators";
// import { Router } from "@angular/router";
// import { UserService } from '../user.service';
// import { Employee} from '../employeemodel.module';
// import { UserService } from "../user.service";
// import { format } from "url";
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  // firstname: string;
  // profileForm: FormGroup;
  // postemployee: any;

  constructor(
    private authforgoogle:GoogleAuthService,
    // private toastr: ToastrService,
    // private fb: FormBuilder,
    // private router: Router,
    // private userservice: UserService
  ) {}

  // onSubmit(event) {
     
  //   event.preventDefault();
  //   this.firstname = this.profileForm.value;
  //   console.log(this.profileForm.value);

  //   var firstname = this.profileForm.value;
  //   var lastname = this.profileForm.controls["lastName"].value;
  //   console.log(firstname);
  //   console.log(lastname);

  //   this.userservice.postemployee(this.profileForm.value).subscribe(res => {
  //     console.log("successfulky added" + this.profileForm.value);
  //     this.onreset();
  //     this.refreshemployeelist();
  //   });
  // }

  ngOnInit() {
//   this.refreshemployeelist();
//     this.profileForm = this.fb.group({
//       firstName: ["", [Validators.required, Validators.minLength(3)]],
//       lastName: ["", [Validators.required, Validators.minLength(3)]],
//       Emailid: ["", [Validators.required, Validators.email]],
//       password: [
//         null,
//         [
//           Validators.required,
//           Validators.compose([
//             CustomValidators.patternValidator(/\d/, { hasNumber: true }),
//             CustomValidators.patternValidator(/[A-Z]/, {
//               hasCapitalCase: true
//             }),
//             CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
//             CustomValidators.patternValidator(/[!@#\$%\^&]/, {
//               haslengthCase: true
//             }),
//             ,
//           ]),
//           Validators.minLength(8)
//         ]
//       ]

//       // password:['',[Valid  ators.required,Validators.pattern("(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,12}")]]
//     });
    
//   }
//   // onreset() {
//     // for (let firstName in this.profileForm.controls) {
//     //     this.profileForm.controls[firstName].updateValueAndValidity();
//     //     this.profileForm.controls[firstName].setErrors(null);
//     // }
//     onreset(profileForm?:NgForm){
//   if(profileForm){
//     profileForm.reset();
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
//   onlogin() {
//     this.router.navigate(["/login"]);
//   }
//   // onSubmit(){
//   // this.userservice.register(JSON.stringify(this.profileForm.value)).subscribe(
//   //   data=>{console.log(data);this.router.navigate(['/login'])},
//   //   error=>console.log(error)
//   // )}

//   refreshemployeelist(){
//     this.userservice.getemployeelist().subscribe((res)=>{
//       this.userservice.employees=res as Employee[];
//     })
//   }
//   onupdate(emp:Employee){
// this.userservice.selectedemployee =emp;
// console.log(emp)
//   }
//   ondelete(id:string,profileForm:NgForm){
//     if(confirm('are you sure you want to delete this entry')==true){
//       this.userservice.deleteemployerr(id).subscribe((res)=>{
//         console.log('delete successfully');
//         this.refreshemployeelist();
//       });
//     }
//   }
}

signinwithgoogle(platform:any):void{
  platform=GoogleLoginProvider.PROVIDER_ID;
  this.authforgoogle.signIn(platform).then((Response)=>{
    console.log(platform);
    console.log(Response);
    console.log("from google")
  })
    }
    signoutwithgoogle(){
      this.authforgoogle.signOut();
      console.log("sign out bro....")
    }
}