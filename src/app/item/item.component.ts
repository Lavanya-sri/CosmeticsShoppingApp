import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ItemServiceService } from '../services/item-service.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';




@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{

  item: any;
  img_path = 'assets/'
  item_images:any;
  colorItems:any;
  categoryItems:any;
  userId:any;
  cartLength:any;


  constructor(private route : ActivatedRoute,private itemService: ItemServiceService,private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
        this.userId= Number(this.route.snapshot.paramMap.get('id'));
        this.getItemById(this.userId);
      }
    )
   
  }
  
  //quantity methods
  quantity: number = 1;
  increment() {
    this.quantity += 1;
  }
  decrement() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  //product pictures carousel
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    // navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      760: {
        items: 2
      },
      1000: {
        items: 3
      },
      1240: {
        items: 4
      }
    },
    nav: false
  }

  show = false;  

  showToast() {  
    this.show = true;  
    // Set timeout to hide the toast after a few seconds  
    setTimeout(() => {  
      this.show = false;  
    }, 3000);  
  }
  
  hideToast(){
    this.show = false;  
  }

  //Get item by Id
  getItemById(id:any) {
    this.itemService.getItemById(id).subscribe(
      (data) => {
        this.item = data
        this.item['orgPrice']=Math.ceil(this.item.price+(0.4*this.item.price))
        this.item_images=[
          {
            id:1,
            path:this.img_path + this.item.category + '/' + this.item.brands['name'] + '_' + this.item.category + '_' + this.item.name + '.png'
          },
          {
            id:2,
            path:this.img_path + this.item.category + '/' + this.item.brands['name'] + '_' + this.item.category + '_' + this.item.name+'_2' + '.png'
          },
          {
            id:3,
            path:this.img_path + this.item.category + '/' + this.item.brands['name'] + '_' + this.item.category + '_' + this.item.name+'_3' + '.png'
          },
          {
            id:4,
            path:this.img_path + this.item.category + '/' + this.item.brands['name'] + '_' + this.item.category + '_' + this.item.name+'_4' + '.png'
          }
        ]
        this.getItemsByColor(this.item.mainColor);
        this.getItemsByCategory(this.item.category);
      },
      (error) => {
        alert('Server is not Responding...')
      }
    )
  }

  

  //get items by color(pepole also buying products)
  getItemsByColor(color:any){
    const restrict = (data:any) =>{
      console.log(data.itemId)
      return data.itemId!=this.userId
    }
    this.itemService.getItemByColor(color).subscribe(
      (data)=>{
        this.colorItems=data;
        this.colorItems=this.colorItems.filter(restrict);
      },
      (error)=>{
        alert('Server is not Responding...')
      }
    )
    window.scrollTo(0, 0)
  }

  //get items by category(similar products)
  getItemsByCategory(category:any){
    const restrict = (data:any) =>{
      console.log(data.itemId)
      return data.itemId!=this.userId
    }
    this.itemService.getItemByCategory(category).subscribe(
      (data)=>{
        this.categoryItems=data
        this.categoryItems=this.categoryItems.filter(restrict);
      },
      (error)=>{
        alert('Server is not Responding...')
      }
    )
  }

   // get all cart items
   getAllCartItems() {
    this.cartService.getAllItems().subscribe(
      (data) => {
        let cartItems : any = data;
        this.cartService.cartLength = cartItems.length;
      },
      (error) => {
        alert('Server not Responding...')
      }
    )
  }

  //add function
  saveForm(data:any,quantity:any) {
    let body={
      price:data.price,
      name:data.name,
      category:data.category,
      quantity:quantity,
      itemId:data.itemId,
      brandName:data.brands['name'],
    }
    this.addCartItem(body);
    this.showToast();
  }


  // add item in cart
  addCartItem(body:any){
    this.cartService.addCartItem(body).subscribe(
      (res)=>{
        this.getAllCartItems();
      }
    )
  }
}
