import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayComponent } from './holiday.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    component:HolidayComponent
  }
]

@NgModule({
  declarations: [HolidayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HolidayModule { }
