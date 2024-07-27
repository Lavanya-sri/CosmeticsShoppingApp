import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  url='http://127.0.0.1:5000/cart';
  cartLength = 0;

  constructor(private http:HttpClient) { }

  // get all items in cart
  getAllItems(){
    return this.http.get(this.url+'/getAll');
  }

  // add item in cart
  addCartItem(body:any){
    return this.http.post(this.url+'/add',body)
  }

  // delete an cart item
  deleteCartItem(id:any){
    return this.http.delete(this.url+'/deleteItem/'+id)
  }


  
}
