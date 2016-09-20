import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services';

@Pipe({name: 'hasRole'})
export class HasRole implements PipeTransform {

  transform(value: string): boolean {
    if (!value) {
      return false;
    }

    return UserService.hasRole(value);
  }

}
