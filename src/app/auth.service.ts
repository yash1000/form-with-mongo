
import { promise } from "protractor";


export class AuthService{
    firstName:String;
    loggedin:boolean;
    user=JSON.parse(localStorage.getItem("user"));

 
    isAuthenticated(){
        const promise =new Promise(
            (resolve,reject)=>{
                setTimeout(()=>{
                    if(localStorage.getItem('user')){
                        resolve(true);
                        this.loggedin=true;
                        
                        
                    }
                    else{
                        resolve(false);
                        this.loggedin=false;
                    }
                  
                },10)
            }
        );
        return promise;
    }
    // loggin(){
    //     this.loggedin=true;
     
    // }
    // loggedout(){
    //     this.loggedin=false;
    // }
}