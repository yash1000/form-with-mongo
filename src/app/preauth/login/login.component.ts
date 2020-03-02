import { Component, OnInit } from "@angular/core";
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";
import { AuthService as GoogleAuthService } from "angularx-social-login";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CustomValidators } from "../header/custom-validators";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import { FacebookService, InitParams, LoginResponse } from "ngx-facebook";
declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  profileForm: FormGroup;
  closeResult: string;
  user: any;
  localuser: { token: string };
  googleformdata: any;
  googletoken: any;
  fbformdata: any;
  fbmail: any;
  constructor(
    private social: AuthServiceConfig,
    private ngxService: NgxUiLoaderService,
    private authforgoogle: GoogleAuthService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private userservice: UserService,
    private authsevice: AuthService,
    private FBOOK: FacebookService
  ) {
    // let initParams: InitParams = {
    //   appId: '1234566778',
    //   xfbml: true,
    //   version: 'v2.8'
    // };
    // // FBOOK.init(initParams);
    // this.FBOOK.api('somepath')
    // .then(res => console.log(res))
    // .catch(e => console.log(e));
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      Emailid1: ["", [Validators.required, Validators.email]],
      password1: [
        null,
        [
          Validators.required,
          Validators.compose([
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            CustomValidators.patternValidator(/[!@#\$%\^&]/, {
              haslengthCase: true
            }),
            ,
          ]),
          Validators.minLength(8)
        ]
      ]
    });
  }
  //submit event for login with database find method
  onSubmit1(event: { preventDefault: () => void }) {
    event.preventDefault();
    //subscribe to node
    this.ngxService.start();
    this.userservice.login(this.profileForm.value).subscribe((res: any) => {
      if (res) {
        this.ngxService.stop();
      }
      if (res.status == 1) {
        localStorage.setItem("user", JSON.stringify(res));
        this.router.navigate(["/loggedin"]);
        this.toastr.success("successfully login");
        this.closeModal();
      } else if (res.status == 2) {
        this.toastr.error("Invalid Password");
      } else {
        this.toastr.error("Invalid Email-Id");
      }
    });
  }

  closeModal() {
    this.activeModal.close();
  }
  reset() {
    this.router.navigate(["/forgot-pass"]);
    this.closeModal();
  }
  signinwithgoogle(platform: any): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.authforgoogle.signIn(platform).then(Response => {
      this.googleformdata = Response;
      console.log(Response.idToken);
      console.log("inasasdfsdf");
      // Object.assign(this.localuser,{token:Response.idToken});
      this.googletoken = Response.idToken;
      this.localuser = { token: Response.idToken };
      this.userservice.googleform(this.googleformdata).subscribe((res: any) => {
        if (res.status === 1) {
          var tempobj = {
            message: {
              id: res.id,
              firstName: res.data.given_name,
              lastName: res.data.family_name,
              Emailid: res.data.email,
              filename: res.data.picture,
              loginwith: "google"
            },
            token: res.token
          };
          localStorage.setItem("user", JSON.stringify(tempobj));
          this.router.navigate(["/loggedin"]);
          this.closeModal();
        } else {
          console.log("error accured");
          console.log(res.status);
        }
      });
    });
  }
  signoutwithgoogle() {
    this.authforgoogle.signOut();
  }
  signinwithfb(platform: any): void {
    platform = FacebookLoginProvider.PROVIDER_ID;
    this.authforgoogle.signIn(platform).then(Response => {
      console.log(Response);
      console.log("fb response");
      this.fbmail = Response;
      let initParams: InitParams = {
        appId: "1234566778",
        xfbml: true,
        version: "v2.8"
      };
      console.log("asssssssssssssssssssssssss");
      this.FBOOK.init(initParams);
      this.FBOOK.login()
        .then((response: LoginResponse) => {
          console.log("Logged in", response);
          //  Object.assign('fbmail',response);
          Object.assign(this.fbmail, { Response: response });
          console.log(this.fbmail);
          console.log("fbmail");
          this.userservice.fbform(this.fbmail).subscribe((res: any) => {
            console.log("response from fb");
            console.log(res);
            if (res.status === 1) {
              console.log("successfully registered");
            } else if (res.status === 0) {
              console.log(res);
              console.log("in status 0");
              var tempobj = {
                message: {
                  id: res.id,
                  firstName: this.fbmail.firstName,
                  lastName: this.fbmail.lastName,
                  Emailid: this.fbmail.email,
                  filename: this.fbmail.photoUrl,
                  loginwith: "fb"
                },
                token: res.token
              };
              console.log("successfully loggedin");
              console.log(tempobj);
              this.router.navigate(["/loggedin"]);
              localStorage.setItem("user", JSON.stringify(tempobj));
              console.log("fbmauikl");
              console.log(this.fbmail);
              this.closeModal();
            } else if (res.status === 2) {
              console.log("some error in saving");
            }
          });
        })
        .catch(e => console.error("Error logging in"));
      //  this.FBOOK.api('/me',(response: any)=>{
      //   console.log(JSON.stringify(response))
      // })
    });
  }
}
