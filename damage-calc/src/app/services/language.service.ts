import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language, Languages } from '../models/languages';

import * as _ from 'lodash-es'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: BehaviorSubject<Language> = new BehaviorSubject(Languages.us)
  translationDict: Record<string, Record<string, string>> = {};

  toolTitles: string[] = ['damage_calculator', 'speed_tuner', 'ehp_calculator', 'effectiveness_checker']
  toolTitleToPathMap: Record<string, string> = {
    'damage_calculator': '',
    'speed_tuner': 'speed-tuner',
    'ehp_calculator': 'ehp-calculator',
    'effectiveness_checker': 'effectiveness'
  }

  toolPathToTitleMap: Record<string, string> = {'damage-calculator': 'damage_calculator'};

  // Define page titles here for faster initial load
  pageTitles: Record<string, Record<string, string>> = {
    'us': {
      epic_7: 'Epic 7',
      damage_calculator_title: 'Epic 7 Damage Calculator',
      damage_calculator: 'Damage Calculator',
      ehp_calculator_title: 'Epic 7 Effective HP Calculator',
      ehp_calculator: 'Effective HP',
      effectiveness_checker_title: 'Epic 7 Effect Chance Calculator',
      effectiveness_checker: 'Effect Chance',
      speed_tuner_title: 'Epic 7 Speed Tuner',
      speed_tuner: 'Speed Tuner'
    },
    'jp': {
      epic_7: 'エピックセブン',
      damage_calculator_title: 'エピックセブン　ダメージ計算機',
      damage_calculator: 'ダメージ計算機',
      ehp_calculator_title: 'エピックセブン 実効生命力計算機',
      ehp_calculator: '実効生命力計算機',
      effectiveness_checker_title: 'エピックセブン 効果発動率計算機',
      effectiveness_checker: '効果発動率計算機',
      speed_tuner_title: 'エピックセブン スピードチューナー',
      speed_tuner: 'スピードチューナー'
    },
    'br': {
      epic_7: 'Epic 7',
      damage_calculator_title: 'Epic 7 Calculadora de Dano',
      damage_calculator: 'Calculadora de Dano',
      ehp_calculator_title: 'Epic 7 HP Efetivo',
      ehp_calculator: 'HP Efetivo',
      effectiveness_checker_title: 'Epic 7 Chance de Eficácia',
      effectiveness_checker: 'Chance de Eficácia',
      speed_tuner_title: 'Epic 7 Ajustador de Speed',
      speed_tuner: 'Ajustador de Speed'
    },
    'kr': {
      epic_7: '에픽세븐',
      damage_calculator_title: '에픽세븐 데미지 계산기',
      damage_calculator: '데미지 계산기',
      effectiveness_checker_title: '에픽세븐 효과적중 확률 계산기',
      effectiveness_checker: '효과적중 확률 계산기'
    },
    'tw': {
      epic_7: '第七史詩',
      damage_calculator_title: '第七史詩 傷害計算器',
      damage_calculator: '傷害計算器',
      effectiveness_checker_title: '第七史詩效果命中與抵抗計算',
      effectiveness_checker: '效果命中與抵抗計算'
    },
    'cn': {
      epic_7: '第七史诗',
      damage_calculator_title: '第七史诗 伤害计算器',
      damage_calculator: '伤害计算器',
      effectiveness_checker_title: '第七史诗效果命中与抵抗计算',
      effectiveness_checker: '效果命中与抵抗计算'
    }
  }

  constructor() {
    Object.entries(this.toolTitleToPathMap).forEach(([key, value]) => {
      this.toolPathToTitleMap[value] = key || 'damage-calculator';
    })
  }

  async setLanguage(language: Language) {
    const translationFile = await fetch(`../../assets/i18n/${language.countryCode}.json`);
    this.translationDict = await translationFile.json();

    this.language.next(language);
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
