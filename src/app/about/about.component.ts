import { Component } from '@angular/core';
import { ServiceFileService } from '../services/service-file.service';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {


  constructor(public serviceData:ServiceFileService){
  }

  mobiles=this.serviceData.mobiles;

}
