
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../preauth/login/login.component';
import { RegistrationComponent } from '../preauth/registration/registration.component';
import { HeaderComponent } from '../preauth/header/header.component';
import { SliderComponent } from '../afterauth/slider/slider.component';
import { LoggedinComponent } from '../afterauth/loggedin/loggedin.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/authguard.service';
import { SecurePage } from '../services/securepage.service';
import { ProfileComponent } from '../afterauth/profile/profile.component';
import { ForgotPassComponent } from '../preauth/forgot-pass/forgot-pass.component';
import { ModalComponent } from '../afterauth/modal/modal.component';
import { ResetpasswordComponent } from '../preauth/resetpassword/resetpassword.component';


const routes: Routes = [
  {path:'',redirectTo:'header',pathMatch:'full'},
  // {path:'login',canActivate:[AuthGuard],component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'resetpassword',component:ResetpasswordComponent},
  {path:'header',canActivate:[AuthGuard],component:HeaderComponent},
  {path:'modal',canActivate:[AuthGuard],component:ModalComponent},
  {path:'slider',component:SliderComponent},
  {path:'forgot-pass',component:ForgotPassComponent},
  {path:'loggedin',canActivate:[SecurePage],component:LoggedinComponent},
  {path:'profile',canActivate:[SecurePage],component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
