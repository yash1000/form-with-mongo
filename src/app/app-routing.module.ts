
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './authguard.service';
import { SecurePage } from './securepage.service';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ModalComponent } from './modal/modal.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';


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
