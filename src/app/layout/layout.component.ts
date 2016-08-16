import { Component } from '@angular/core';
import { UserService } from '../common/services';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'layout',
  template: require('./layout.html')
})
export class Layout {
  profile = null;

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log('ngOnInit Layout');
    UserService.getProfile()
    .then((response) => {
      this.profile = response;
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
