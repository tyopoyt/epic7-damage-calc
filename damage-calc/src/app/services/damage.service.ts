import { Injectable } from '@angular/core';
import { DoT, HitType, Skill } from '../models/skill';
import { DataService } from './data.service';
import { DamageFormData } from '../models/forms';
import { LanguageService } from './language.service';

import * as _ from 'lodash-es';
import { BehaviorSubject } from 'rxjs';
import { BattleConstants } from 'src/assets/data/constants';

export interface Damages {
  crit: number | null;
  crush: number | null;
  normal: number | null;
  miss: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class DamageService {

  damages: BehaviorSubject<Record<string, Damages>> = new BehaviorSubject({});

  get damageForm() {
    return this.dataService.damageInputValues;
  }
  
  // TODO: comment functions
  constructor(private dataService: DataService, private languageService: LanguageService) {
    this.dataService.damageInputChanged.subscribe(() => {
      this.updateDamages();
    })
  }

  getGlobalDefenseMult(): number {
    let mult = 1.0;
    
    for (const defenseModifier of ['targetDefenseUp', 'targetDefenseDown', 'targetVigor']) {
      mult += this.damageForm[defenseModifier as keyof DamageFormData] ? BattleConstants[defenseModifier] : 0.0;
    }
  
    return mult;
  }

  getGlobalAttackMult(): number {
    let mult = 0.0;
  
    this.dataService.attackModifiers.forEach((mod) => {
      mult += this.damageForm[mod as keyof DamageFormData] ? BattleConstants[mod] - 1 : 0.0;
    });
  
    if (this.damageForm.casterEnraged) {
      mult += 0.1;
    }
  
    return mult + (this.damageForm.attackIncreasePercent / 100);
  }

  getGlobalDamageMult(skill: Skill): number {
    let mult = 0.0;
    // TODO: double check rage when hp scaling works
    this.dataService.damageMultSets.forEach((set) => {
      mult += (this.damageForm[set as keyof DamageFormData] || !!this.damageForm[`${set}Stack` as keyof DamageFormData]) ? _.get(BattleConstants, set) * (_.get(this.damageForm, `${set}Stack`, 1)) : 0.0;
    });

    this.damageForm.defensePreset;
    if (this.dataService.currentHero.value.element === this.damageForm.defensePreset?.extraDamageElement) {
      mult += (this.damageForm.defensePreset?.extraDamageMultiplier || 1) - 1;
    }

    if (skill.isSingle() && this.damageForm.defensePreset?.singleAttackMultiplier) {
      mult += this.damageForm.defensePreset.singleAttackMultiplier - 1;
    }
    if (!skill.isSingle() && this.damageForm.defensePreset?.nonSingleAttackMultiplier) {
      mult += this.damageForm.defensePreset.nonSingleAttackMultiplier - 1;
    }

    return mult;
  }

  getModifiers(skill: Skill, soulburn = false) {
    return {
      rate: skill.rate(soulburn),
      pow: skill.pow(soulburn),
      mult: skill.mult(soulburn, this) - 1, // TODO: change anything checking for this to be null to check for -1
      multTip: this.languageService.getSkillModTip(skill.multTip(soulburn)),
      afterMathDmg: this.dataService.currentHero.value.getAfterMathSkillDamage(skill, HitType.crit, this.dataService.currentArtifact.value, this.damageForm, this.getGlobalAttackMult(), this.getGlobalDefenseMult(), this.dataService.currentTarget),
      afterMathFormula: skill.afterMath(soulburn),
      critBoost: skill.critDmgBoost(soulburn),
      critBoostTip: this.languageService.getSkillModTip(skill.critDmgBoostTip(soulburn)),
      detonation: skill.detonation() - 1,
      elementalAdvantage: skill.elementalAdvantage(),
      exEq: skill.exclusiveEquipment(),
      extraDmg: skill.extraDmg(),
      extraDmgTip: this.languageService.getSkillModTip(skill.extraDmgTip(soulburn)),
      fixed: skill.fixed(HitType.crit),
      fixedTip: this.languageService.getSkillModTip(skill.fixedTip()),
      flat: skill.flat(soulburn, this),
      flatTip: this.languageService.getSkillModTip(skill.flatTip(soulburn)),
      pen: skill.penetrate(),
      penTip: this.languageService.getSkillModTip(skill.penetrateTip(soulburn)),
    };
  }

  offensivePower(skill: Skill, soulburn = false, isExtra = false) {
    const rate = skill.rate(soulburn, this.damageForm);
    const flatMod = skill.flat ? skill.flat(soulburn, this.dataService.currentHero.value) : 0;
    //TODO: rename this
    const flatMod2 = this.dataService.currentArtifact.value.getFlatMult(this.damageForm.artifactLevel) + (skill.flat2());

    const pow = (typeof skill.pow === 'function') ? skill.pow(soulburn) : skill.pow;
    const skillEnhance = this.dataService.currentHero.value.getSkillEnhanceMult(skill, this.dataService.molagoras());
    let elementalAdvantage = 1.0;
    if (this.damageForm.elementalAdvantage || (typeof skill.elementalAdvantage === 'function') && skill.elementalAdvantage() === true) {
      elementalAdvantage = BattleConstants.elementalAdvantage;
    }
    const target = this.damageForm.targetTargeted ? BattleConstants.target : 1.0;

    const dmgMod = 1.0
        + this.getGlobalDamageMult(skill)
        + this.damageForm.damageIncrease / 100
        + this.dataService.currentArtifact.value.getDamageMultiplier(skill, isExtra, this.damageForm.artifactLevel)
        + (skill.mult ? skill.mult(soulburn, this) - 1 : 0); // TODO: 'this' is certainly the wrong thing to pass here

    return ((this.dataService.currentHero.value.getAttack(this.dataService.currentArtifact.value, this.damageForm, this.getGlobalAttackMult(), skill) * rate + flatMod) * BattleConstants.dmgConst + flatMod2) * pow * skillEnhance * elementalAdvantage * target * dmgMod;
  }

  // Tthis getAtk is called because of lilias
  getDotDamage(skill: Skill, type: DoT) {
    switch (type) {
    case DoT.bleed:
      return this.dataService.currentHero.value.getAttack(this.dataService.currentArtifact.value, this.damageForm, this.getGlobalAttackMult(), skill) * 0.3 * BattleConstants.dmgConst * this.dataService.currentTarget.defensivePower(new Skill({ penetrate: () => 0.7 }), this.damageForm, this.getGlobalDefenseMult(), true);
    case DoT.burn:
      return this.dataService.currentHero.value.getAttack(this.dataService.currentArtifact.value, this.damageForm, this.getGlobalAttackMult(), skill) * 0.6 * BattleConstants.dmgConst * (this.damageForm.beehooPassive ? this.dataService.heroConstants.beehooBurnMult : 1) * this.dataService.currentTarget.defensivePower(new Skill({ penetrate: () => 0.7 }), this.damageForm, this.getGlobalDefenseMult(), true);
    case DoT.bomb:
      return this.dataService.currentHero.value.getAttack(this.dataService.currentArtifact.value, this.damageForm, this.getGlobalAttackMult(), skill) * 1.5 * BattleConstants.dmgConst * this.dataService.currentTarget.defensivePower(new Skill({ penetrate: () => 0.7 }), this.damageForm, this.getGlobalDefenseMult(), true);
    default: return 0;
    }
  }

  getDetonateDamage(skill: Skill) {
    let damage = 0;

    if (skill.detonate.includes(DoT.bleed)) damage += this.damageForm.targetBleedDetonate * skill.detonation() * this.getDotDamage(skill, DoT.bleed);
    if (skill.detonate.includes(DoT.burn)) damage += this.damageForm.targetBurnDetonate * skill.detonation() * this.getDotDamage(skill, DoT.burn);
    if (skill.detonate.includes(DoT.bomb)) damage += this.damageForm.targetBombDetonate * skill.detonation() * this.getDotDamage(skill, DoT.bomb);

    return damage;
  }

  getAfterMathDamage(skill: Skill, hitType: HitType) {
    const detonation = this.getDetonateDamage(skill);

    // let artiDamage: number = this.getArtifactAfterMathDamage(skill, hitType) || 0;
    const artiDamage: number = this.dataService.currentHero.value.getAfterMathArtifactDamage(skill, this.dataService.currentArtifact.value, this.damageForm, this.getGlobalAttackMult(), this.getGlobalDefenseMult(), this.dataService.currentTarget) || 0;


    const skillDamage = this.dataService.currentHero.value.getAfterMathSkillDamage(skill, HitType.crit, this.dataService.currentArtifact.value, this.damageForm, this.getGlobalAttackMult(), this.getGlobalDefenseMult(), this.dataService.currentTarget);
    const skillExtraDmg = skill.extraDmg !== undefined ? Math.round(skill.extraDmg(hitType)) : 0;

    return detonation + artiDamage + skillDamage + skillExtraDmg;
  }

  getDamage(skill: Skill, soulburn = false, isExtra = false): Damages {
    const critDmgBuff = this.damageForm.increasedCritDamage ? BattleConstants.increasedCritDamage : 0.0;
    const hit = this.offensivePower(skill, soulburn, isExtra) * this.dataService.currentTarget.defensivePower(skill, this.damageForm, this.getGlobalDefenseMult());
    const critDmg = Math.min((this.damageForm.critDamage / 100) + critDmgBuff, 3.5)
        + (skill.critDmgBoost ? skill.critDmgBoost(soulburn) : 0)
        + (this.dataService.currentArtifact.value.getCritDmgBoost(this.damageForm.artifactLevel) || 0)
        + (this.damageForm.casterPerception ? BattleConstants.perception : 0);
    return {
      crit: skill.noCrit || skill.onlyMiss ? null : Math.round(hit * critDmg + (skill.fixed !== undefined ? skill.fixed(HitType.crit) : 0) + this.getAfterMathDamage(skill, HitType.crit)),
      crush: skill.noCrit || skill.onlyCrit || skill.onlyMiss ? null : Math.round(hit * 1.3 + (skill.fixed !== undefined ? skill.fixed(HitType.crush) : 0) + this.getAfterMathDamage(skill, HitType.crush)),
      normal: skill.onlyCrit || skill.onlyMiss ? null : Math.round(hit + (skill.fixed !== undefined ? skill.fixed(HitType.normal) : 0) + this.getAfterMathDamage(skill, HitType.normal)),
      miss: skill.noMiss ? null : Math.round(hit * 0.75 + (skill.fixed !== undefined ? skill.fixed(HitType.miss) : 0) + this.getAfterMathDamage(skill, HitType.miss))
    };
  }

  updateDamages() {
    const newDamages: Record<string, Damages> = {}
    for (const [skillID, skill] of Object.entries(this.dataService.currentHero.value.skills)) {
      newDamages[skillID] = this.getDamage(skill, false, false)

      if (skill.soulburn) {
        newDamages[`${skillID}_soulburn`] = this.getDamage(skill, true, false)
      }

      if (skill.canExtra) {
        newDamages[`${skillID}_extra`] = this.getDamage(skill, false, true)
      }
    }

    this.damages.next(newDamages)
  }
}
