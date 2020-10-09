import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { SignBaseModule } from '../../components/sign-base/sign-base.module'

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    SignBaseModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignInModule { }
