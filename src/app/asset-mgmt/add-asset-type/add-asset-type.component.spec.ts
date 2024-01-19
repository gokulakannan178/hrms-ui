import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetTypeComponent } from './add-asset-type.component';

describe('AddAssetTypeComponent', () => {
  let component: AddAssetTypeComponent;
  let fixture: ComponentFixture<AddAssetTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
