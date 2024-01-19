import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { SignupComponent } from './signup/signup.component';
import { OtploginComponent } from './otplogin/otplogin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  {
    path: '',
    component:RegisterComponent,
  },
  {
    path: 'forgetpassword',
    component:ForgetpasswordComponent,
  },
  {
    path: 'register',
    component:SignupComponent,
  },
  {
    path: 'forgototpgeneration',
    component:OtploginComponent,
  },
  {
    path: 'resetpassword',
    component:ResetpasswordComponent,
  },
  {
    path: 'changepassword',
    component:ChangepasswordComponent,
  }


];

@NgModule({
  declarations: [RegisterComponent, ForgetpasswordComponent, SignupComponent, OtploginComponent, ResetpasswordComponent, ChangepasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  entryComponents:[RegisterComponent]
})
export class LoginModule { }
