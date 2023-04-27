import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { BrandComponent } from './brand/brand.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",canActivate:[AuthGuard],component:HomeComponent},
  {path:"about",canActivate:[AuthGuard],component:AboutComponent},

  {path:"products",canActivate:[AuthGuard],component:ProductsComponent},
  {path:"brands",canActivate:[AuthGuard],component:BrandComponent},
  {path:"catagories",canActivate:[AuthGuard],component:CategoriesComponent},
  {path:"checkOut/:cartID",canActivate:[AuthGuard],component:CheckOutComponent},
  {path:"allorders",canActivate:[AuthGuard],component:OrdersComponent},
  {path:"productDetails/:id",canActivate:[AuthGuard],component:ProductDetailsComponent},


  {path:"login",component:SignInComponent},
  {path:"signUp",component:SignUpComponent},
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },

{path:"**",component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
