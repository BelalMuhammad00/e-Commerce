import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
cartID:string='';

  constructor(private _cartService:CartService , private _activatedRoute:ActivatedRoute){

    this._activatedRoute.paramMap.subscribe((res:any)=>{
      this.cartID=res.params.cartID;
      console.log(this.cartID);

    })
  }

  shippingAddress :FormGroup=new FormGroup({
    details:new FormControl('', [Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(13)]),
    city:new FormControl('', [Validators.required])
  })

  handleOnline(){

     this._cartService.generateOnlinePayment(this.cartID,this.shippingAddress.value).subscribe({
      next:(res)=>{console.log(res);
        if(res.status=='success'){
          window.location.href=res.session.url
        }
      },
      error:(err)=>{console.log(err);
      }
     })
  }
}
