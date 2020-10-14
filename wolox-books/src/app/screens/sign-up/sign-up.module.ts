import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { SignBaseModule } from '../../components/sign-base/sign-base.module';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule, 
    SignUpRoutingModule,
    SignBaseModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignUpModule { }
