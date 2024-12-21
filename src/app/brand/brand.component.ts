import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/core/services/products.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  allBrands:any[]=[];



  customOptions: OwlOptions = {
    loop: true,
    autoplay: true, // Enable autoplay
    autoplayTimeout: 3000, // Set the autoplay interval in milliseconds (3 seconds here)
    autoplayHoverPause: true, // Pause autoplay on hover
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2 // Show 1 item on extra small screens
      },
      600: {
        items: 4 // Show 2 items on small screens (≥600px)
      },
      1000: {
        items: 6 // Show 4 items on medium screens (≥1000px)
      },
      1200: {
        items: 8 // Show 6 items on large screens (≥1200px)
      }
  
    },
    nav: false
  }
  
  constructor(private _brands:ProductsService) {
  }
    ngOnInit(): void {
      this.getBrands();
    }
  
  getBrands(){
    this._brands.getbrands().subscribe({
      next:(res)=>{
        this.allBrands=res.data
      
        
      }
    })
  }
}
