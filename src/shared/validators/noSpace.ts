import { AbstractControl, ValidationErrors } from "@angular/forms";


export class NoSpaceValidators{
    static noSpace( control : AbstractControl): ValidationErrors | null {
        let val = control.value as string;
        if(!val){
            return null;
        }
        if(val.includes(" ")){
            return{
                noSpaceErr : 'Space is not allowed!'
            }
        }else{
            return null;
        }
    }
}