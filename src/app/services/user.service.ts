import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Employee } from "../module/employeemodel.module";
import { Employee1 } from "../module/edit.module";
import { appinfo } from "../../environments/environment";
@Injectable()
export class UserService {
  token:any;
  
  
  selectedemployee: Employee;
  employees: Employee[];
  readonly baseurl = "http://localhost:8000/";
  constructor(private https: HttpClient) {}
  // @param emp will send all form values as object
  registration(emp: Employee) {
    return this.https.post(this.baseurl + "employee", emp);
  }

  forgotpassword(email: any) {
    return this.https.post(this.baseurl + appinfo.info.email, email);
  }

  resetpassword(emp: any) {
    return this.https.post(this.baseurl + appinfo.info.reset, emp, {});
  }
  profile(image: any) {
    return this.https.post(this.baseurl + appinfo.info.upload, image);
  }

  //  @param emp1 will send login form values as object

  login(emp1: Employee1) {
    return this.https.post(this.baseurl + appinfo.info.checkuser, emp1);
  }
  
  update(emp1: any) {
    return this.https.post(this.baseurl + appinfo.info.updateinlist, emp1);
  }

  // get users from database

  getemployeelist() {
    return this.https.get(this.baseurl + "employee");
  }

  // @param id wise delete in database

  deleteemployerr(id: any) {
    return this.https.post(this.baseurl + appinfo.info.delete, { id });
  }
}
