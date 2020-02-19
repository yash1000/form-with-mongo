import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ProfileComponent } from '../profile/profile.component';
declare var $:any;

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {
  firstName:String;
  username:String;
  rows = [];
  columns;
  open2(content) {
    this.modalService.open(ProfileComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason2(reason)}`;
    });
  }
  private getDismissReason2(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject = new Subject();
  constructor( private modalService: NgbModal,private authsevice:AuthService,private router:Router,private userservice:UserService) { 
    
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      
    };
    //gate data from localstorage
    var user=JSON.parse(localStorage.getItem("user"));
    console.log("inside oninit logged in component");
    console.log(user.firstName);
    this.firstName=user.firstName;
  this.getdata();
  }
  getdata(){
    this.userservice.getemployeelist().subscribe((emp:any)=>{
      this.rows=emp;
      this.columns=[
        {prop:'firstName'},
        {prop:'lastName'},
        {prop:'Emailid'}
      ];
      // this.dtTrigger.next();
      console.log("((((((((((((((((((((((((")
      console.log(emp);
    })
  
  }
  loggedout(){
    // this.authsevice.loggedout();
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    // this.dtTrigger.unsubscribe();
  }
  // private extractData(res: Response) {
  //   const body = res.json();
  //   return body.data || {};
  // }
}
