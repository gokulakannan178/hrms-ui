import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticepolicyComponent } from './noticepolicy.component';

describe('NoticepolicyComponent', () => {
  let component: NoticepolicyComponent;
  let fixture: ComponentFixture<NoticepolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticepolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
