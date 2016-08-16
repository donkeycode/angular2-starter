import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  isLoggedIn() {
    if (localStorage.getItem('auth_access_token')) {
      return true;
    }
    return false;
  }

  canActivate() {
    if (this.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
