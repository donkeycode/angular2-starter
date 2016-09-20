import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./app.style.scss') ],
  template: require('./app.html')
})
export class App {
  ngOnInit() {
    console.log('ngOnInit App');
  }
}
