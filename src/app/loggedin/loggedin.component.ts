import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
declare var $:any;

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {
  firstName:String;
  username:String;
  constructor(private authsevice:AuthService,private router:Router,private userservice:UserService) { 
    
    // console.log("((((((((((((((((((((((((((((((((((((((((((((10")
    // this.userservice.getusername().subscribe(
    //   data=>{this.username=data.toString();
    //     console.log("((((((((((((((((((((((((((((((((((((((((((((9")
    //   console.log(data)},
    //   error=>this.router.navigate['/login']
    //   // console.log(object)
    // );
    
    // console.log(this.username);
  }

  ngOnInit() {
    //gate data from localstorage
    var user=JSON.parse(localStorage.getItem("user"));
    console.log("inside oninit logged in component");
    console.log(user.firstName);
    this.firstName=user.firstName;
  }
  loggedout(){
    // this.authsevice.loggedout();
    this.router.navigate(['/login']);
  }

}
