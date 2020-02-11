import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {
  firstName:String;
  constructor(private authsevice:AuthService,private router:Router) { 
    // location.reload();
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
