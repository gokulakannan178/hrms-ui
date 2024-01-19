import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMasterViewComponent } from './document-master-view.component';

describe('DocumentMasterViewComponent', () => {
  let component: DocumentMasterViewComponent;
  let fixture: ComponentFixture<DocumentMasterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentMasterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
