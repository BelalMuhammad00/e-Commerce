import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/core/services/products.service';
import { Product } from '../product';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit{

allProducts:Product[]=[];



constructor(private _productsService:ProductsService){}

searchTerm:string=''

ngOnInit(): void {
  this.getProduct();
}

getProduct(){
  this._productsService.getProducts().subscribe({
    next:(res)=>{
      console.log(res);
      this.allProducts=res.data;
    }
  })
}

}
