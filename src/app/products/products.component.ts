import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { CartService } from '../cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() product:Product = {} as Product;
  thereIsProduct:boolean =false;
  wishList:any;
  constructor(private _cartService:CartService , private _toaster:ToastrService){}

  addProduct(id:string){
  
  
  this._cartService.addToCart(id).subscribe({
    next:(res)=> {
      this._cartService.numOfCartItems.next(res.numOfCartItems);
      this._toaster.success("Product Added To Cart Successfully");
      const currentCount = this._cartService.numOfCartItems.value;
      this._cartService.updateCartItemCount(currentCount + 1);
     
    },
    error:(err)=> console.log(err)
  
  
  })
  }
  
  toggleWishList(product: any){
  
  
  if(this.isInWishList(product)){
  
  this._cartService.RemoveProductFromWishList(product.id).subscribe({
    next:(res)=>{ console.log(res);
      this._toaster.success("Product Removed From WishList Successfully");
    }
   });

  }else{
    console.log(product.id);
    this._cartService.addProductToWishList(product).subscribe({
     next:(res)=>{ console.log(res);
      this._toaster.success("Product Added To WishList Successfully");
     }
    })
  }
  
  
  
  }
  
  isInWishList(product:any):boolean{
  return this._cartService.IsInWisList(product);
  
  }
  

  
}
