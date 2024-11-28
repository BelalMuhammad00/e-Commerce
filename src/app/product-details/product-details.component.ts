import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/core/services/products.service';
import { Product } from '../product';
import { CartService } from '../cart/cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productId:string='';
  productDetails:Product={} as Product;




constructor(private _ActivatedRoute:ActivatedRoute,
   private _productService:ProductsService,
   private _cartService:CartService
   ){
  this._ActivatedRoute.params.subscribe((res:any) =>{
    
   this.productId=res.id;

  })

this._productService.getProductsByID(this.productId).subscribe({
  next:(res)=>{ 
    this.productDetails=res.data;
  }
})

}
addProduct(id:string){
  this._cartService.addToCart(id).subscribe({
    next:(res)=>{ 
    }
  })
}

}
