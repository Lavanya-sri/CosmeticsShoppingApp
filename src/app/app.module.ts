import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopAllComponent } from './shop-all/shop-all.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ItemComponent } from './item/item.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SubAppComponent } from './sub-app/sub-app.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  
  {
    path: 'subapp', component: SubAppComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'header', component: HeaderComponent
  },
  {
    path: 'shop-all', component: ShopAllComponent
  },
  {
    path: 'item/:id', component: ItemComponent
  },
  {
    path: 'category/:name', component: CategoryComponent
  },
  {
    path: 'cart', component: CartComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopAllComponent,
    ItemComponent,
    CategoryComponent,
    CartComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginPageComponent,
    SignupPageComponent,
    SubAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule,
    HttpClientModule,
    CarouselModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
