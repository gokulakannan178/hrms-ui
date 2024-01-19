import { NgModule, NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NewsComponent } from './news/news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { ViewNewsComponent } from './view-news/view-news.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { NewsviewComponent } from './newsview/newsview.component';
const routes: Routes = [
  {
    path: 'news_list',
    component:NewsComponent,
  },
  {
    path: 'add-news',
    component:AddNewsComponent,
  },
  {
    path: 'news',
    component:ViewNewsComponent,
  },
  {
    path: 'news_view',
    component:NewsviewComponent,
  },
];

@NgModule({
  declarations: [NewsComponent, AddNewsComponent, ViewNewsComponent, NewsviewComponent],
  imports: [
   
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot()

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationsModule { }
