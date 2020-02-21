import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
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
    
    console.log(this.profileForm.value);
    this.userservice.postemail(this.profileForm.value).subscribe((res:any) => {
//       if(res.status==1){
//         console.log("oh yeh")
//       }
//       else{
// console.log("oh no"+res)
//       }
    });
  }











}
