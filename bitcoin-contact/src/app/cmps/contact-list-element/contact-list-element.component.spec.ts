import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListElementComponent } from './contact-list-element.component';

describe('ContactListElementComponent', () => {
  let component: ContactListElementComponent;
  let fixture: ComponentFixture<ContactListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
