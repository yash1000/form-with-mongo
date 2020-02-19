import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SliderComponent } from './slider/slider.component';
// import { UserService } from './user.service'
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { AuthGuard } from './authguard.service';
import { AuthService } from './auth.service';
import { SecurePage } from './securepage.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    SliderComponent,
    LoggedinComponent,
    ProfileComponent,
    ForgotPassComponent
  ],
  imports: [
    CarouselModule.forRoot(),
    BrowserModule,
  
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    NgxDatatableModule

  ],
  providers: [
    UserService,
    AuthGuard,
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
