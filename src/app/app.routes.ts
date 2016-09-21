import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './no-content';
import { Layout, LAYOUT_APP, LAYOUT_ROUTES } from './layout';
import { Login } from './login';

import { AuthGuard } from './common/services';

import { DataResolver } from './app.resolver';

export const DECLARE_APP = [
  NoContent,
  Layout,
  ...LAYOUT_APP,
  Login
];

export const APP_ROUTES: Routes = [
  { path: '',      component: Layout },
  { path: 'login', component: Login },
  { path: '**',    component: NoContent },
  ...LAYOUT_ROUTES
];

export const AUTH_PROVIDERS = [ AuthGuard ];
