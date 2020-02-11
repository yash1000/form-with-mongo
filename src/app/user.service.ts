import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Employee} from './employeemodel.module';
@Injectable()
export class UserService {
selectedemployee:Employee;
employees:Employee[];
readonly baseurl="http://localhost:8000/employee";
  constructor(private https:HttpClient) { }

  /**
   * 
   * @param emp will send all form values as object
   */
  postemployee(emp : Employee){
    return this.https.post(this.baseurl,emp);
  }
  /**
   * 
   * @param emp1 will send login form values as object
   */
  postemployee1(emp1 : Employee){
    return this.https.post('http://localhost:8000/checkuser',emp1);
  }
  /**
   * get users from database
   */
getemployeelist(){
  return this.https.get(this.baseurl);
}
/**
 * 
 * @param id wise delete in database
 */
deleteemployerr(id:string){
return this.https.delete(this.baseurl+`/${id}`);
}
  }
