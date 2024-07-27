import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BeBoldService {


  url='http://127.0.0.1:5000/items';

  brands_url='http://127.0.0.1:5000/brands';

  constructor(private http:HttpClient) { }

  //get popular products
  getPopularItems(){
    return this.http.get(this.url+'/popularItems');
  }

  //get Best Selling products
  getBestSellingItems(){
    return this.http.get(this.url+'/specialItems');
  }


  // get all brands
  getAllBrands(){
    return this.http.get(this.brands_url+'/getAllBrands');
  }

  
}
