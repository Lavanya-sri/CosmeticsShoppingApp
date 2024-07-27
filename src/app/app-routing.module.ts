import { NgModule } from '@angular/core';  
import { RouterModule, Routes } from '@angular/router';  
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AppComponent } from './app.component';  

const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginPageComponent },  
  // { path: 'app', component: AppComponent },  
];  

@NgModule({  
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]  
})  
export class AppRoutingModule {}