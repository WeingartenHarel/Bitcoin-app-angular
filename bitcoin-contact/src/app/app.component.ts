import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
// import { Contact } from 'src/services/contact';
import { Contact } from './services/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '8BTCoin';

  ngOnInit() {
   
  }

}
