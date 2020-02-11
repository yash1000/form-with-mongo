import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName:String;
  lastName:String;
  email:String;
  constructor( private fb: FormBuilder,private userservice:UserService) { }
  profileForm:FormGroup;
  // profileForm=new FormGroup({
  //   firstName: new FormControl();
  // })
  ngOnInit() {
    // var user1=this.userservice.getemployeelist().subscribe((res)=>{
    //   console.log("$$$$$$$$$$$$$$$$");
    //   console.log(res);
    // }); 
  
    var user=JSON.parse(localStorage.getItem("user"));
    if(localStorage.getItem('user')){
        var user=JSON.parse(localStorage.getItem("user"));
    console.log(user.firstName);
    this.firstName=user.firstName;
    this.lastName=user.lastName;
    this.email=user.Emailid;
    }


    this.profileForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      contact:[''],
      gender:['']
    });
  }

  
}
