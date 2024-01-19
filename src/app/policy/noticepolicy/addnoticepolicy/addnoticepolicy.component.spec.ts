import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnoticepolicyComponent } from './addnoticepolicy.component';

describe('AddnoticepolicyComponent', () => {
  let component: AddnoticepolicyComponent;
  let fixture: ComponentFixture<AddnoticepolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnoticepolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnoticepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
