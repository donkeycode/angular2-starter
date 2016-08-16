import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { contentHeaders } from './headers';
import { config } from '../../config';
import { UserService } from './user';

@Injectable()
export class RequestService {
  static isRefreshingToken = null;
  activeRequest = null;

  constructor(public http: Http) {
  }


  private parseMessage(response) {
    if (response && response._body) {
      return JSON.parse(response._body);
    }

    return response;
  }

  public transformUrl(url) {
    if (url.indexOf('://') === -1) {
      url = config.baseApi + '/' + url;
    }

    if (url.indexOf('access_token') > -1) {
      return url;
    }

    let accessToken = localStorage.getItem('auth_access_token');
    if (accessToken) {
      let separator = '?';
      if (url.indexOf('?') > -1) {
        separator = '&';
      }
      url += separator + 'access_token=' + accessToken;
    }

    return url;
  }

  private handleUnauthorized(resolve, reject, self, method, callbackArgs) {
    this.refreshToken()
    .then(() => {
      self[method](callbackArgs)
      .then((response) => {
        resolve(this.parseMessage(response));
      }, (error) => {
        reject(this.parseMessage(error))
      });
    }, (error) => {
      resolve(this.parseMessage(error));
      UserService.redirectLogin();
    });
  }

  private handleRequest(self, method, args, originalArgs) {
    return new Promise(
      (resolve, reject) => {
        this.activeRequest = self['http']
        [method](...args)
        .subscribe(
          (response: any) => {
            resolve(this.parseMessage(response));
          },
          (error) => {
            if (error.status === 401) {
              this.handleUnauthorized(resolve, reject, self, method, originalArgs);
            } else {
              reject(this.parseMessage(error));
            }
          }
        )
      }
    );
  }

  public post(url, body): any {
    let args = [this.transformUrl(url), JSON.stringify(body), { headers: contentHeaders }];
    let originalArgs = [url, body];
    return this.handleRequest(this, 'post', args, originalArgs);
  }

  public put(url, body): any {
    let args = [this.transformUrl(url), JSON.stringify(body), { headers: contentHeaders }];
    let originalArgs = [url, body];
    return this.handleRequest(this, 'put', args, originalArgs);
  }

  public get(url): any {
    let args = [this.transformUrl(url), { headers: contentHeaders }];
    let originalArgs = [url];
    return this.handleRequest(this, 'get', args, originalArgs);
  }

  public delete(url): any {
    let args = [this.transformUrl(url), { headers: contentHeaders }];
    let originalArgs = [url];
    return this.handleRequest(this, 'delete', args, originalArgs);
  }

  private refresh() {
    let body = {
      client_id: config.client_id,
      client_secret: config.client_secret,
      refresh_token: localStorage.getItem('auth_refresh_token'),
      grant_type: 'refresh_token'
    };
    return this.post('/oauth/v2/token', body);
  }

  private refreshToken() {
    if (RequestService.isRefreshingToken) {
      return RequestService.isRefreshingToken;
    }

    RequestService.isRefreshingToken = this.refresh()
    .then((response) => {
      localStorage.setItem('auth_access_token', response.access_token);
      localStorage.setItem('auth_expires_in', response.expires_in);
      localStorage.setItem('auth_refresh_token', response.refresh_token);
      localStorage.setItem('auth_scope', response.scope);
      localStorage.setItem('auth_token_type', response.token_type);
      RequestService.isRefreshingToken = null;
    });
    return RequestService.isRefreshingToken;
  }

  public getPaginatedUrl(url, page, max) {
    if (page === 0 && max === 0) {
      return url;
    }
    let separator = '?';
    if (url.indexOf('?') > -1) {
      separator = '&';
    }
    url += separator + 'page=' + page + '&page_size=' + max;
    return url;
  }

  public stopRequest() {
    if (this.activeRequest) {
      this.activeRequest.unsubscribe();
    }
    this.activeRequest = null;
  }
}
