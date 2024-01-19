import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPolicyViewComponent } from './document-policy-view.component';

describe('DocumentPolicyViewComponent', () => {
  let component: DocumentPolicyViewComponent;
  let fixture: ComponentFixture<DocumentPolicyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPolicyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPolicyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
