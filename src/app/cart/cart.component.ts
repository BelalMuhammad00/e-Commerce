import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from './cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

cartDetails:Cart= {} as Cart;

constructor(private _cartService:CartService , private _toaster:ToastrService){}


  ngOnInit(): void {
    this.getCart();
  }

getCart(){
  this._cartService.getCart().subscribe({
    next:(res)=>{
this.cartDetails=res
    },
    error:(err)=>{
      this._toaster.error("please restart the page")
    }
  })
}

ubdateCart(id:string,count:number){
  this._cartService.updateCart(id,count).subscribe({
    next:(res)=>{
    this.cartDetails=res;
    },
    error:(err)=>{console.log(err);
    }
  })
}

removeItem(id:string){
  this._cartService.removeItem(id).subscribe({
    next:(res)=>{
      const currentCount = this._cartService.numOfCartItems.value;
      if (currentCount > 0) {
        this._cartService.updateCartItemCount(currentCount - 1);
      }
      this._toaster.success("Product Removed From Cart Successfully")
      this.cartDetails=res},
    error:(err)=>{console.log(err);
    }
  })
}

}
