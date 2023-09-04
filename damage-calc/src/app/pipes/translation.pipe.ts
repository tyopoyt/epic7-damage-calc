import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Language } from '../models/languages';

@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {

  constructor(private languageService: LanguageService) {}

  transform(value: string, category: string, language: Language): string {
    try {
      return this.languageService.translationDict[category][value];
    } catch {
      return value;
    }
  }

}
