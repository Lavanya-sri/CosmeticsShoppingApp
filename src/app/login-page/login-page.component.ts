import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  signUpForm : FormGroup;
  show : boolean = false;
  email:any;
  password:any;
  errorTitle : any;
  errorMessage : any;
  errorStatus : boolean = false;

  constructor(public router: Router,public loginService:LoginService, private formBuilder: FormBuilder,  ){
    this.loginForm = this.formBuilder.group({  
      email: ['', [Validators.required, Validators.email]], // Email control  
      password: ['', [Validators.required]] // Password control  
    });  
    this.signUpForm = this.formBuilder.group({  
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], // Email control  
      password: ['', [Validators.required]] // Password control  
    });  
  }

  userLogin(){
    const email = this.loginForm.get('email')?.value; // Get email from form control  
    const password = this.loginForm.get('password')?.value; // Get password from form control     
    this.loginService.login({email : email,password:password}).subscribe(
      (data : any)=>{
        if(data["access_token"]){
          this.loginService.loginStatus =true; 
          localStorage.setItem('headerStatus', 'True');
          console.log('Login Successfull');
          this.errorStatus = false;
          this.router.navigate(['/home']);
        }
      },
      (error)=>{
        this.show = true;
        this.errorTitle = 'Login Failed';
        this.errorMessage = 'please check the Email and Password Agian...';
        this.errorStatus = true;
        this.showToast();
      }
    )
  }

  userSignUp(){
    let body = {
      firstName : this.signUpForm.get('firstName')?.value,
      lastName : this.signUpForm.get('lastName')?.value,
      email : this.signUpForm.get('email')?.value,
      password : this.signUpForm.get('password')?.value,
      mobile : 'NA'
    }
    this.loginService.signUp(body).subscribe(
      (data : any)=>{
        if(data){
          this.show = true;
          this.errorStatus = false;
          this.errorTitle = 'SignUp Succesfull';
          this.errorMessage = 'please Login with the Credintials...';
        }
      },
      (error)=>{
        this.show = true;
        this.showToast();
        this.errorStatus = true;
          this.errorTitle = 'SignUp Falied';
          this.errorMessage = 'please Check the Credintials...';
      }
    )
  }

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

}
