import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignUpModule } from './screens/sign-up/sign-up.module';
import { SignInModule } from './screens/sign-in/sign-in.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignUpModule,
    SignInModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
