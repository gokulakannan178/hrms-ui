import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetTypeComponent } from './view-asset-type.component';

describe('ViewAssetTypeComponent', () => {
  let component: ViewAssetTypeComponent;
  let fixture: ComponentFixture<ViewAssetTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAssetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
