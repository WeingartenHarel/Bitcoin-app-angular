import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { Contact } from '../../app/services/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
// implements Resolve<Observable<Contact>>
export class ContactResolverService {

  // constructor(private contactService: ContactService, private router: Router) { }

  // resolve(route: ActivatedRouteSnapshot) {
  //   const id = route.paramMap.get('id')
  //   const contact$ = this.contactService.getContactById(id)
  //   contact$.subscribe(() => { }, (err) => {
  //     this.router.navigateByUrl('/')
  //   })
  //   return contact$
  // }
}
