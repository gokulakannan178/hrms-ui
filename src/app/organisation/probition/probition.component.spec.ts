import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbitionComponent } from './probition.component';

describe('ProbitionComponent', () => {
  let component: ProbitionComponent;
  let fixture: ComponentFixture<ProbitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
