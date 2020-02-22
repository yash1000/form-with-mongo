import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Employee} from './employeemodel.module';
import { Employee1 } from './edit.module';
import { userInfo } from 'os';
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
  registration(emp : Employee){
    return this.https.post(this.baseurl,emp);
  }
  
  forgotpassword(email: any){
    return this.https.post("http://localhost:8000/email",email);
  }

  resetpassword(emp:any){
    return this.https.post('http://localhost:8000/reset',emp,{


    })
  }
  profile(image :any){
    return this.https.post('http://localhost:8000/upload',image,{
    });
  
  }
  /**
   * 
   * @param emp1 will send login form values as object
   */
  login(emp1 : Employee1){
    return this.https.post('http://localhost:8000/checkuser',emp1);
  }
  update(emp1 : any){
    return this.https.post('http://localhost:8000/updateinlist',emp1);
  }
  /**
   * get users from database
   */
getemployeelist(){
  return this.https.get(this.baseurl);
}
/**
 * 
 * @param id wise delete in database`
 */
deleteemployerr(id:any){
 console.log(id)
 console.log("id")
return this.https.post('http://localhost:8000/delete',{id});
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
