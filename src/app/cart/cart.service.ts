import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 token:string|null;
private wishListIems:any[]=[];
private storagewishListIems :string= 'wishListIems';
// headers = {
//    token: localStorage.getItem('userToken')||""
// }
headers = new HttpHeaders({
  token: localStorage.getItem('userToken') || ""
});
numOfCartItems:BehaviorSubject<number>= new BehaviorSubject(0);

  constructor(private _http:HttpClient) {

    
     this.token=`${localStorage.getItem('userToken')}`;
const storewishListIems = localStorage.getItem(this.storagewishListIems);
    this.getCart().subscribe({
      next:(res)=>{
        this.numOfCartItems.next(res.numOfCartItems);
      }
    })

    if(storewishListIems){
      this.wishListIems=JSON.parse(storewishListIems)
    }

  }

    updateCartItemCount(newCount: number) {
    this.numOfCartItems.next(newCount);
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

    addProductToWishList(product:any):Observable<any>{
      this.wishListIems.push(product);

      localStorage.setItem(this.storagewishListIems,JSON.stringify(this.wishListIems));
      return this._http.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:product.id},
        {headers:{token: localStorage.getItem('userToken')||""}}
      )
          };
      
        RemoveProductFromWishList(productId:string):Observable<any>{
          const index = this.wishListIems.findIndex(item=>item.id === productId);

          if(index !== -1){
            this.wishListIems.splice(1,index);
            localStorage.setItem(this.storagewishListIems,JSON.stringify(this.wishListIems));
          }
            return this._http.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
              {headers:{token: localStorage.getItem('userToken')||""}}
            )
         };
      
        GetWishList():Observable<any>{
          return this._http.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {headers:{token: localStorage.getItem('userToken')||""}}
          )
       };

       IsInWisList(product:any):boolean{
        return this.wishListIems.some((item:any)=> item.id ===product.id);
     };

}
