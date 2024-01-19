import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPolicyComponent } from './document-policy.component';

describe('DocumentPolicyComponent', () => {
  let component: DocumentPolicyComponent;
  let fixture: ComponentFixture<DocumentPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
