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
      image:['',[Validators.required]],
    });
  
  }
  

// _id:Number;
  onSubmit1(event) {
    event.preventDefault();
    //subscribe to node
    var user=JSON.parse(localStorage.getItem('user'));
    console.log(user._id);
    console.log(this.profileForm.value);
    this.userservice.postemail(this.profileForm.value).subscribe((res:any) => {
      if(res.status==1){
        console.log("oh yeh")
        // console.log(res) 
      }
  
      else{
console.log("oh no"+res)
      }
    });
  }











}
