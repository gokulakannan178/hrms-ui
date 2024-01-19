import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationchartComponent } from './organisationchart.component';

describe('OrganisationchartComponent', () => {
  let component: OrganisationchartComponent;
  let fixture: ComponentFixture<OrganisationchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
