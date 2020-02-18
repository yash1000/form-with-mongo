import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Employee } from '../employeemodel.module';
import { DomSanitizer } from '@angular/platform-browser';
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
  constructor(private domSanitizer: DomSanitizer, private fb: FormBuilder,private userservice:UserService) { }
  profileForm:FormGroup;
  // profileForm=new FormGroup({
  //   firstName: new FormControl();
  // })
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
    
    this.firstName=user.firstName;
    this.lastName=user.lastName;
    this.email=user.Emailid;
    this.contact=user.contact;
    this.gender=user.gender;
    this.image=user.image
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
    console.log(user._id);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    console.log("inside profile form");
    console.log(this.profileForm.value);
   
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
    this.userservice.postemployee2(temp).subscribe((res:any) => {
      console.log("successfulLy updated to database" + this.profileForm.value);
      console.log(res);
    });

    this.userservice.postemployee3(this.fd).subscribe((res:any) => {
      // console.log("successfulLy updated to database______________" + this.profileForm.value);
   
    this.img1=res;
    // console.log(this.img1);
    console.log(res)
    // console.log("asddddddddd")
    console.log(res)
    let TYPED_ARRAY = new Uint8Array(this.img1);
    const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    let base64String = btoa(STRING_CHAR);
    console.log("ooooooooooooooooooooooooooooooooooooooooooooppp")
    console.log(base64String);
    this.img1 = 'data:image/jpg;base64,' + (this.domSanitizer.bypassSecurityTrustResourceUrl(base64String) as any).changingThisBreaksApplicationSecurity;
    // this.base64Data=imageData;
    // this.img1= "data:image/jpeg;base64,";
    // this.imageurl = this.domSanitizer.bypassSecurityTrustUrl(‘data:image/jpg;base64, ‘ + base64String);
console.log("=====================================")
      // const formData = new FormData();
      // formData.append('file', this.profileForm.get('image').value);
      // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`")
      // console.log(formData);
      // console.log( this.profileForm.get('image'))

    });
    // console.log("%%%%%%%%%%%%%")
    // console.log(this.img1);
  }

  selectedFile: File = null;
  fd = new FormData();
  // constructor(private http: HttpClient) {}

  createFormData(event) {
    var user=JSON.parse(localStorage.getItem("user"));
    console.log(user._id);
    var a=user._id;
    this.selectedFile = <File>event.target.files[0],a;
    this.userid=user._id;
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    console.log("oooooooooooooooooooooooooooo")
    console.log(user._id);
   console.log(this.selectedFile)
  }
  
}
