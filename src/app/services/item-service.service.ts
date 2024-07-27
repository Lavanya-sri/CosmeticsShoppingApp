import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  url='http://127.0.0.1:5000/items';

  constructor(private http: HttpClient) { }

  //Get Item by Id
  getItemById(id:number){
    return this.http.get(this.url+'/'+id);
  }

  //Get items by color(people alse buying products)
  getItemByColor(color:string){
    return this.http.get(this.url+'/getItemsByColor/'+color)
  }

  //get items by category(similar products as well as category components)
  getItemByCategory(category:string){
    return this.http.get(this.url+'/getItemsByCategory/'+category)
  }


}
