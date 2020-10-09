import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignBaseComponent } from './sign-base.component';

@NgModule({
  declarations: [SignBaseComponent],
  exports: [SignBaseComponent],
  imports: [
    CommonModule
  ]
})
export class SignBaseModule { }
