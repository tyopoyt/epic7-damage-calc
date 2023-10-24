import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language, Languages } from '../models/languages';

import * as _ from 'lodash-es'
import { debounce } from '../utils/utils';

export const CustomLanguage = {
  name: 'Custom',
  localName: 'Custom',
  code: 'en',
  countryCode: 'us',
  custom: true
}

// TODO: simplified chinese translations for: abyssal yufine, unbridled outburst, kan, tyrant's ascent
// TODO: add pt translations for: abyssal yufine, unbridled outburst, kan, tyrant's ascent
// TODO: check if elementalAdvantage under skills can be removed in each lang file.
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: BehaviorSubject<Language | null> = new BehaviorSubject<Language | null>(null)
  translationDict: Record<string, Record<string, string>> = {};
  englishDict: Record<string, Record<string, string>> = {};
  customDict: Record<string, Record<string, string>> = {};

  sameLanguageCount = 0;

  toolTitles: string[] = ['damage_calculator', 'speed_tuner', 'ehp_calculator', 'effectiveness_checker']
  toolTitleToPathMap: Record<string, string> = {
    'damage_calculator': '',
  'speed_tuner': 'speed-tuner',
    'ehp_calculator': 'ehp-calculator',
    'effectiveness_checker': 'effectiveness'
  }

  toolPathToTitleMap: Record<string, string> = {'damage-calculator': 'damage_calculator'};

  constructor() {
    Object.entries(this.toolTitleToPathMap).forEach(([key, value]) => {
      this.toolPathToTitleMap[value] = key || 'damage-calculator';
    })
  }

  async loadFallbackDict() {
    const englishFile = await fetch(`../../assets/i18n/us.json`);
    this.englishDict = await englishFile.json();
  }

  async setLanguage(language: Language, fromButton = false) {
    if (language) {
      const translationFile = await fetch(`../../assets/i18n/${language?.countryCode}.json`);
      this.translationDict = await translationFile.json();
  
      if (this.language.value === language && fromButton) {
        this.sameLanguageCount++;
        debounce('clearSameLanguageCount', () => {this.sameLanguageCount = 0}, [], 4000)
        if (this.sameLanguageCount >= 3) {
          this.localTranslationTriggered();
          return
        }
      } else {
        this.sameLanguageCount = 0;
      }

      this.language.next(language);
    }
  }

  incrementLanguageCounter() {
    this.sameLanguageCount++;
    if (this.sameLanguageCount >= 3) {
      this.localTranslationTriggered();
    }
  }

  localTranslationTriggered() {
    this.sameLanguageCount = 0;
    if (confirm('Are you sure you want to load a local translation file for testing?\nIf there are any errors with your file you can refresh the page to reset.')) {
      this.getTranslationFile();
    }
  }

  getTranslationFile() {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {    
      const fileInput: HTMLInputElement | null = (e.target as HTMLInputElement);
      if (fileInput.files) {
        const file: File | null = fileInput.files[0];

        const reader = new FileReader();
        reader.readAsText(file,'UTF-8');

        reader.onload = async readerEvent => {
            const content = readerEvent.target?.result;
            this.translationDict = await JSON.parse(content as string);
            this.loadCustomLanguage();
        }
      }
    }

    input.click();
  }

  loadCustomLanguage() {
    this.language.next(
      CustomLanguage
    )
  }

  getSkillModTip = (tips: Record<string, number>) => {
    if (!tips) return '';
  
    const output = [];
    for (const key of Object.keys(tips)) {
      try {
        output.push(_.get(this.translationDict.skills.custom, key, key.toString()).replace('{v}', _.get(tips, key).toString()));
      } catch  {
        output.push(key);
      }
      
    }
  
    return `(${output.join(', ')})`;
  };
}
