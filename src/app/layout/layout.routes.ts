import { Routes, RouterModule } from '@angular/router';
import { About } from './about';
import { Home } from './home';

export const LAYOUT_APP = [
  Home,
  About
];

export const LAYOUT_ROUTES: Routes = [
  { path: 'about',     component: About },
  { path: '',      component: Home }
];
