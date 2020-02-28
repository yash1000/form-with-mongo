import { Component, OnInit } from '@angular/core';
import{AuthServiceConfig,GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";
import { AuthService as GoogleAuthService} from 'angularx-social-login';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../header/custom-validators';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profileForm:FormGroup;
  closeResult: string;
  user:any;
  localuser;
  googleformdata: any;
  googletoken:any
  constructor(private social:AuthServiceConfig,
    private ngxService: NgxUiLoaderService,
    private authforgoogle:GoogleAuthService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,private toastr: ToastrService,private router:Router, private fb:FormBuilder,private userservice:UserService,private authsevice:AuthService) { }

  ngOnInit() {


    this.profileForm = this.fb.group({
      Emailid1:['',[Validators.required,Validators.email]],
      password1: [ null, [Validators.required,Validators.compose([CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[!@#\$%\^&]/, { haslengthCase: true }),
       ,
       ]), Validators.minLength(8)]],
    });
  
  }
//submit event for login with database find method
  onSubmit1(event) {
    event.preventDefault();
    //subscribe to node
    this.ngxService.start();
    this.userservice.login(this.profileForm.value).subscribe((res:any) => {
      if(res){
        this.ngxService.stop();
      }
      if(res.status==1){
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(res);
        localStorage.setItem("user",JSON.stringify(res));
        // localStorage.setItem("user1",JSON.stringify(res.token));
        $("#exampleModal11").modal("hide");
        this.router.navigate(["/loggedin"]);
        this.toastr.success('successfully login');
        this.closeModal();
      }
      else if(res.status==2){
        this.toastr.error('Invalid Password');
      }
      else{
        this.toastr.error('Invalid Email-Id');
      }
    });
  }

  closeModal() {
    this.activeModal.close();
  }
  reset(){
    this.router.navigate(['/forgot-pass']);
    this.closeModal();
  }
  signinwithgoogle(platform: any): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.authforgoogle.signIn(platform).then(Response => {
      this.googleformdata = Response;
      console.log(Response.idToken)
      console.log("inasasdfsdf")
      // Object.assign(this.localuser,{token:Response.idToken});
    this.googletoken=Response.idToken;
    this.localuser={token:Response.idToken}
        console.log(this.localuser)      
      this.userservice.googleform(this.googleformdata).subscribe((res: any) => {
  console.log("response of token")
  console.log(res.token);
  console.log("ssssssssssssssssssssssssssssssssssss")
        if(res.status===1){
         var tempobj = {
           message: {
            "id":res.id,
            "firstName":res.data.given_name,
            "lastName":res.data.family_name,
            "Emailid":res.data.email,
            "filename":res.data.picture,
            "loginwith":"google",        
           },
           token:res.token
         }
          console.log("in google response")
          console.log(this.user)
          localStorage.setItem("user",JSON.stringify(tempobj));
          this.router.navigate(["/loggedin"]);
          this.closeModal();
        }
        else{
          console.log("error accured")
          console.log(res.status)
        }
      });
    });
  }
      signoutwithgoogle(){
        this.authforgoogle.signOut();
        console.log("sign out bro....")
      }
      signinwithfb(platform:any):void{
        platform=FacebookLoginProvider.PROVIDER_ID;
        this.authforgoogle.signIn(platform).then((Response)=>{
          console.log(platform);
          console.log(Response);
          console.log("from fb")
        })
          }


}