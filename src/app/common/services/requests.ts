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

  public transformUrl(url) {
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

  public post(url, body): any {
    return new Promise(
      (resolve, reject) => this.http
        .post(this.transformUrl(url), JSON.stringify(body), { headers: contentHeaders })
        .subscribe(
          (response: any) => {
            if (response && response._body) {
              resolve(JSON.parse(response._body));
            }
            resolve();
          },
          (error) => {
            if (error.status === 401) {
              this.refreshToken(error)
              .then(() => {
                this.post(url, body)
                .then((response) => {
                  resolve(response);
                }, (error) => {
                  reject(error)
                });
              }, (error) => {
                resolve(error);
                UserService.redirectLogin();
              });
            } else {
              reject(error);
            }
          }
        )
      );
  }

  public put(url, body): any {
    return new Promise(
      (resolve, reject) => this.http
        .put(this.transformUrl(url), JSON.stringify(body), { headers: contentHeaders })
        .subscribe(
          (response: any) => {
            if (response && response._body) {
              resolve(JSON.parse(response._body));
            }
            resolve();
          },
          (error) => {
            if (error.status === 401) {
              this.refreshToken(error)
              .then(() => {
                this.put(url, body)
                .then((response) => {
                  resolve(response);
                }, (error) => {
                  reject(error)
                });
              }, (error) => {
                resolve(error);
                UserService.redirectLogin();
              });
            } else {
              reject(error);
            }
          }
        )
      );
  }

  public get(url): any {
    return new Promise(
      (resolve, reject) => {
        this.activeRequest = this.http
        .get(this.transformUrl(url), { headers: contentHeaders })
        .subscribe(
          (response: any) => {
            if (response && response._body) {
              resolve(JSON.parse(response._body));
            }
            resolve();
          },
          (error) => {
            if (error.status === 401) {
              this.refreshToken(error)
              .then(() => {
                this.get(url)
                .then((response) => {
                  resolve(response);
                }, (error) => {
                  reject(error)
                });
              }, (error) => {
                resolve(error);
                UserService.redirectLogin();
              });
            } else {
              reject(error);
            }
          }
        )
      }
    );
  }

  public delete(url): any {
    return new Promise(
      (resolve, reject) => this.http
        .delete(this.transformUrl(url), { headers: contentHeaders })
        .subscribe(
          (response: any) => {
            if (response && response._body) {
              resolve(JSON.parse(response._body));
            }
            resolve();
          },
          (error) => {
            if (error.status === 401) {
              this.refreshToken(error)
              .then(() => {
                this.delete(url)
                .then((response) => {
                  resolve(response);
                }, (error) => {
                  reject(error)
                });
              }, (error) => {
                resolve(error);
                UserService.redirectLogin();
              });
            } else {
              reject(error);
            }
          }
        )
      );
  }

  private refresh() {
    let body = {
      client_id: config.client_id,
      client_secret: config.client_secret,
      refresh_token: localStorage.getItem('auth_refresh_token'),
      grant_type: 'refresh_token'
    };
    return this.post(config.baseApi + '/noauth/oauth/v2/token', body);
  }

  private refreshToken(error) {
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
