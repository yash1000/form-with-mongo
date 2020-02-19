import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Employee } from '../employeemodel.module';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  img1:any;
  image:any
  userid: any;
  imageurl: any;
  url: any;
  constructor(private activeModal: NgbActiveModal,private domSanitizer: DomSanitizer, private fb: FormBuilder,private userservice:UserService) { }
  profileForm:FormGroup;
  ngOnInit() {
    var user1=this.userservice.getemployeelist().subscribe((res)=>{
      console.log("$$$$$$$$$$$$$$$$");
      console.log(res);
    
    }); 
  // localStorage.setItem('update',JSON.stringify(temp));
    var user=JSON.parse(localStorage.getItem("user"));
    if(localStorage.getItem('user')){
        var user=JSON.parse(localStorage.getItem("user"));
    console.log(user.firstName);
    this.img1=user.img;
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
      contact:[this.contact],
      gender:[this.gender],
      image:['']
    });
  }

  onSubmit1(event){
    var user=JSON.parse(localStorage.getItem("user"));
  // this.img1=user.img;
  console.log(user)
  console.log(user.img);
  console.log("##########################################")
    console.log(user._id);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    console.log("inside profile form");
    console.log(this.profileForm.value);
    this.contact=this.profileForm.value.contact,
    this.gender=this.profileForm.value.gender,
    console.log("contact number in profilefporm")
    console.log(this.contact)
    Object.assign(user,{"contact":this.contact});
    Object.assign(user,{"gender":this.gender});

    Object.assign(user,{"img":this.img1});
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    this.fd.append('_id', user._id);
    this.fd.append('firstName',this.profileForm.value.firstname);
    this.fd.append('lastName',  this.profileForm.value.lastname);
    this.fd.append('Emailid',this.profileForm.value.email);
    this.fd.append('contact', this.profileForm.value.contact);
    this.fd.append('gender', this.profileForm.value.gender);
    
    var id=user._id;
    var temp = {
      _id:id,
      firstName : this.profileForm.value.firstname,
      lastName : this.profileForm.value.lastname,
      Emailid : this.profileForm.value.email,
      contact : this.profileForm.value.contact,
      gender : this.profileForm.value.gender,
    }
    var image={
      image:this.profileForm.value.image
    }
    // this.userservice.postemployee2(this.fd).subscribe((res:any) => {
    //   console.log("successfulLy updated to database" + this.profileForm.value);
    //   console.log(res);
    // });
    
    this.userservice.postemployee3(this.fd).subscribe((res:any) => {
//       console.log(user._id);
//     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^")
  
//     this.img1=res;
    
//     console.log(res)
    
//     console.log(res)
//     let TYPED_ARRAY = new Uint8Array(this.img1);
//     const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
//     let base64String = btoa(STRING_CHAR);
//     console.log("ooooooooooooooooooooooooooooooooooooooooooooppp")
//     console.log(base64String);
//     this.img1 = 'data:image/jpg;base64,' + (this.domSanitizer.bypassSecurityTrustResourceUrl(base64String) as any).changingThisBreaksApplicationSecurity;
//     Object.assign(user,{"img":this.img1});
  
//     console.log(user)
//     console.log("user from loacl storage")
    
   
// console.log("=====================================")
console.log(res);
console.log("response of url image")
this.img1=res.msg;
Object.assign(user,{"img":this.img1});
localStorage.setItem("user",JSON.stringify(user))
console.log(user);
this.closeModal();
    });
  }

  selectedFile: File = null;
  fd = new FormData();


  createFormData(event) {

    this.selectedFile = <File>event.target.files[0];
   console.log(this.selectedFile)
  }
  closeModal() {
    this.activeModal.close();
  }
}
