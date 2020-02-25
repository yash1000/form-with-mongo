import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private userservice:UserService, private fb:FormBuilder) { }

  ngOnInit() {
      this.profileForm = this.fb.group({
      Emailid1:['',[Validators.required]],
      });
  }
  onSubmit1(event) {

    event.preventDefault();
    this.userservice.forgotpassword(this.profileForm.value).subscribe((res:any) => {
    });
  }











}
