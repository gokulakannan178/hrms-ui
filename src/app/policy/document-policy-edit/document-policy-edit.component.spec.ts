import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPolicyEditComponent } from './document-policy-edit.component';

describe('DocumentPolicyEditComponent', () => {
  let component: DocumentPolicyEditComponent;
  let fixture: ComponentFixture<DocumentPolicyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPolicyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPolicyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
