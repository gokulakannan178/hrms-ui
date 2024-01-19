import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssetTypeComponent } from './edit-asset-type.component';

describe('EditAssetTypeComponent', () => {
  let component: EditAssetTypeComponent;
  let fixture: ComponentFixture<EditAssetTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
