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
    let valueToUse = value;
    let suffix = "";
    if (value.endsWith("_old")) {
      valueToUse = value.slice(0, -4)
      suffix = ` (${_.get(this.languageService.translationDict[category], 'pre_balance') || _.get(this.languageService.englishDict[category], 'pre_balance', 'Pre-Balance')})`
    }

    return (_.get(this.languageService.translationDict[category], valueToUse) || _.get(this.languageService.englishDict[category], valueToUse, value)) + suffix;
  }
}
