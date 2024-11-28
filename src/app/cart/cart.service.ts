import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 token:string|null;


// headers = {
//    token: localStorage.getItem('userToken')||""
// }
headers = new HttpHeaders({
  token: localStorage.getItem('userToken') || ""
});
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


return this._http.post(`https://ecommerce.routemisr.com/api/v1/cart`,
{productId},
{headers:{token: localStorage.getItem('userToken')||""}}
)
  }


  getCart():Observable<any>{
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      {headers:this.headers}
    )
      }

  updateCart(id:string,x:number):Observable<any>{
        return this._http.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
{count:x},
        {headers:{
          token:`${this.token}`
        }}
        )
          }

  removeItem(id:string):Observable<any>{
            return this._http.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,

            {headers:{
              token:`${this.token}`
            }}
            )
          }


 generateOnlinePayment(carTID:string,shippingAddress:any):Observable<any>{
            return this._http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${carTID}?url=https://belalmuhammad00.github.io/e-Commerce/`,
{shippingAddress:shippingAddress},
            {headers:{
              token:`${this.token}`
            }}
            )
    }

}
