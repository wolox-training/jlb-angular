import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { SignBaseComponent } from './components/sign-base/sign-base.component';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./screens/sign-in/sign-in.module').then(m => m.SignInModule)
    loadChildren: () => import('./screens/sign-up/sign-up.module').then(m => m.SignUpModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
