import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';
import { CartService } from '../cart/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges{
isLoggedIn:boolean=false;
numOfCartItems:number=0;

constructor(private _AuthService:AuthService,private _cartService:CartService){

  this._AuthService.userData.subscribe((res)=>{
    if(this._AuthService.userData.getValue()){
      this.isLoggedIn=true;
    }else{
      this.isLoggedIn=false;
    }
  })
  this._cartService.numOfCartItems.subscribe(res=>{
    this.numOfCartItems=res;
  })

}
  ngOnChanges(changes: SimpleChanges): void {
   
this._cartService.numOfCartItems.subscribe({
  next:(res)=>{ this.numOfCartItems=res;}
})
  }

logOut(){
  this._AuthService.logOut()
}


}
