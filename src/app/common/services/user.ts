import { Injectable, ReflectiveInjector } from '@angular/core';
import { RequestService } from './requests';
import { HTTP_PROVIDERS } from '@angular/http';
import { appInjector } from '../../../app-injector';
import { Router } from '@angular/router';
import { config } from '../../config';

@Injectable()
export class UserService {
  static account: any = {};

  static getProfile(force = false) {
    if (!force && this.account && this.account.groups) {
      return new Promise(
        (resolve, reject) => {
          resolve(this.account);
        });
    }

    let injector = ReflectiveInjector.resolveAndCreate([
      RequestService, HTTP_PROVIDERS
    ]);

    let requestService = injector.get(RequestService);
    let url = config.baseApi + '/api/profile';

    return new Promise((resolve, reject) => {
      requestService
        .get(url)
        .then((response) => {
          this.account = response;
          resolve(this.account);
        }, (error) => {
          console.log(error);
          reject({});
        });
    });
  }

  static redirectLogin() {
    let injectorRouter = appInjector();
    let router = injectorRouter.get(Router);
    localStorage.clear();
    router.navigateByUrl('/login');
  }

  static hasRole(role) {
    if (!this.account || !this.account.roles) {
      return false;
    }

    return this.account.roles.indexOf(role) !== -1;
  }
}
