import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'customDate'})
export class CustomDate implements PipeTransform {

  transform(value: string = null, format = 'YYYY/MM/DD'): string {
    return CustomDate.staticTransform(value, format);
  }

  static staticTransform(value: string = null, format = 'YYYY/MM/DD'): string {
    if (!value) {
      return '';
    }

    return moment(value).format(format);
  }
}
