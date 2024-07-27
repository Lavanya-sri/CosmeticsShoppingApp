import { Component } from '@angular/core';
import { ServiceFileService } from '../services/service-file.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private data:ServiceFileService){}
  mobiles=this.data.mobiles
}
