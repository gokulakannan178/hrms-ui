import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMasterAddComponent } from './document-master-add.component';

describe('DocumentMasterAddComponent', () => {
  let component: DocumentMasterAddComponent;
  let fixture: ComponentFixture<DocumentMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
