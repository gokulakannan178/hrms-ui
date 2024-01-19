import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnoticepolicyComponent } from './editnoticepolicy.component';

describe('EditnoticepolicyComponent', () => {
  let component: EditnoticepolicyComponent;
  let fixture: ComponentFixture<EditnoticepolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditnoticepolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnoticepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
