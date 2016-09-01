import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { UserService } from '../common/services';

@Component({
  selector: 'login',
  template: require('./login.html'),
  providers: [ LoginService ]
})
export class Login {
  form = {
    email: '',
    password: ''
  };
  errors_global = '';

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  login() {
    this.loginService.login({
      username: this.form.email,
      password: this.form.password
    }).then((response) => {
      localStorage.setItem('auth_access_token', response.access_token);
      localStorage.setItem('auth_expires_in', response.expires_in);
      localStorage.setItem('auth_refresh_token', response.refresh_token);
      localStorage.setItem('auth_scope', response.scope);
      localStorage.setItem('auth_token_type', response.token_type);

      // UserService.getProfile(true)
      //   .then(() => {
      //     this.router.navigateByUrl('/');
      //   });
    }, (err) => {
      this.errors_global = err.error_description;
    });
  }
}
