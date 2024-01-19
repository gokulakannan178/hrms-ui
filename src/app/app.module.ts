import { HeaderComponent } from './dashboard/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataSharingServiceService } from './service/data-sharing-service.service';
import { PagerService } from './services/pager.service';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
// import { AllorganisationComponent } from './allorganisation/allorganisation.component';
// import { OrgbranchComponent } from './orgbranch/orgbranch.component';
// import { OrgdeptComponent } from './orgdept/orgdept.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,


    // AllorganisationComponent,
    // OrgbranchComponent,
    // OrgdeptComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   
  ],
  providers: [
    DataSharingServiceService,
    PagerService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
