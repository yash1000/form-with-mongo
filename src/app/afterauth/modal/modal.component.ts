import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {


 public rows: any
  img1: string;
  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder,private userservice:UserService) { }
  profileForm:FormGroup;
  fromWhere:any;



  ngOnInit() {
    
    this.img1="http://localhost:8000/images/"+this.rows.filename;
    this.profileForm = this.fb.group({
      firstname:[this.rows.firstName],
      lastname:[this.rows.lastName],
      email:[this.rows.Emailid],
      contact:[this.rows.contact],
      gender:[this.rows.gender],
      image:['']
    });
    this.img1="http://localhost:8000/images/"+this.rows.filename;
  }

  closeModal() {
    this.activeModal.close();
  }
  onSubmit1($event){
    this.fd.append('_id',this.rows._id);
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    this.fd.append('firstName',this.profileForm.value.firstname);
    this.fd.append('lastName',  this.profileForm.value.lastname);
    this.fd.append('Emailid',this.profileForm.value.email);
    this.fd.append('contact', this.profileForm.value.contact);
    this.fd.append('gender', this.profileForm.value.gender);
    this.userservice.update(this.fd).subscribe((res:any) => {
      if(res){
      this.ngOnInit();}
      else{
      }
    })
    this.closeModal();
  }
  selectedFile: File = null;
  fd = new FormData();
  createFormData(event) {
this.selectedFile = <File>event.target.files[0];
  }
}
