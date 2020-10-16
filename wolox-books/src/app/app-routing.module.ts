import { UnauthGuard } from './helpers/guards/unauth.guard';
import { AuthGuard } from './helpers/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./components/unauth/unauth.module').then(m => m.UnauthModule),
    canActivate: [UnauthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
