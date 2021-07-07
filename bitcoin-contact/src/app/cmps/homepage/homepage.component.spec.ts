import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmepageComponent } from './omepage.component';

describe('OmepageComponent', () => {
  let component: OmepageComponent;
  let fixture: ComponentFixture<OmepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
