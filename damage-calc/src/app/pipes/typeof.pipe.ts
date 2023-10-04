import { Pipe, PipeTransform } from '@angular/core';
import { DamageFormData } from '../models/forms';

@Pipe({
  name: 'typeof'
})
export class TypeofPipe implements PipeTransform {

  transform(value: string, inputValues: DamageFormData): string {
    return typeof inputValues[value as keyof DamageFormData];
  }

}
