import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { FeaturesComponent } from './features/features.component';
import { ModulesComponent } from './modules/modules.component';
import { MenusComponent } from './menus/menus.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes=[
  {
    path:'tabs',
    component:TabsComponent
  },
  {
    path:'modules',
    component:ModulesComponent
  },
  {
    path:'menus',
    component:MenusComponent
  },
  {
    path:'features',
    component:FeaturesComponent
  }
]

@NgModule({
  declarations: [TabsComponent, FeaturesComponent, ModulesComponent, MenusComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AclModule { }
