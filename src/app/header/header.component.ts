import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  conditioner = 'conditioner';
  moisturizer = 'moisturizer';
  lipstick = 'lipstick';

  constructor(public cartService : CartService,public loginService : LoginService,public router: Router){}
  ngOnInit(): void {
    this.getAllCartItems();
  }


   // get all cart items
   getAllCartItems() {
    this.cartService.getAllItems().subscribe(
      (data) => {
        let cartItems :any = data;
        this.cartService.cartLength = cartItems.length;
      },
      (error) => {
        alert('Server not Responding...')
      }
    )
  }

  logout(){
    this.loginService.loginStatus = false;
    localStorage.setItem('headerStatus', 'false');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
