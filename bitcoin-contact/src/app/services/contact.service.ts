import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';

// const CONTACTS = [
//   {
//     "_id": "5a56640269f443a5d64b32ca",
//     "name": "Ochoa Hyde",
//     "email": "ochoahyde@renovize.com",
//     "phone": "+1 (968) 593-3824"
//   },
//   {
//     "_id": "5a5664025f6ae9aa24a99fde",
//     "name": "Hallie Mclean",
//     "email": "halliemclean@renovize.com",
//     "phone": "+1 (948) 464-2888"
//   },
//   {
//     "_id": "5a56640252d6acddd183d319",
//     "name": "Parsons Norris",
//     "email": "parsonsnorris@renovize.com",
//     "phone": "+1 (958) 502-3495"
//   },
//   {
//     "_id": "5a566402ed1cf349f0b47b4d",
//     "name": "Rachel Lowe",
//     "email": "rachellowe@renovize.com",
//     "phone": "+1 (911) 475-2312"
//   },
//   {
//     "_id": "5a566402abce24c6bfe4699d",
//     "name": "Dominique Soto",
//     "email": "dominiquesoto@renovize.com",
//     "phone": "+1 (807) 551-3258"
//   },
//   {
//     "_id": "5a566402a6499c1d4da9220a",
//     "name": "Shana Pope",
//     "email": "shanapope@renovize.com",
//     "phone": "+1 (970) 527-3082"
//   },
//   {
//     "_id": "5a566402f90ae30e97f990db",
//     "name": "Faulkner Flores",
//     "email": "faulknerflores@renovize.com",
//     "phone": "+1 (952) 501-2678"
//   },
//   {
//     "_id": "5a5664027bae84ef280ffbdf",
//     "name": "Holder Bean",
//     "email": "holderbean@renovize.com",
//     "phone": "+1 (989) 503-2663"
//   },
//   {
//     "_id": "5a566402e3b846c5f6aec652",
//     "name": "Rosanne Shelton",
//     "email": "rosanneshelton@renovize.com",
//     "phone": "+1 (968) 454-3851"
//   },
//   {
//     "_id": "5a56640272c7dcdf59c3d411",
//     "name": "Pamela Nolan",
//     "email": "pamelanolan@renovize.com",
//     "phone": "+1 (986) 545-2166"
//   },
//   {
//     "_id": "5a5664029a8dd82a6178b15f",
//     "name": "Roy Cantu",
//     "email": "roycantu@renovize.com",
//     "phone": "+1 (929) 571-2295"
//   },
//   {
//     "_id": "5a5664028c096d08eeb13a8a",
//     "name": "Ollie Christian",
//     "email": "olliechristian@renovize.com",
//     "phone": "+1 (977) 419-3550"
//   },
//   {
//     "_id": "5a5664026c53582bb9ebe9d1",
//     "name": "Nguyen Walls",
//     "email": "nguyenwalls@renovize.com",
//     "phone": "+1 (963) 471-3181"
//   },
//   {
//     "_id": "5a56640298ab77236845b82b",

