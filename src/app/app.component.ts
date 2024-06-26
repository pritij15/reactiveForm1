import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { COUNTRIES_META_DATA } from 'src/shared/const/countryData';
import { Icountry } from 'src/shared/model/country';
import { AsyncEmailValidators } from 'src/shared/validators/asyncEmailValidators';
import { EmpIdValidators } from 'src/shared/validators/empIdValidators';
import { NoSpaceValidators } from 'src/shared/validators/noSpace';
import { CustomRegex } from 'src/shared/validators/validationPattern';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'reactiveForm1';
  signUpForm !: FormGroup;
  countryInfo : Array<Icountry> = []

  constructor(){}


  ngOnInit(): void {
    this.countryInfo =  COUNTRIES_META_DATA;
    this.createSignUpForm();
    this.currentAddValidator();
    this.patchPermAdd();
    this.enableConfirmPassword();
    this.passAndConfirm();
  }

  get f(){
    return this.signUpForm.controls;
  }

  onSignUp(){
    // if(this.signUpForm.valid){
    //   console.log(this.signUpForm);
    //   console.log(this.signUpForm.value);
    //   this.signUpForm.reset();
    // }
  
  console.log(this.signUpForm.value);

  }
  createSignUpForm(){
    this.signUpForm = new FormGroup({
      userInfo : new FormGroup({
        username : new FormControl(null,
          [Validators.required,
            Validators.pattern(CustomRegex.username),
            Validators.minLength(5),
            Validators.maxLength(8),
            NoSpaceValidators.noSpace
          ]
        ),
        email : new FormControl(null,[Validators.required,
          Validators.pattern(CustomRegex.email)
        ],
        [AsyncEmailValidators.isEmailAvailable]),
        
      }),
        

      empId : new FormControl(null,[Validators.required, EmpIdValidators.isEmpIdValid]),
      gender : new FormControl(null),
      skills : new FormArray([new FormControl(null,[Validators.required])]),

      currentAddress : new FormGroup({
        country : new FormControl(null,[Validators.required]),
        state : new FormControl(null,[Validators.required]),
        city : new FormControl(null,[Validators.required]),
        zipcode : new FormControl(null,[Validators.required])
      }),

      permanantAddress : new FormGroup({
        country : new FormControl(null,[Validators.required]),
        state : new FormControl(null,[Validators.required]),
        city : new FormControl(null,[Validators.required]),
        zipcode : new FormControl(null,[Validators.required])
      }),

      isAddSame : new FormControl({value : null , disabled : true}),

      password : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.password)]),
      confirmPassword : new FormControl({value : null, disabled:true},[Validators.required]),
    })
  }
      
  get skillsFormArray(){
    return this.signUpForm.get('skills') as FormArray
  }
  onSkillAdd(){
    if(this.skillsFormArray.length < 5){
      let skillControl = new FormControl(null,[Validators.required]);
      this.skillsFormArray.push(skillControl)
    }
  }
  onSkillRemove(i : number){
    console.log(i);
    this.skillsFormArray.removeAt(i);
  }

  currentAddValidator(){
    this.f['currentAddress'].valueChanges
    .subscribe(res =>{
      //console.log(this.f['currentAddress'].valid);

      if(this.f['currentAddress'].valid){
        this.f['isAddSame'].enable();
      }else{
        this.f['isAddSame'].disable();
        this.f['isAddSame'].patchValue(false);
      }
    })
  }

  patchPermAdd(){
    this.f['isAddSame'].valueChanges
    .subscribe(res =>{
      //console.log(res);

      if(res){
        this.f['permanantAddress'].patchValue(this.f['currentAddress'].value);
        this.f['permanantAddress'].disable();
      }else{
        this.f['permanantAddress'].reset();
        this.f['permanantAddress'].enable();
      }
    })
  }

  enableConfirmPassword(){
    this.f['password'].valueChanges
    .subscribe((res) =>{
      if(this.f['password'].valid){
        this.f['confirmPassword'].enable();
      }else{
        this.f['connfirmPassword'].disable();
      }
    })
  }

  passAndConfirm(){
    this.f['confirmPassword'].valueChanges
    .subscribe(res =>{
      if(res !== this.f['password'].value){
        this.f['confirmPassword'].setErrors({
          'passAndConf' : 'password and confirm password must be same!'
        })
      }
    })
  }
}
