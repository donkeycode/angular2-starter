import { RouterConfig } from '@angular/router';
import { NoContent } from './no-content';
import { Home } from './home';
import { About } from './about';

import { DataResolver } from './app.resolver';

export const routes: RouterConfig = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about',  component: About,
    resolve: {
      'yourData': DataResolver
    }
  },
  { path: '**',    component: NoContent },
];
