import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../header/custom-validators';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profileForm:FormGroup;
  constructor(private toastr: ToastrService,private router:Router, private fb:FormBuilder,private userservice:UserService,private authsevice:AuthService) { }
  onshow(){
    $("#exampleModal").modal("show");
  }
  ngOnInit() {


    this.profileForm = this.fb.group({
      Emailid1:['',[Validators.required,Validators.email]],
      password1: [ null, [Validators.required,Validators.compose([CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[!@#\$%\^&]/, { haslengthCase: true }),
       ,
       ]), Validators.minLength(8)]],
    });
  
  }
//submit event for login with database find method
  onSubmit1(event) {
    event.preventDefault();
    //subscribe to node
    this.userservice.postemployee1(this.profileForm.value).subscribe((res:any) => {
      if(res.status==1){
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(res);
        localStorage.setItem("user",JSON.stringify(res.message));
        $("#exampleModal11").modal("hide");
        this.router.navigate(["/loggedin"]);
        this.toastr.success('successfully login');
      }
      else if(res.status==2){
        this.toastr.error('Invalid Password');
      }
      else{
        this.toastr.error('Invalid Email-Id');
      }
    });
  }
  
}