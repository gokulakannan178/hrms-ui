import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditleavepolicyComponent } from './editleavepolicy.component';

describe('EditleavepolicyComponent', () => {
  let component: EditleavepolicyComponent;
  let fixture: ComponentFixture<EditleavepolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditleavepolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditleavepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
