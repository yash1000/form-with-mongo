import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
// import {}
@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor{
  token: any;
  
intercept(request:HttpRequest<any>,next:HttpHandler){
  let user=JSON.parse(localStorage.getItem("user"));
  if(!isNullOrUndefined(user)){
    this.token=user.token;
} else{
  }
  const authtoken= 'Bearer ' + `${this.token}`
  const authreq=request.clone({
    setHeaders:{Authorization:authtoken}
  })
  return next.handle(authreq);
}

  constructor() { }
}
