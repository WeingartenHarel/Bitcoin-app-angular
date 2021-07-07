import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactEditComponent } from './cmps/contact-edit/contact-edit.component';
import { homepageComponent } from './cmps/homepage/homepage.component';
import { ContactListElementComponent } from './cmps/contact-list-element/contact-list-element.component';
import { ContactResolverService } from './services/contact-resolver.service';




const routes: Routes = [
   // { path: 'statistic', component: StatisticPageComponent },
  { path: '', component: homepageComponent,
      // children: [
        // { path: 'edit/:id?', component: ContactEditComponent },
        // { path: 'contact/:id', component: ContactDetailsPageComponent }
      // ]
  },
  {
    path: 'contact', component: ContactListElementComponent, children: [
      // { 
      //   path: 'edit/:id?', component: ContactEditComponent ,
      //   resolve: { contact: ContactResolverService } ,
      //   runGuardsAndResolvers: "paramsChange"
      //  },
      { 
        path: 'edit/:id', component: ContactEditComponent
      },
      // { path: 'contact/:id', component: ContactDetailsPageComponent }
    ]
  },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
