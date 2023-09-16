import { Injectable } from '@angular/core';
import { DoT, HitType, Skill } from '../models/skill';
import { DataService } from './data.service';
import { DamageFormData } from '../models/forms';
import { LanguageService } from './language.service';

import * as _ from 'lodash-es';

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

  getGlobalAtkMult = () => {
    let mult = 0.0;
  
    this.dataService.attackModifiers.forEach((mod) => {
      mult += _.get(this.dataService.damageInputValues, mod) ? _.get(this.dataService.battleConstants, mod) - 1 : 0.0;
    });
  
    if (this.dataService.damageInputValues.casterEnrage) {
      mult += 0.1;
    }
  
    return mult + (this.dataService.damageInputValues.attackPercentUp / 100);
  };

  getGlobalDamageMult = (skill: Skill) => {
    let mult = 0.0;

    this.dataService.damageMultSets.forEach((set) => {
      mult += _.get(this.dataService.damageInputValues, set) ? _.get(this.dataService.battleConstants, set) * (_.get(this.dataService.damageInputValues, `${set}Stack`) || 1) : 0.0;
    });

    this.dataService.damageInputValues.defensePreset;
    if (this.dataService.currentHero.element === this.dataService.damageInputValues.defensePreset?.extraDamageElement) {
      mult += (this.dataService.damageInputValues.defensePreset?.extraDamageMultiplier || 1) - 1;
    }

    if (skill.isSingle() && this.dataService.damageInputValues.defensePreset?.singleAttackMultiplier) {
      mult += this.dataService.damageInputValues.defensePreset.singleAttackMultiplier - 1;
    }
    if (!skill.isSingle() && this.dataService.damageInputValues.defensePreset?.nonSingleAttackMultiplier) {
      mult += this.dataService.damageInputValues.defensePreset.nonSingleAttackMultiplier - 1;
    }

    return mult;
  };

  getAfterMathSkillDamage(skill: Skill, hitType: HitType) {
    let skillDamage = 0;
    const skillMultipliers = skill.afterMath();
    if (skillMultipliers !== null) {
      if (skillMultipliers.atkPercent) {
        skillDamage = this.dataService.currentHero.getAtk(skill) * skillMultipliers.atkPercent * this.dataService.battleConstants.dmgConst * this.dataService.currentTarget.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), true);
      } else if (skillMultipliers.defPercent) {
        skillDamage = this.dataService.damageInputValues.casterDefense * skillMultipliers.defPercent * this.dataService.battleConstants.dmgConst * this.dataService.currentTarget.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), true);
      } else if (skillMultipliers.injuryPercent) {
        skillDamage = this.dataService.damageInputValues.targetInjuries * skillMultipliers.injuryPercent * this.dataService.battleConstants.dmgConst * this.dataService.currentTarget.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), true);
      }
    }

    return skillDamage;
  }

  getModifiers(skill: Skill, soulburn = false) {
    return {
      rate: skill.rate(soulburn),
      pow: skill.pow(soulburn),
      mult: skill.mult(soulburn, this) - 1, // TODO: change anything checking for this to be null to check for -1
      multTip: this.languageService.getSkillModTip(skill.multTip(soulburn)),
      afterMathDmg: this.getAfterMathSkillDamage(skill, HitType.crit),
      afterMathFormula: skill.afterMath(soulburn),
      critBoost: skill.critDmgBoost(soulburn),
      critBoostTip: this.languageService.getSkillModTip(skill.critDmgBoostTip(soulburn)),
      detonation: skill.detonation() - 1,
      elemAdv: skill.elementalAdvantage(),
      exEq: skill.exclusiveEquipment(),
      extraDmg: skill.extraDmg(),
      extraDmgTip: this.languageService.getSkillModTip(skill.extraDmgTip(soulburn)),
      fixed: skill.fixed(HitType.crit),
      fixedTip: this.languageService.getSkillModTip(skill.fixedTip()),
      flat: skill.flat(soulburn, this),
      flatTip: this.languageService.getSkillModTip(skill.flatTip(soulburn)),
      pen: skill.penetration(),
      penTip: this.languageService.getSkillModTip(skill.penetrationTip(soulburn)),
    };
  }

  offensivePower(skill: Skill, soulburn = false, isExtra = false) {
    const rate = (typeof skill.rate === 'function') ? skill.rate(soulburn) : skill.rate;
    const flatMod = skill.flat ? skill.flat(soulburn, this.dataService.currentHero) : 0;
    const flatMod2 = this.dataService.currentArtifact.getFlatMult() + (skill.flat2());

    const pow = (typeof skill.pow === 'function') ? skill.pow(soulburn) : skill.pow;
    const skillEnhance = this.dataService.currentHero.getSkillEnhanceMult(skill);
    let elemAdv = 1.0;
    if (this.dataService.damageInputValues.elementalAdvantage || (typeof skill.elementalAdvantage === 'function') && skill.elementalAdvantage() === true) {
      elemAdv = this.dataService.battleConstants.elemAdv;
    }
    const target = this.dataService.damageInputValues.targetTargeted ? this.dataService.battleConstants.target : 1.0;

    let dmgMod = 1.0
        + this.getGlobalDamageMult(skill)
        + this.dataService.damageInputValues.bonusDamage / 100
        + this.dataService.currentArtifact.getDamageMultiplier(skill, isExtra)
        + (skill.mult ? skill.mult(soulburn, this) - 1 : 0);

    return ((this.dataService.currentHero.getAtk(skill) * rate + flatMod) * this.dataService.battleConstants.dmgConst + flatMod2) * pow * skillEnhance * elemAdv * target * dmgMod;
  }

  // Tthis getAtk is called because of lilias
  getDotDamage(skill: Skill, type: DoT) {
    switch (type) {
    case DoT.bleed:
      return this.dataService.currentHero.getAtk(skill) * 0.3 * this.dataService.battleConstants.dmgConst * this.dataService.currentTarget.defensivePower(new Skill({ penetrate: () => 0.7 }), true);
    case DoT.burn:
      return this.dataService.currentHero.getAtk(skill) * 0.6 * this.dataService.battleConstants.dmgConst * (this.dataService.damageInputValues.beehooPassive ? this.dataService.heroConstants.beehooBurnMult : 1) * this.dataService.currentTarget.defensivePower(new Skill({ penetrate: () => 0.7 }), true);
    case DoT.bomb:
      return this.dataService.currentHero.getAtk(skill) * 1.5 * this.dataService.battleConstants.dmgConst * this.dataService.currentTarget.defensivePower(new Skill({ penetrate: () => 0.7 }), true);
    default: return 0;
    }
  }

  getDetonateDamage(skill: Skill) {
    let damage = 0;

    if (skill.detonate.includes(DoT.bleed)) damage += this.dataService.damageInputValues.targetBleedDetonate * skill.detonation() * this.getDotDamage(skill, DoT.bleed);
    if (skill.detonate.includes(DoT.burn)) damage += this.dataService.damageInputValues.targetBurnDetonate * skill.detonation() * this.getDotDamage(skill, DoT.burn);
    if (skill.detonate.includes(DoT.bomb)) damage += this.dataService.damageInputValues.targetBombDetonate * skill.detonation() * this.getDotDamage(skill, DoT.bomb);

    return damage;
  }

  getAfterMathDamage(skill: Skill, hitType: HitType) {
    const detonation = this.getDetonateDamage(skill);

    let artiDamage: number = this.getAfterMathDamage(skill, hitType) || 0;


    const skillDamage = this.getAfterMathSkillDamage(skill, hitType);
    const skillExtraDmg = skill.extraDmg !== undefined ? Math.round(skill.extraDmg(hitType)) : 0;

    return detonation + artiDamage + skillDamage + skillExtraDmg;
  }

  getDamage(skill: Skill, soulburn = false, isExtra = false) {
    const critDmgBuff = this.dataService.damageInputValues.critDamageUp ? this.dataService.battleConstants.critDmgUp : 0.0;
    const hit = this.offensivePower(skill, soulburn, isExtra) * this.dataService.currentTarget.defensivePower(skill);
    const critDmg = Math.min((this.dataService.currentHero.crit / 100) + critDmgBuff, 3.5)
        + (skill.critDmgBoost ? skill.critDmgBoost(soulburn) : 0)
        + (this.dataService.currentArtifact.getCritDmgBoost() || 0)
        + (this.dataService.damageInputValues.casterPerception ? this.dataService.battleConstants.perception : 0);
    return {
      crit: skill.noCrit || skill.onlyMiss ? null : Math.round(hit * critDmg + (skill.fixed !== undefined ? skill.fixed(HitType.crit) : 0) + this.getAfterMathDamage(skill, HitType.crit)),
      crush: skill.noCrit || skill.onlyCrit || skill.onlyMiss ? null : Math.round(hit * 1.3 + (skill.fixed !== undefined ? skill.fixed(HitType.crush) : 0) + this.getAfterMathDamage(skill, HitType.crush)),
      normal: skill.onlyCrit || skill.onlyMiss ? null : Math.round(hit + (skill.fixed !== undefined ? skill.fixed(HitType.normal) : 0) + this.getAfterMathDamage(skill, HitType.normal)),
      miss: skill.noMiss ? null : Math.round(hit * 0.75 + (skill.fixed !== undefined ? skill.fixed(HitType.miss) : 0) + this.getAfterMathDamage(skill, HitType.miss))
    };
  }
}
