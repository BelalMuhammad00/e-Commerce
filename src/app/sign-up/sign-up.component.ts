
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  isLoding:boolean=false;
  apiError:string='';
  isNotValid:boolean=false;

constructor(private _AuthService:AuthService , private _router:Router){}


registerForm:FormGroup=new FormGroup({
  name : new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
  email : new FormControl('',[Validators.required,Validators.email]),
  password : new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]),
  rePassword : new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]),
  phone : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(13)]),
})

register(){
console.log(this.registerForm);


if(this.registerForm.valid){
  this.apiError='';
  this.isLoding=true;
  
  this._AuthService.register(this.registerForm.value).subscribe({
    next:(res:any)=>{ console.log(res);
      this.isLoding=false;
      this._router.navigate(['/login'])
    },
    error:(err:any)=>{ console.log(err);
      this.apiError=err.error.message;
    }

  })
}else{
  this.isNotValid=true;
}
}

}
