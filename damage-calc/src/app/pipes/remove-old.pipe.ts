import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeOld'
})
export class RemoveOldPipe implements PipeTransform {

  transform(value: string): unknown {
    return value.replace(/_old$/, '');
  }

}
