import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
@Input() product:Product = {} as Product;

constructor(private _cartService:CartService){}

addProduct(id:string){


this._cartService.addToCart(id).subscribe({
  next:(res)=> {
    this._cartService.numOfCartItems.next(res.numOfCartItems);
  },
  error:(err)=> console.log(err)


})
}
}
