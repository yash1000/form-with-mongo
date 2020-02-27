import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { CustomValidators } from '../header/custom-validators';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  profileForm: FormGroup;
  userId: any;
  content: any;

  constructor(private ngxService: NgxUiLoaderService,private activatedRoute: ActivatedRoute, private fb:FormBuilder,private userservice:UserService) { }

  ngOnInit() {

    this.profileForm = this.fb.group({
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
      ],
      password1:['',[Validators.required,Validators.compose([CustomValidators.matchValues('password')])]],
      token:['']
    });
  
  
  }
  onSubmit1(event){
    console.log(this.profileForm.value);
    this.ngxService.start();
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['token'];
      console.log(this.userId);
    });
    this.profileForm.value.token=this.userId;
    console.log(this.profileForm.value)
    this.userservice.resetpassword(this.profileForm.value).subscribe((res:any) => {
      if(res){
        this.ngxService.stop();
      }
      console.log("response")
      console.log(res.message)
      this.content=res.message;
      this.profileForm.reset();
    })
  }
}
