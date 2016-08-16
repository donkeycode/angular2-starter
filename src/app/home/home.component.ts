import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.template.html'
})
export class Home {
  ngOnInit() {
    console.log('ngOnInit Home');
  }
}
