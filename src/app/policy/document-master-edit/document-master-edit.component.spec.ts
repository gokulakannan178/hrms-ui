import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMasterEditComponent } from './document-master-edit.component';

describe('DocumentMasterEditComponent', () => {
  let component: DocumentMasterEditComponent;
  let fixture: ComponentFixture<DocumentMasterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
