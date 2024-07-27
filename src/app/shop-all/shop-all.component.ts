import { Component, OnInit } from '@angular/core';
import { ShopAllService } from '../services/ShopAllService';



@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.component.html',
  styleUrls: ['./shop-all.component.scss']
})
export class ShopAllComponent implements OnInit{

  shopsList:any;
  img_path='assets/'
  length:any;

  constructor(private shops:ShopAllService){}

  ngOnInit():void {
    this.getAll();
  }

  getAll(){
    this.shops.getAllItems().subscribe(
      (data)=>{
        this.shopsList=data;
        this.length=this.shopsList.length
      },error=>{
        alert('Server Not responding');
      }
    )
  }
}
