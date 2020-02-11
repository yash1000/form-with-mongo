
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


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',canActivate:[AuthGuard],component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'header',component:HeaderComponent},
  {path:'slider',component:SliderComponent},
  {path:'loggedin',canActivate:[SecurePage],component:LoggedinComponent},
  {path:'profile',canActivate:[SecurePage],component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
