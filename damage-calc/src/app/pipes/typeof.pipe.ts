import { Pipe, PipeTransform } from '@angular/core';
import { DamageFormData } from '../models/forms';

@Pipe({
    name: 'typeof',
    standalone: false
})
export class TypeofPipe implements PipeTransform {

  transform(value: string, inputValues: DamageFormData): string {
    return typeof inputValues[value as keyof DamageFormData];
  }

}
