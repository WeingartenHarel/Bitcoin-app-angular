import { Component, OnInit , ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../../services/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ContactPreviewComponent } from './../contact-preview/contact-preview.component';


@Component({
  selector: 'contact-list',
  templateUrl: './contact-list-element.component.html',
  styleUrls: ['./contact-list-element.component.scss']
})
export class ContactListElementComponent implements OnInit {
  contacts: Contact[] = [] ;
  contacts$;
  contactToEditId: string = null;
  subscription: Subscription;
  filter = '';


  @ViewChild(ContactPreviewComponent ) child : ContactPreviewComponent ;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts$ = this.contactService.contacts$
    this.subscription = this.contactService.contacts$.subscribe(contacts => {
      console.log('Got contacts!', contacts);
      this.contacts = [...contacts]
    }) 
    this.loadContacts(this.filter);
  }

  loadContacts(filter) {
    console.log('query',filter)
    this.contactService.loadContacts(filter)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  get contactsJson() {
    return JSON.stringify(this.contacts, null, 2)
  }
 
  removeContact(contactId) {
    console.log("removeContact",contactId)
    this.contactService.deleteContact(contactId)
  }
  onDoneEdit() {
    this.contactToEditId = null
  }
  setContactToEdit(contactId) {
    this.contactToEditId = contactId;
  }

}
