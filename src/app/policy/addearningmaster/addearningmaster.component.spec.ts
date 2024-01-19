import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddearningmasterComponent } from './addearningmaster.component';

describe('AddearningmasterComponent', () => {
  let component: AddearningmasterComponent;
  let fixture: ComponentFixture<AddearningmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddearningmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddearningmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
