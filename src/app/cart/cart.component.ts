import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
declare var angular: any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any;
  cartLength: any;
  img_path = 'assets/';
  totalCost=0;
  deletedItem:any;



  constructor(private cartServie: CartService) { }

  ngOnInit(): void {
    this.getAllCartItems();
    
  }

  // get all cart items
  getAllCartItems() {
    this.cartServie.getAllItems().subscribe(
      (data) => {
        this.cartItems = data;
        this.cartLength = this.cartItems.length;
        this.cartServie.cartLength = this.cartLength;
        this.totalCost=0;
        this.totalCostFinder(this.cartItems);
      },
      (error) => {
        alert('Server not Responding...')
      }
    )
  }

  // delete cart item
  deleteCartItem(id: any) {
    this.cartServie.deleteCartItem(id).subscribe(
      (data) => {
        this.deletedItem=data;
        console.log(this.deletedItem)
        this.getAllCartItems();
      }
    )
  }

  //total cost of cart items
  totalCostFinder(itemsList: any) {
    for(let i = 0; i<this.cartLength;i++){
      this.totalCost+=itemsList[i].subTotal;
    }
  }

}


