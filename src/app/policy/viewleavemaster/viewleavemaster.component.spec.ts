import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewleavemasterComponent } from './viewleavemaster.component';

describe('ViewleavemasterComponent', () => {
  let component: ViewleavemasterComponent;
  let fixture: ComponentFixture<ViewleavemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewleavemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewleavemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
