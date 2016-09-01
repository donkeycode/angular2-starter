import { Component } from '@angular/core';
import { DefaultImageDirective } from 'donkeycode-angular2-tools';
import { RequestService } from '../common/services/request.service';

@Component({
  selector: 'home',
  templateUrl: './home.template.html',
  directives: [ DefaultImageDirective ]
})
export class Home {
  constructor(private requestService: RequestService) {}

  ngOnInit() {
    console.log('ngOnInit Home');
  }
}
