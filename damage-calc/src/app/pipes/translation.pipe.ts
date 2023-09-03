import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../models/languages';

@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {

  transform(value: string, language: Language): string {
    return value;
  }

}
