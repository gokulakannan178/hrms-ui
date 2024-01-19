import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPolicyMasterComponent } from './document-policy-master.component';

describe('DocumentPolicyMasterComponent', () => {
  let component: DocumentPolicyMasterComponent;
  let fixture: ComponentFixture<DocumentPolicyMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPolicyMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPolicyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
