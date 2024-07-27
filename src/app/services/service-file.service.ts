import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceFileService {

  constructor() { }
  mobiles=['redmi','samsung','apple','vivo','lenovo','realme']
  indicator:boolean=true;
  activate()
  {
   if(this.indicator===false){
    return this.indicator=true;
   } 
   else{
    return this.indicator=false;
   }
  }
}
