import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../../models/contact';


@Component({ 
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = { name: '', email: '',phone:'' };
  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log('this.route');
    console.log('this.route',this.route);
    // console.log('this.route s',this.route.snapshot);
    // console.log('this.route p',this.route.snapshot.params);
    console.log('this.route i',this.route.snapshot.paramMap.get("id"));

    this.route.params.subscribe(({ id }) => {
      console.log('subscribe id',id)
      this.loadContact(id)
    })
    // this.loadContact(contactId)
  }
  loadContact(id) {
    if (id) {
      const contact$ = this.contactService.getById(id)
      contact$.subscribe(contact => this.contact = contact)
    } else this.contact = this.contactService.getEmptyContact()
    console.log('loaded contact',this.contact)
  }

  async addContact(ev: Event) {
    console.log('ev add',ev)
    console.log('ev this.contact',this.contact)
    ev.preventDefault();
    // if (!this.contact.name || !this.contact.email || !this.contact.phone) return
    this.contactService.saveContact(this.contact).subscribe(() => {
      
      this.contact = this.contactService.getEmptyContact()
      console.log('this.contact',this.contact)
    })
  }
}
