import { Injectable, Inject } from '@angular/core';
import { BaseRequestService } from 'donkeycode-angular2-tools/src/services/base-request.service';
import { Http } from '@angular/http';
import { contentHeaders } from './headers';
import { config } from '../../config';

@Injectable()
export class RequestService extends BaseRequestService {

  constructor(@Inject(Http) http) {
    super(http);
    super.init(config, contentHeaders);
  }

}