//     "name": "Glenna Santana",
//     "email": "glennasantana@renovize.com",
//     "phone": "+1 (860) 467-2376"
//   },
//   {
//     "_id": "5a56640208fba3e8ecb97305",
//     "name": "Malone Clark",
//     "email": "maloneclark@renovize.com",
//     "phone": "+1 (818) 565-2557"
//   },
//   {
//     "_id": "5a566402abb3146207bc4ec5",
//     "name": "Floyd Rutledge",
//     "email": "floydrutledge@renovize.com",
//     "phone": "+1 (807) 597-3629"
//   },
//   {
//     "_id": "5a56640298500fead8cb1ee5",
//     "name": "Grace James",
//     "email": "gracejames@renovize.com",
//     "phone": "+1 (959) 525-2529"
//   },
//   {
//     "_id": "5a56640243427b8f8445231e",
//     "name": "Tanner Gates",
//     "email": "tannergates@renovize.com",
//     "phone": "+1 (978) 591-2291"
//   },
//   {
//     "_id": "5a5664025c3abdad6f5e098c",
//     "name": "Lilly Conner",
//     "email": "lillyconner@renovize.com",
//     "phone": "+1 (842) 587-3812"
//   }
// ];
 
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private BASE_URL = 'http://localhost:3000/contacts'

  //mock the server
  private _contacts$ = new BehaviorSubject<Contact[]>([]) // for private use const CONTACTS
  public contacts$ = this._contacts$.asObservable()

  constructor(private http: HttpClient) { }


  public loadContacts(filterBy): void {
    console.log('loadContacts service filterBy',filterBy)
   this.http.get<Contact[]>(this.BASE_URL)
      .pipe(
        map(contacts => {
          return this._filter(contacts, filterBy)
          // return contacts.filter(({ name }) => {
          //   return name.toLowerCase().includes(filterBy.term.toLowerCase());
          // })
        })
      ).subscribe(contacts => {
        console.log('load contacts', contacts);
        this._contacts$.next(contacts);
      })
  }


  public query(filterBy = { term: '' }): void {
    const contacts = this._contacts$.getValue()
      .filter(({ name }) => {
        return name.toLowerCase().includes(filterBy.term.toLowerCase());
      });
    this._contacts$.next([...contacts]);
  }

  public getContactById(id: string): Observable<Contact> {
    //mock the server work
    const contact = this._contacts$.getValue().find(contact => contact._id === id)

    //return an observable
    return contact ? of(contact) : throwError(`Contact id ${id} not found!`)
  }
  getEmptyContact() {
    return { name: '', email: '',phone:'' }
  }
  public deleteContact(contactId: string) {
    const removedContact$ = this.http.delete(this.BASE_URL + `/${contactId}`)
    removedContact$.subscribe(data => {
      const contacts = this._contacts$.getValue().filter(contact => contact._id !== contactId)
      this._contacts$.next(contacts)
      // Does the same thing ~
      // const contacts = this._contacts$.getValue().filter(contact => contact.id !== contactId)
      // this._contacts$.next(contacts);
    })
    return removedContact$
  }
 
  public getById(id) {
    return this.http.get<Contact>(this.BASE_URL + `/${id}`)
      .pipe(
        retry(1),
        catchError(() => throwError('no pet found!'))
      );
    //   const pet = this._pets.find(pet => pet.id === id)
    // return pet ? of(pet) : throwError('no pet found')
  }

  // public deleteContact(id: string) {
  //   //mock the server work
  //   const contacts = this._contacts$.getValue().filter(contact => contact._id !== id)

  //   // change the observable data in the service - let all the subscribers know
  //   this._contacts$.next(contacts)
  // }

  public saveContact(contact: Contact) {
    console.log('saveContact service',contact)
    return contact._id ? this._updateContact(contact) : this._addContact(contact)
  }

  private _updateContact(contact: Contact) {
    const contact$ = this.http.put<Contact>(this.BASE_URL + `/${contact._id}`, contact)
    contact$.subscribe(contact => {
      const contacts = [...this._contacts$.getValue(), contact]
      this._contacts$.next(contacts)
    })
    return contact$
  }
  // private _updateContact(contact: Contact) {
  //   //mock the server work
  //   const contacts = this._contacts$.getValue().map(c => contact._id === c._id ? contact : c)
  //   // change the observable data in the service - let all the subscribers know
  //   this._contacts$.next(this._sort(contacts))
  // }

  private _addContact(contact: Contact) {
    const contact$ = this.http.post<Contact>(this.BASE_URL, contact)
    contact$.subscribe(contact => {
      const contacts = [...this._contacts$.getValue(), contact]
      this._contacts$.next(contacts)
    })
    return contact$
  }
  // private _addContact(contact: Contact) {
  //   //mock the server work
  //   const newContact = new Contact(undefined, contact.name, contact.email, contact.phone);
  //   newContact.setId();
  //   const contacts = [...this._contacts$.getValue(), newContact]
  //   this._contacts$.next(this._sort(contacts))
  // }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    })
  }

  private _filter(contacts, term) {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
    })
  }
}