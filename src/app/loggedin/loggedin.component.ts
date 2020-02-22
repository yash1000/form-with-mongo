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
  constructor( private modalService: NgbModal,
    private authsevice:AuthService,
    private router:Router,
    private userservice:UserService) {}


  getvaluebeforemodalopen(event){
    for (let i = 0; i < this.rows.length; i++) {
      if(this.rows[i]._id===event.target.value){
            const element = this.rows[i];            
             this.obj=this.rows[i];}
          }
        }
//open modal for update value        
      open2(content) {
      this.mymodel= this.modalService.open(ModalComponent, {
        ariaLabelledBy: 'modal-basic-title'});
        this.mymodel.componentInstance.rows = this.obj;
        this.mymodel.result.then((result) => {
          alert('new data updated on result');
          this.getdata();
        },(reason)=>{
          alert('new data updated on reason');
          this.getdata();
        });    
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
        //method for colseing modal
        closeModal() {
          this.getdata();
              } 
        dtOptions: DataTables.Settings = {};

        //getdata function from backend
        getdata(){
          this.userservice.getemployeelist().subscribe((emp:any)=>{
            this.rows=[];
            this.rows=emp;
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
            this.firstName=user.firstName;
            this.getdata();}
      
        loggedout(){
          this.router.navigate(['/login']);
        }
        refreshemployeelist(){
          this.userservice.getemployeelist().subscribe((res)=>{
            this.userservice.employees=res as Employee[];
          })
        }
        ondelete(id:string,profileForm:NgForm){
            if(confirm('are you sure you want to delete this entry')==true){
              this.userservice.deleteemployerr(id).subscribe((res)=>{
              });
            }
          }
}
