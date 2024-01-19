import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditleavemasterComponent } from './editleavemaster.component';

describe('EditleavemasterComponent', () => {
  let component: EditleavemasterComponent;
  let fixture: ComponentFixture<EditleavemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditleavemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditleavemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
