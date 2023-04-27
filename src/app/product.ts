export interface Product {
  imageCover:string,
  title:string,
  price:number,
  category:Catagory,
  ratingsAverage:number,
  id:string,
  description?:string,
  images:string[]
}
interface Catagory{
  name:string
}
