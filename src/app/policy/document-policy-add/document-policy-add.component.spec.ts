import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPolicyAddComponent } from './document-policy-add.component';

describe('DocumentPolicyAddComponent', () => {
  let component: DocumentPolicyAddComponent;
  let fixture: ComponentFixture<DocumentPolicyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPolicyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPolicyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
