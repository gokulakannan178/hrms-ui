import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdetectionmasterComponent } from './editdetectionmaster.component';

describe('EditdetectionmasterComponent', () => {
  let component: EditdetectionmasterComponent;
  let fixture: ComponentFixture<EditdetectionmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdetectionmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdetectionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
