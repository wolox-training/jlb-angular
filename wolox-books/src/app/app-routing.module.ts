import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./screens/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./screens/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
