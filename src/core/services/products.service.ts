import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http:HttpClient) { }

  getProducts():Observable<any>{
   return this._http.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  getProductsByID(id:string):Observable<any>{
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   }

   getCategorys():Observable<any>{
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   }

}




