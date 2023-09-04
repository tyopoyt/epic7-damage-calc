import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language, languages } from '../models/languages';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: BehaviorSubject<Language> = new BehaviorSubject(languages.us)
  translationDict: Record<string, Record<string, string>> = {};

  // Define page titles here for faster initial load
  pageTitles: Record<string, Record<string, string>> = {
    'us': {
      damage_calculator_title: 'Epic 7 Damage Calculator',
      ehp_calculator_title: 'Epic 7 Effective HP Calculator',
      effectiveness_checker_title: 'Epic 7 Effect Chance Calculator',
      speed_tuner_title: 'Epic 7 Speed Tuner'
    },
    'jp': {
      damage_calculator_title: 'エピックセブン　ダメージ計算機',
      effectiveness_checker_title: 'エピックセブン 効果発動率計算機'
    },
    'br': {
      damage_calculator_title: 'Epic 7 Calculadora de Dano',
      ehp_calculator_title: 'Epic 7 Calculadora de HP Efetivo',
      effectiveness_checker_title: 'Epic 7 Calculadora de Chance de Eficácia',
      speed_tuner_title: 'Epic 7 Ajustador de Speed'
    },
    'kr': {
      damage_calculator_title: '에픽세븐 데미지 계산기',
      effectiveness_checker_title: '에픽세븐 효과적중 확률 계산기'
    },
    'tw': {
      damage_calculator_title: '第七史詩 傷害計算器',
      effectiveness_checker_title: '第七史詩效果命中與抵抗計算'
    },
    'cn': {
      damage_calculator_title: '第七史诗 伤害计算器',
      effectiveness_checker_title: '第七史诗效果命中与抵抗计算'
    }
  }

  constructor() { }

  async setLanguage(language: Language) {
    const translationFile = await fetch(`../../assets/i18n/${language.countryCode}.json`);
    this.translationDict = await translationFile.json();

    this.language.next(language);
  }
}
