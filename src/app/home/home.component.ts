import { Component } from '@angular/core';
import { BeBoldService } from '../services/be-bold.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  brands:any;
  img_path='assets/brand/';
  popularItems:any;
  img_path2='assets/';
  bestSellingItems:any;

  constructor(private beBoldService:BeBoldService){}

  ngOnInit(): void {
    this.getAllBrands();
    this.getPopularItems();
    this.getBestSellingItems();
  }

  // get all brands
  getAllBrands(){
    this.beBoldService.getAllBrands().subscribe(
      (data)=>{
        this.brands=data;
      },
      (error)=>{
        alert('Server Not Responding...');
      }
    )
  }


  //get popular items
  getPopularItems(){
    this.beBoldService.getPopularItems().subscribe(
      (data)=>{
        this.popularItems=data;
      },
      (error)=>{
        alert('Server Not Responding...');
      }
    )
  }


  // get best selling items
  getBestSellingItems(){
    this.beBoldService.getBestSellingItems().subscribe(
      (data)=>{
        this.bestSellingItems=data;
      },
      (error)=>{
        alert('Server Not Responding...')
      }
    )
  }

}
