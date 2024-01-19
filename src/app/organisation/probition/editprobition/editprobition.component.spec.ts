import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprobitionComponent } from './editprobition.component';

describe('EditprobitionComponent', () => {
  let component: EditprobitionComponent;
  let fixture: ComponentFixture<EditprobitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprobitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprobitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
