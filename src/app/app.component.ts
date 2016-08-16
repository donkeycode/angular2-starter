import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.style.css' ],
  template: require('./app.html')
})
export class App {
  ngOnInit() {
    console.log('ngOnInit App');
  }
}
