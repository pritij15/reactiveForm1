import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";


export class AsyncEmailValidators{
    static isEmailAvailable(control : AbstractControl): Promise< ValidationErrors | null>
    | Observable< ValidationErrors | null>{

        let val:string = control.value;

        const promise = new Promise<ValidationErrors | null>((resolve,reject) =>{
            setTimeout(()=>{
                if(val === "priti@gmail.com"){
                    resolve({
                        emailExistErr : 'Email id already in use!'
                    })
                }
                else{
                    resolve(null)
                }
            },1000);
        })
        return promise
    }
}