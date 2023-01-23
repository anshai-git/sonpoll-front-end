import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../sp-common/views/not-found/not-found.component';
import {AuthGuard} from '../auth/guards/auth.guard';
import {UnauthenticatedGuard} from '../auth/guards/unauthenticated.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'web' },
  { path: 'web', canActivate: [AuthGuard], loadChildren: () => import('../platform/platform.module').then(m => m.PlatformModule) },
  { path: 'auth', canActivate: [UnauthenticatedGuard], loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
  { path: 'register', canActivate: [UnauthenticatedGuard], loadChildren: () => import('../register/register.module').then(m => m.RegisterModule)},
  { path: 'pr', canActivate: [UnauthenticatedGuard], loadChildren: () => import('../password-reset/password-reset.module').then(m => m.PasswordResetModule)},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
