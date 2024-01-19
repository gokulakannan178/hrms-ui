import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprobitionComponent } from './addprobition.component';

describe('AddprobitionComponent', () => {
  let component: AddprobitionComponent;
  let fixture: ComponentFixture<AddprobitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprobitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprobitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
