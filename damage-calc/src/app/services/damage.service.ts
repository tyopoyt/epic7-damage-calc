import { Injectable } from '@angular/core';
import { HitType, Skill } from '../models/skill';
import { DataService } from './data.service';
import { Hero } from '../models/hero';
import { Target } from '../models/target';
import { DamageFormData } from '../models/forms';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class DamageService {

  constructor(private dataService: DataService, private languageService: LanguageService) { }

  getGlobalDefMult(): number {
    let mult = 1.0;
    
    for (const defenseModifier of ['defUp', 'defDown', 'targetVigor']) {
      mult += this.dataService.damageInputValues[defenseModifier as keyof DamageFormData] ? this.dataService.battleConstants[defenseModifier] : 0.0;
    }
  
    return mult;
  }

  getAfterMathSkillDamage(hero: Hero, skill: Skill, target: Target, hitType: HitType) {
    let skillDamage = 0;
    const skillMultipliers = skill.afterMath();
    if (skillMultipliers !== null) {
      if (skillMultipliers.atkPercent) {
        skillDamage = hero.getAtk(skill) * skillMultipliers.atkPercent * this.dataService.battleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }, this.languageService), true);
      } else if (skillMultipliers.defPercent) {
        skillDamage = this.dataService.damageInputValues.casterDefense * skillMultipliers.defPercent * this.dataService.battleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }, this.languageService), true);
      } else if (skillMultipliers.injuryPercent) {
        skillDamage = this.dataService.damageInputValues.targetInjuries * skillMultipliers.injuryPercent * this.dataService.battleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }, this.languageService), true);
      }
    }

    return skillDamage;
  }
}
