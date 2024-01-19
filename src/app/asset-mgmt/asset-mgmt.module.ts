import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AssetTypeComponent } from './asset-type/asset-type.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAssetTypeComponent } from './add-asset-type/add-asset-type.component';
import { ViewAssetTypeComponent } from './view-asset-type/view-asset-type.component';
import { AssetComponent } from './asset/asset.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { ViewAssetComponent } from './view-asset/view-asset.component';

import { EditAssetTypeComponent } from './edit-asset-type/edit-asset-type.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';

const routes: Routes=[
  {
    path:'asset-type',
    component:AssetTypeComponent
  },
  {
    path:'add-asset-type',
    component:AddAssetTypeComponent
  },
  {
    path:'view-asset-type',
    component:ViewAssetTypeComponent
  },
  {
    path:'edit-asset-type',
    component:EditAssetTypeComponent
  },
  {
    path:'asset',
    component:AssetComponent
  },
  {
    path:'add_asset',
    component:AddAssetComponent
  },
  {
    path:'view_asset',
    component:ViewAssetComponent
  },
  {
    path:'edit_asset',
    component:EditAssetComponent
  },
  
 
]


@NgModule({
  declarations: [AssetTypeComponent, AddAssetTypeComponent, ViewAssetTypeComponent, AssetComponent, 
    AddAssetComponent, ViewAssetComponent,EditAssetTypeComponent, EditAssetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ]
})
export class AssetMgmtModule { }
