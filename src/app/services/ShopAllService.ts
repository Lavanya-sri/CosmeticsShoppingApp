import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShopAllService {

  url = 'http://127.0.0.1:5000/items';

  constructor(private http:HttpClient) { }

    // list of all items
    getAllItems(){
      return this.http.get(this.url+'/getAll');
    }
}
