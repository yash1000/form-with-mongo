import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class SecurePage implements CanActivate{


    constructor(private authservice:AuthService,private router: Router){

    }
    canActivate(next :ActivatedRouteSnapshot,
        state:RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
            console.log("+++++++++++++++++++++INSIDE Secure")
            console.log(localStorage.getItem('user'))
            if(localStorage.getItem('user')){
                return true;
            }
            this.router.navigate(['/login'])
        
       
    }
       
}