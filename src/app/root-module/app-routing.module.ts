import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES_STRINGS } from '../constants/routing';
import { RegistrationComponent } from './containers/registration/registration.component';
import { LoginComponent } from './containers/login/login.component';
import { LogoutGuard } from './guards/logout.guard';
import { LoginGuard } from './guards/login.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: ROUTES_STRINGS.LOGIN,
    component: LoginComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: ROUTES_STRINGS.REGISTRATION,
    component: RegistrationComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: ROUTES_STRINGS.MAIN,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard],
    loadChildren: () => import('../main-module/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  providers: [
    LoginGuard,
    LogoutGuard,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
