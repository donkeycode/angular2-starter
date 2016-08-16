import { RouterConfig } from '@angular/router';

import { NoContent } from './no-content';
import { Home } from './home';
import { About } from './about';
import { Layout } from './layout';
import { Login } from './login';

import { AuthGuard } from './common/services';

import { DataResolver } from './app.resolver';

export const routes: RouterConfig = [
  { path: '',  component: Layout,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: Home },
      { path: 'about', component: About,
        resolve: {
          'yourData': DataResolver
        }
      }
    ]
  },
  { path: 'login',  component: Login },

  { path: '**',    component: NoContent },
];
