import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Employee } from '../employeemodel.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName:String;
  lastName:String;
  email:String;
  contact: any;
  gender: any;
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
    this.contact=user.contact;
    this.gender=user.gender;
    }


    this.profileForm = this.fb.group({
      firstname:[this.firstName],
      lastname:[this.lastName],
      email:[ this.email],
      contact:[''],
      gender:['']
    });
  }

  onSubmit1(event){
    console.log("inside profile form");
    console.log(this.profileForm.value);
    var temp = {
      firstName : this.profileForm.value.firstname,
      lastName : this.profileForm.value.lastname,
      Emailid : this.profileForm.value.email,
      contact : this.profileForm.value.contact,
      gender : this.profileForm.value.gender
    }
    this.userservice.postemployee2(temp).subscribe((res:any) => {
      console.log("successfulLy updated to database" + this.profileForm.value);
      console.log(res);
    });
  }

}
