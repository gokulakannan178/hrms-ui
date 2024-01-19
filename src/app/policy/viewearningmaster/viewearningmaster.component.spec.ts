import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewearningmasterComponent } from './viewearningmaster.component';

describe('ViewearningmasterComponent', () => {
  let component: ViewearningmasterComponent;
  let fixture: ComponentFixture<ViewearningmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewearningmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewearningmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
