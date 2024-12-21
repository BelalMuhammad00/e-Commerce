import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {
  wishList:any;

  wishListCount:number=0;
  constructor(private _cartService:CartService , private _toaster:ToastrService) {
  }
  
    ngOnInit(): void {
      this.getWishList();
     
      
    }
  
    getWishList(){
      this._cartService.GetWishList().subscribe({
        next:(res)=>{
          
          this.wishList=res;
          this.wishListCount=res.count;
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
  
    removeItem(productId:string){
      this._cartService.RemoveProductFromWishList(productId).subscribe({
        next:(res)=>{
          this._toaster.success("Product Removed From WishList Successfully")
        }
      })
  
      this.getWishList();
      
    }
  
}
