import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  isLoding:boolean=false;
  apiError:string='';
  isNotValid:boolean=false;

constructor(private _AuthService:AuthService , private _router:Router){}


loginForm:FormGroup=new FormGroup({
  email : new FormControl('',[Validators.required,Validators.email]),
  password : new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]),
})

login(form:FormGroup){

if(form.valid){
  this.isLoding=true;

  this._AuthService.login(form.value).subscribe({
    next:(res:any)=>{ 
      this.isLoding=false;
      localStorage.setItem("userToken",res.token);
      this._AuthService.getUserData()
      this._router.navigate(['/home'])
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
