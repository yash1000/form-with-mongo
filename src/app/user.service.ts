import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Employee} from './employeemodel.module';
import { Employee1 } from './edit.module';
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

  postemployee2(emp : Employee1){
    console.log("DATA SENT")
    console.log(emp)
    return this.https.post('http://localhost:8000/editprofile',emp);
  }
  /**
   * 
   * @param emp1 will send login form values as object
   */
  postemployee1(emp1 : Employee1){
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
/**
 * with token
 */

// getusername(){
//   return this.https.get('http://localhost:8000/username',{
//     observe: 'body',
//     params:new HttpParams().append('token',localStorage.getItem('user'))
//   });
// }
  }
