export interface Cart {
  numOfCartItems:number,
  data:data,

}

interface data{
  totalCartPrice:number,
  _id:string,
  products:products[],

}

interface products{
  count:number,
  price:number,
  product:product
}

interface product{
  id:string,
  title:string,
  imageCover:string
}
