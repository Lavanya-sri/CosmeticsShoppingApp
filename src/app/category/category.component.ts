import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from '../services/item-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  categoryItems:any;
  categoryName:any;
  img_path='assets/'

  constructor(private route:ActivatedRoute,private itemService:ItemServiceService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
        this.categoryName= String(this.route.snapshot.paramMap.get('name'));
        this.getItemsByCategory(this.categoryName);
      }
    )
  }

   //get items by category(similar products)
   getItemsByCategory(category:any){
    this.itemService.getItemByCategory(category).subscribe(
      (data)=>{
        this.categoryItems=data
      },
      (error)=>{
        alert('Server is not Responding...')
      }
    )
  }

}
