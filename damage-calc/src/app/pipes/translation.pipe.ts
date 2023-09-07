import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Language } from '../models/languages';

import * as _ from 'lodash-es'

@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {

  constructor(private languageService: LanguageService) {}

  transform(value: string, category: string, language: Language | null): string {
    return _.get(this.languageService.translationDict[category], value) || _.get(this.languageService.englishDict[category], value, value);
  }
}
