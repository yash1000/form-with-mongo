import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './module/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './preauth/header/header.component';
import { LoginComponent } from './preauth/login/login.component';
import { RegistrationComponent } from './preauth/registration/registration.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { SliderComponent } from './afterauth/slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { UserService } from './services/user.service';
import { LoggedinComponent } from './afterauth/loggedin/loggedin.component';
import { AuthGuard } from './services/authguard.service';
import { AuthService } from './services/auth.service';
import { SecurePage } from './services/securepage.service';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './afterauth/profile/profile.component';
import { ForgotPassComponent } from './preauth/forgot-pass/forgot-pass.component';
import { ModalComponent } from './afterauth/modal/modal.component';
import { ResetpasswordComponent } from './preauth/resetpassword/resetpassword.component';
import { httpIntercepterprovider } from './services';

const Facebook_app_id:any="126927075405729"
const google_oauth_client_id:any="70675500837-tfabesmskrflb0lrlt8i3jvacqepca61.apps.googleusercontent.com";
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(google_oauth_client_id)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(Facebook_app_id)
  }
]);
 
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    SliderComponent,
    LoggedinComponent,
    ProfileComponent,
    ForgotPassComponent,
    ModalComponent,
    ResetpasswordComponent
  ],
  imports: [
    CarouselModule.forRoot(),
    BrowserModule,
    SocialLoginModule.initialize(config),
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    NgxUiLoaderModule,
    NgxDatatableModule

  ],
  providers: [
    UserService,
    AuthGuard,
    httpIntercepterprovider,
    SecurePage,
    AuthService
  ],
  entryComponents: [
    LoginComponent,
    ProfileComponent
  ],
  // UserService
  bootstrap: [AppComponent],
  // declarations: [AppComponent]
})
export class AppModule { }
