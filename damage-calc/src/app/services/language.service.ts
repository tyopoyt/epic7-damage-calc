import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language, Languages } from '../models/languages';

import * as _ from 'lodash-es'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: BehaviorSubject<Language | null> = new BehaviorSubject<Language | null>(null)
  translationDict: Record<string, Record<string, string>> = {};
  englishDict: Record<string, Record<string, string>> = {};

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

  async setLanguage(language: Language) {
    if (!!language) {
      const translationFile = await fetch(`../../assets/i18n/${language?.countryCode}.json`);
      this.translationDict = await translationFile.json();
  
      this.language.next(language);
    }
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
