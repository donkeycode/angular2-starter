import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  templateUrl: './about.template.html'
})
export class About {
  resolvedData = null;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('ngOnInit About');
    this.route
      .data
      .subscribe((data: any) => {
        console.log('resolve data', data);
        this.resolvedData = data.yourData;
      });
  }
}
