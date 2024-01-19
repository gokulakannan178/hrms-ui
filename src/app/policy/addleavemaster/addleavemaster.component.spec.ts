import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleavemasterComponent } from './addleavemaster.component';

describe('AddleavemasterComponent', () => {
  let component: AddleavemasterComponent;
  let fixture: ComponentFixture<AddleavemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddleavemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddleavemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
