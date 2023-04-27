import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

token:string|null;

numOfCartItems:BehaviorSubject<number>= new BehaviorSubject(0);

  constructor(private _http:HttpClient) {
    this.token=`${localStorage.getItem('userToken')}`;

    this.getCart().subscribe({
      next:(res)=>{
        this.numOfCartItems.next(res.numOfCartItems);
      }
    })
  }

  addToCart(productId:string):Observable<any>{
return this._http.post(`https://route-ecommerce-app.vercel.app/api/v1/cart`,
{productId:productId},
{headers:{
  token:`${this.token}`
}}
)
  }


  getCart():Observable<any>{
    return this._http.get(`https://route-ecommerce-app.vercel.app/api/v1/cart`,

    {headers:{
      token:`${this.token}`
    }}
    )
      }

  updateCart(id:string,x:number):Observable<any>{
        return this._http.put(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`,
{count:x},
        {headers:{
          token:`${this.token}`
        }}
        )
          }

  removeItem(id:string):Observable<any>{
            return this._http.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`,

            {headers:{
              token:`${this.token}`
            }}
            )
          }


 generateOnlinePayment(carTID:string,shippingAddress:any):Observable<any>{
            return this._http.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${carTID}?url=http://localhost:4200`,
{shippingAddress:shippingAddress},
            {headers:{
              token:`${this.token}`
            }}
            )
    }

}
