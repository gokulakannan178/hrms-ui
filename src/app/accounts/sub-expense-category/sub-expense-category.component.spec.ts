import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubExpenseCategoryComponent } from './sub-expense-category.component';

describe('SubExpenseCategoryComponent', () => {
  let component: SubExpenseCategoryComponent;
  let fixture: ComponentFixture<SubExpenseCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubExpenseCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubExpenseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
