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

    let url = config.baseApi + '/oauth/v2/token';
    return this.requestService.post(url, body);
  }
}
