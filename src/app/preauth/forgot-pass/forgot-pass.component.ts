import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  profileForm: FormGroup;
  condition: any;

  constructor(private ngxService: NgxUiLoaderService,private userservice:UserService, private fb:FormBuilder) { }

  ngOnInit() {
    // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    

      this.profileForm = this.fb.group({
      Emailid1:['',[Validators.required]],
      });
  }
  onSubmit1(event) {

    event.preventDefault();
    this.ngxService.start();
    this.userservice.forgotpassword(this.profileForm.value).subscribe((res:any) => {
      this.ngxService.stop();
this.condition=res.message;
if(res){
  this.ngxService.stop();
}
      if(res.message=="email send successfully!"){
        console.log(res.message)
      }
      if(res.message=="Error in sending email!"){
        console.log(res.message)
      }
    });
  }











}
