import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { NgForm } from '@angular/forms';
import { Employee } from '../employeemodel.module';


@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {
  firstName:String;
  username:String;
  ids:Number;
  closeResult:String;
  rows = [];
  columns;
  obj:any;
  mymodel: any;
  img1: any;
  img: { prop: string; }[];
  constructor( private modalService: NgbModal
    ,private authsevice:AuthService,private router:Router,private userservice:UserService) { 
    

  }
  value(event){
 
    console.log("this is value function")
    console.log(event.target.value);
    console.log(this.rows);
    for (let i = 0; i < this.rows.length; i++) {
      if(this.rows[i]._id===event.target.value){
            const element = this.rows[i];
            console.log("object is:-")
            
             this.obj=this.rows[i];
            console.log(this.obj)}
          }
        console.log("k")
  }
  open2(content) {
    
   this.mymodel= this.modalService.open(ModalComponent, {
     ariaLabelledBy: 'modal-basic-title'});
     this.mymodel.componentInstance.rows = this.obj;
    //  .result.then(()=>this.getdata())
    //  .result.then((result)=>{this.getdata()})
    console.log("loggedin rows")
    this.mymodel.result.then((result) => {
      console.log()
      if(result){}
      else{
      alert('new data updated on result');}
      this.getdata();
    },(reason)=>{
      alert('new data updated on reason');
      this.getdata();
    });
    
    console.log(this.obj)
    
  }
  closeModal() {
    this.getdata();
   } 
  getDismissReason2(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  dtOptions: DataTables.Settings = {};
  getdata(){
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
    this.userservice.getemployeelist().subscribe((emp:any)=>{
      
      this.rows=[];
      
      this.rows=emp;
      console.log(this.rows);
      console.log("inget data");
      this.columns =[];
      this.columns=[
        {prop:'firstName'},
        {prop:'lastName'},
        {prop:'Emailid'}
      ];
    })
  }
  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      
    };
    var user=JSON.parse(localStorage.getItem("user"));
    console.log("inside oninit logged in component");
    console.log(user.firstName);
    this.firstName=user.firstName;
  this.getdata();
  console.log("ooooooooooooooooooooooooooooooooooooooooooo")
  console.log(this.getdata())
  console.log("")
  }
 
  loggedout(){
    this.router.navigate(['/login']);
  }
  refreshemployeelist(){
    this.userservice.getemployeelist().subscribe((res)=>{
      this.userservice.employees=res as Employee[];
    })
  }
  ondelete(id:string,profileForm:NgForm){
    // console.log(this.rows[1]._id);
    // console.log("in delte rows")
      if(confirm('are you sure you want to delete this entry')==true){
        this.userservice.deleteemployerr(id).subscribe((res)=>{
          console.log('delete successfully');
          console.log(res)
          // this.refreshemployeelist();
        });
      }
    }
}
