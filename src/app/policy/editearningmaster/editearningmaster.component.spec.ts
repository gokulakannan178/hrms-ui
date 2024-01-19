import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditearningmasterComponent } from './editearningmaster.component';

describe('EditearningmasterComponent', () => {
  let component: EditearningmasterComponent;
  let fixture: ComponentFixture<EditearningmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditearningmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditearningmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
