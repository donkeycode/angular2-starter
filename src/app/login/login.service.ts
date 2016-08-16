import { Injectable } from '@angular/core';
import { RequestService } from '../common/services';
import { config } from '../config';

@Injectable()
export class LoginService {
  constructor(private requestService: RequestService) {
  }

  public login(body) {
    body.client_id = config.client_id;
    body.client_secret = config.client_secret;
    body.grant_type = 'password';

    let url = config.baseApi + '/noauth/oauth/v2/token';
    return this.requestService.post(url, body);
  }

  public signin(body) {
    let url = config.baseApi + '/noauth/registration';
    return this.requestService.post(url, body);
  }

  public setPassword(body, userId) {
    let url = config.baseApi + '/noauth/setpassword/' + userId;
    return this.requestService.post(url, body);
  }

  public resetPassword(body) {
    let url = config.baseApi + '/noauth/changepassword';
    return this.requestService.post(url, body);
  }
}
