import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TashboardComponent } from './tashboard.component';

describe('TashboardComponent', () => {
  let component: TashboardComponent;
  let fixture: ComponentFixture<TashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
