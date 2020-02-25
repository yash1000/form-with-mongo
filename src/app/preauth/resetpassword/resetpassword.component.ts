import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  profileForm: FormGroup;
  userId: any;

  constructor(private activatedRoute: ActivatedRoute, private fb:FormBuilder,private userservice:UserService) { }

  ngOnInit() {

    this.profileForm = this.fb.group({
      password:['',[Validators.required]],
      password1:['',[Validators.required]],
      token:['']
    });
  
  
  }
  onSubmit1(event){
    console.log(this.profileForm.value);
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['token'];
      console.log(this.userId);
    });
    this.profileForm.value.token=this.userId;
    // Object.assign({},this.profileForm,{"token":this.userId});
    // this.profileForm.token=
    console.log(this.profileForm.value)
    this.userservice.resetpassword(this.profileForm.value).subscribe((res:any) => {

    })
  }
}
