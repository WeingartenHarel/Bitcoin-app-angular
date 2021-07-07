import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactEditComponent } from './cmps/contact-edit/contact-edit.component';
import { ContactListElementComponent } from './cmps/contact-list-element/contact-list-element.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { homepageComponent } from './cmps/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    homepageComponent,
    ContactEditComponent,
    ContactListElementComponent,
    ContactPreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
