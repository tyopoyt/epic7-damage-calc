import { Injectable } from '@angular/core';
import { DoT, HitType, Skill, DoTSkill, AftermathSkill } from '../models/skill';
import { DataService } from './data.service';
import { DamageFormData } from '../models/forms';
import { LanguageService } from './language.service';

import * as _ from 'lodash-es';
import { BehaviorSubject } from 'rxjs';
import { BattleConstants } from 'src/assets/data/constants';

//TODO: all google analytics events
export interface DamageRow {
  skill: string;
  crit: number | null;
  crush: number | null;
  normal: number | null;
  miss: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class DamageService {

  // Skill damages subject
  damages: BehaviorSubject<DamageRow[]> = new BehaviorSubject([] as DamageRow[]);

  // Getters
  get damageForm() {
    return this.dataService.damageInputValues;
  }

  get currentArtifact() {
    return this.dataService.currentArtifact.value;
  }

  get currentHero() {
    return this.dataService.currentHero.value;
  }
  
  constructor(private dataService: DataService, private languageService: LanguageService) {
    this.dataService.damageInputChanged.subscribe(() => {
      this.updateDamages();
    })

    this.dataService.currentArtifact.subscribe(() => {
      this.updateDamages();
    })
  }

  // Calculate the target's defense multiplier
  getGlobalDefenseMult(isAftermath = false): number {
    let mult = 1.0;
    
    for (const defenseModifier of ['targetDefenseUp', 'targetDefenseDown', 'targetVigor', 'targetHasTrauma']) {
      mult += this.damageForm[defenseModifier as keyof DamageFormData] ? BattleConstants[defenseModifier] : 0.0;
    }

    if (isAftermath && this.damageForm['targetDefenseDownAftermath'] && !this.damageForm['targetDefenseDown']) {
      mult += BattleConstants['targetDefenseDown']
    }

    // TODO: double check defense + trauma interaction?
    if (this.damageForm.targetHasTrauma && this.damageForm.targetDefenseDown) {
      mult -= BattleConstants.trauma;
      mult *= 1 + BattleConstants.trauma;
    }
    return mult;
  }

  // Calculate the caster's attack multiplier
  getGlobalAttackMult(): number {
    let mult = 0.0;
  
    this.dataService.attackModifiers.forEach((mod) => {
      if (!mod.endsWith('Stack')) {
        mult += this.damageForm[mod as keyof DamageFormData] ? BattleConstants[mod] - 1 : 0.0;
      } else {
        const attackModStack = this.damageForm[mod as keyof DamageFormData];
        mult += attackModStack ? BattleConstants[mod] * (attackModStack as number) : 0.0;
      }
    });
  
    return mult + (this.damageForm.attackIncreasePercent / 100);
  }

  // Calculate the global damage multiplier
  getGlobalDamageMult(skill: Skill, soulburn: boolean): number {
    let mult = 0.0;
    this.dataService.damageMultSets.forEach((set) => {
      mult += (this.damageForm[set as keyof DamageFormData] || !!this.damageForm[`${set}Stack` as keyof DamageFormData]) ? _.get(BattleConstants, set) * (_.get(this.damageForm, `${set}Stack`, 1) as number) : 0.0;
    });

    // For expedition mainly
    this.damageForm.defensePreset;
    if (this.currentHero.element === this.damageForm.defensePreset?.extraDamageElement) {
      mult += (this.damageForm.defensePreset?.extraDamageMultiplier || 1) - 1;
    }

    if (skill.isSingle(this.damageForm, soulburn) && this.damageForm.defensePreset?.singleAttackMultiplier) {
      mult += this.damageForm.defensePreset.singleAttackMultiplier - 1;
    }
    if (!skill.isSingle(this.damageForm, soulburn) && this.damageForm.defensePreset?.nonSingleAttackMultiplier) {
      mult += this.damageForm.defensePreset.nonSingleAttackMultiplier - 1;
    }

    return mult;
  }

  // Get skill multiplier info for the popup
  getModifiers(skill: Skill, soulburn = false, isExtra = false, isCounter = false) {
    // Handle aftermath damage
    const aftermathFormula = skill.afterMath(HitType.crit, this.damageForm, soulburn);
    const formattedAftermathFormula: Record<string, number> = {}

    if (aftermathFormula) {
      for (const tip of Object.entries(aftermathFormula)) {
        if (tip[1]) {
          formattedAftermathFormula[tip[0]] = tip[1] * 100
        }
      }
    }
    const additionalDamageReduction = 1 - (this.damageForm.additionalDamageReduction / 100)
    const fixedDamage = Math.round(skill.fixed(HitType.crit, this.damageForm, this.currentArtifact, soulburn)) + Math.round(skill.fixed2(HitType.crit, this.damageForm, this.currentArtifact, soulburn))

    return {
      rate: skill.rate(soulburn, this.damageForm, isExtra),
      pow: skill.pow(soulburn, this.damageForm),
      mult: Math.round(((skill.mult(soulburn, this.damageForm, this.currentArtifact, this.currentHero.getAttack(this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), skill, soulburn, HitType.crit)) - 1) * 100)), // TODO: change anything checking for this to be null to check for -1
      multTip: this.languageService.getSkillModTip(skill.multTip(soulburn)),
      afterMathDmg: Math.round(this.currentHero.getAfterMathSkillDamage(skill, HitType.crit, soulburn, this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), this.getGlobalDefenseMult(true), this.dataService.currentTarget)),
      afterMathFormula: Object.keys(formattedAftermathFormula).length ? this.languageService.getSkillModTip(formattedAftermathFormula) : '',
      critBoost: (skill.critDmgBoost(soulburn) * 100),
      critBoostTip: this.languageService.getSkillModTip(skill.critDmgBoostTip(soulburn)),
      // TODO: is there any reason this is called twice w/ ternary rather than just seting the value?
      detonation: skill.detonation(this.damageForm) ? Math.round((skill.detonation(this.damageForm) - 1) * 100) : 0,
      elementalAdvantage: skill.elementalAdvantage(this.damageForm),
      exEq: skill.exclusiveEquipmentMultiplier(this.damageForm) * 100,
      fixed: fixedDamage * additionalDamageReduction,
      fixedTip: this.languageService.getSkillModTip(skill.fixedTip(fixedDamage, this.damageForm)),
      flat: Math.round(skill.flat(soulburn, this.damageForm, this.currentArtifact)),
      flatTip: this.languageService.getSkillModTip(skill.flatTip(soulburn)),
      pen: Math.max((skill.penetrate(soulburn, this.damageForm, this.currentArtifact, this.currentHero.getAttack(this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), skill, soulburn, HitType.crit), this.currentHero.getSpeed(this.damageForm)) * 100) - this.damageForm.penetrationResistance, 0).toFixed(2),
      penTip: this.languageService.getSkillModTip(skill.penetrateTip(soulburn)),
    };
  }

  // Calculate caster's base damage
  offensivePower(skill: Skill, hitType: HitType, soulburn = false, isExtra = false) {
    const rate = skill.rate(soulburn, this.damageForm, isExtra);
    const flatMod = skill.flat(soulburn, this.damageForm, this.currentArtifact);
    //TODO: rename this
    const flatMod2 = this.currentArtifact.getFlatMult(this.damageForm.artifactLevel, this.damageForm, skill, soulburn, hitType, isExtra) + (skill.flat2(this.damageForm));

    const pow = (typeof skill.pow === 'function') ? skill.pow(soulburn, this.damageForm) : skill.pow;
    const skillEnhance = this.currentHero.getSkillEnhanceMult(skill, this.damageForm);
    let elementalAdvantage = 1.0;
    if (this.damageForm.elementalAdvantage || (typeof skill.elementalAdvantage === 'function') && skill.elementalAdvantage(this.damageForm) === true) {
      elementalAdvantage = BattleConstants.elementalAdvantage;
    }
    const target = this.damageForm.targetTargeted ? BattleConstants.target : 1.0;
    const dmgMod = 1.0
        + this.getGlobalDamageMult(skill, soulburn)
        + this.damageForm.damageIncrease / 100
        + this.currentArtifact.getDamageMultiplier(this.damageForm.artifactLevel, this.damageForm, skill, soulburn, hitType, isExtra)
        + (skill.mult ? skill.mult(soulburn, this.damageForm, this.currentArtifact, this.currentHero.getAttack(this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), skill, soulburn, hitType)) - 1 : 0);
    return ((this.currentHero.getAttack(this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), skill, soulburn, hitType, isExtra) * rate + flatMod) * BattleConstants.damageConstant + flatMod2) * pow * skillEnhance * elementalAdvantage * target * dmgMod;
  }

  // This getAtk is called because of lilias
  getDotDamage(skill: Skill, type: DoT) {
    // TODO: is it necessary to pass skill in here? or can just use DoTSkill?
    const casterAttack = this.currentHero.getAttack(this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), skill, false, HitType.normal);
    const casterSpeed = this.currentHero.getSpeed(this.damageForm) // TODO: refactor so this isn't needed?  DotDamage probably shouldn't require the caster's speed...
    switch (type) {
      case DoT.bleed:
        return this.currentHero.getAttack(this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), skill, false, HitType.normal) * 0.3 * BattleConstants.damageConstant * this.dataService.currentTarget.defensivePower(DoTSkill, this.damageForm, this.getGlobalDefenseMult(), this.currentArtifact, false, casterAttack, casterSpeed, HitType.normal, true);
      case DoT.burn:
        return this.currentHero.getAttack(this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), skill, false, HitType.normal) * 0.6 * BattleConstants.damageConstant * (this.damageForm.beehooPassive ? this.dataService.heroConstants.beehooBurnMult : 1) * this.dataService.currentTarget.defensivePower(DoTSkill, this.damageForm, this.getGlobalDefenseMult(), this.currentArtifact, false, casterAttack, casterSpeed, HitType.normal, true);
      case DoT.bomb:
        return this.currentHero.getAttack(this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), skill, false, HitType.normal) * 1.5 * BattleConstants.damageConstant * this.dataService.currentTarget.defensivePower(DoTSkill, this.damageForm, this.getGlobalDefenseMult(), this.currentArtifact, false, casterAttack, casterSpeed, HitType.normal, true);
      case DoT.nail:
        return this.currentHero.getAttack(this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), skill, false, HitType.normal) * 0.8 * BattleConstants.damageConstant * this.dataService.currentTarget.defensivePower(DoTSkill, this.damageForm, this.getGlobalDefenseMult(), this.currentArtifact, false, casterAttack, casterSpeed, HitType.normal, true);
      default: return 0;
    }
  }

  // Get detonation damage for relevant DoTs
  getDetonateDamage(skill: Skill) {
    let damage = 0;

    if (skill.detonate.includes(DoT.bleed)) damage += this.damageForm.targetBleedDetonate * skill.detonation(this.damageForm) * this.getDotDamage(skill, DoT.bleed);
    if (skill.detonate.includes(DoT.burn)) damage += this.damageForm.targetBurnDetonate * skill.detonation(this.damageForm) * this.getDotDamage(skill, DoT.burn);
    if (skill.detonate.includes(DoT.bomb)) damage += this.damageForm.targetBombDetonate * skill.detonation(this.damageForm) * this.getDotDamage(skill, DoT.bomb);

    return damage;
  }

  // Calculate aftermath (additional) damage
  getAfterMathDamage(skill: Skill, hitType: HitType, soulburn: boolean) {
    const detonation = this.getDetonateDamage(skill);
    const debuffDamage = this.damageForm.targetMagicNailed ? this.damageForm.targetFinalMaxHP() * 0.02 : 0
    const buffDamage = this.currentHero.getAfterMathSkillDamage(this.getChallengeAftermathSkill(skill), hitType, soulburn, this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), this.getGlobalDefenseMult(true), this.dataService.currentTarget)
                     + this.currentHero.getAfterMathSkillDamage(this.getSpecialFriendshipAftermathSkill(), hitType, soulburn, this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), this.getGlobalDefenseMult(true), this.dataService.currentTarget);
    const artiDamage: number = this.currentHero.getAfterMathArtifactDamage(skill, this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), this.getGlobalDefenseMult(true), this.dataService.currentTarget, soulburn, hitType) || 0;
    const skillDamage = this.currentHero.getAfterMathSkillDamage(skill, hitType, soulburn, this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), this.getGlobalDefenseMult(true), this.dataService.currentTarget);
    // if more of these buffs get added, would probably be better to handle this iteratively over a list of key: value pairs
    return detonation + debuffDamage + buffDamage + artiDamage + skillDamage + (this.damageForm.casterHasCascade ? 4000 : 0) + (this.damageForm.casterHasOathOfPunishment ? 2500 : 0);
  }

  // Get the final damage numbers to be displayed in the table
  // TODO: ensure this is called only once per skill when something changes (hero, input, etc.)
  getDamage(skill: Skill, soulburn = false, isExtra = false, isCounter = false, inputOverrides: Record<string, number> | null = null): DamageRow {
    this.damageForm.inputOverrides = inputOverrides ? inputOverrides : {};

    const additionalDamageReduction = 1 - (this.damageForm.additionalDamageReduction / 100)
    const casterAttack = this.currentHero.getAttack(this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), skill, soulburn, HitType.normal);
    const casterSpeed = this.currentHero.getSpeed(this.damageForm)
    let critDmgBuff = this.damageForm.increasedCritDamage ? BattleConstants.increasedCritDamage : 0.0;
    critDmgBuff += this.damageForm.casterHasStarsBlessing ? BattleConstants.casterHasStarsBlessing - 1 : 0;
    const hit = this.offensivePower(skill, HitType.normal, soulburn, isExtra) * this.dataService.currentTarget.defensivePower(skill, this.damageForm, this.getGlobalDefenseMult(), this.currentArtifact, soulburn, casterAttack, casterSpeed, HitType.normal);
    const critHit = this.offensivePower(skill, HitType.crit, soulburn, isExtra) * this.dataService.currentTarget.defensivePower(skill, this.damageForm, this.getGlobalDefenseMult(), this.currentArtifact, soulburn, casterAttack, casterSpeed, HitType.crit);
    const critDmg = Math.min((this.damageForm.casterFinalCritDamage / 100) + critDmgBuff, 3.5)
        + (skill.critDmgBoost ? skill.critDmgBoost(soulburn) : 0)
        + (this.currentArtifact.getCritDmgBoost(this.damageForm.artifactLevel, this.damageForm, skill, soulburn, HitType.crit, isExtra) || 0)
        + (this.damageForm.casterPerception ? BattleConstants.perception : 0);

    return {
      skill: (skill.name || skill.id) + (soulburn ? '_soulburn' : (isExtra ? '_extra' : (isCounter && !skill.isCounter ? '_counter': ''))),
      // these 4 need isCounter back at the end if new skill that cares about it is added
      crit: skill.noCrit || skill.onlyMiss ? null : Math.round(critHit * critDmg + ((skill.fixed(HitType.crit, this.damageForm, this.currentArtifact, soulburn) + skill.fixed2(HitType.crit, this.damageForm, this.currentArtifact, soulburn)) * additionalDamageReduction) + this.getAfterMathDamage(skill, HitType.crit, soulburn)),
      crush: skill.noCrit || skill.onlyCrit(soulburn) || skill.onlyMiss ? null : Math.round(hit * 1.3 + ((skill.fixed(HitType.crit, this.damageForm, this.currentArtifact, soulburn) + skill.fixed2(HitType.crit, this.damageForm, this.currentArtifact, soulburn)) * additionalDamageReduction) + this.getAfterMathDamage(skill, HitType.crush, soulburn)),
      normal: skill.onlyCrit(soulburn) || skill.onlyMiss ? null : Math.round(hit + ((skill.fixed(HitType.crit, this.damageForm, this.currentArtifact, soulburn) + skill.fixed2(HitType.crit, this.damageForm, this.currentArtifact, soulburn)) * additionalDamageReduction) + this.getAfterMathDamage(skill, HitType.normal, soulburn)),
      miss: skill.noMiss ? null : Math.round(hit * 0.75 + ((skill.fixed(HitType.crit, this.damageForm, this.currentArtifact, soulburn) + skill.fixed2(HitType.crit, this.damageForm, this.currentArtifact, soulburn)) * additionalDamageReduction) + this.getAfterMathDamage(skill, HitType.miss, soulburn))
    };
  }

  // Recalculate the damages
  // TODO: ensure this isn't called more than needed.  Once per skill per input change, and only once on page load (or maybe twice with queryparams)
  updateDamages() {
    const newDamages: DamageRow[] = []
    for (const skill of Object.values(this.currentHero.skills)) {
      // probably will never happen but if a hero is made whose rate is 0 unless extra, this logic will need to change
      if (skill.rate(false, this.damageForm, false) || skill.pow(false, this.damageForm) || skill.afterMath(HitType.crit, this.damageForm, false) || skill.detonation(this.damageForm)) {
        newDamages.push(this.getDamage(skill, false, false, skill.isCounter));

        if (skill.soulburn) {
          newDamages.push(this.getDamage(skill, true, false));
        }
  
        if (skill.canExtra && (this.currentArtifact.extraAttackBonus || skill.extraModifier)) {
          newDamages.push(this.getDamage(skill, false, true));
        }
      }
    }
    this.damages.next(newDamages);
  }

  // Get caster's barrier strengths
  getBarriers(): {label: string, value: number}[] {
    const barriers = [];
    if (this.currentHero.barrier) {
      let barrierEnhanceMultiplier = 1;
      if (this.currentHero.barrierEnhance) {
        for (let i = 0; i < (this.damageForm['molagora' + this.currentHero.barrierEnhance] as number); i++) {
          barrierEnhanceMultiplier += this.currentHero.skills[this.currentHero.barrierEnhance].enhance[i];
        }
      }

      const barrierLabel = this.currentHero.barrierSkills?.length ? this.currentHero.barrierSkills[0] : 'S1'
      const soulburn = barrierLabel.endsWith('Soulburn')
      
      barriers.push({label: barrierLabel, value: Math.round(this.currentHero.barrier(this.currentHero, new Skill({}), this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), soulburn) * barrierEnhanceMultiplier)})
    }

    if (this.currentHero.barrier2) {
      let barrierEnhanceMultiplier = 1;
      if (this.currentHero.barrier2Enhance) {
        for (let i = 0; i < (this.damageForm['molagora' + this.currentHero.barrier2Enhance] as number); i++) {
          barrierEnhanceMultiplier += this.currentHero.skills[this.currentHero.barrier2Enhance].enhance[i];
        }
      }

      const barrierLabel = this.currentHero.barrierSkills ? this.currentHero.barrierSkills[1] : 'S2'
      const soulburn = barrierLabel.endsWith('Soulburn')
      barriers.push({label: barrierLabel, value: Math.round(this.currentHero.barrier2(this.currentHero, new Skill({}), this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), soulburn) * barrierEnhanceMultiplier)})
    }

    return barriers;
  }

  // Get damage from the artifact
  getArtifactDamage(soulburn: boolean, hitType: HitType): number {
    return Math.round(this.currentHero.getAfterMathArtifactDamage(new Skill({id: 's1', isAOE: () => true, isSingle: () => true}), this.currentArtifact, this.damageForm, this.getGlobalAttackMult(), this.getGlobalDefenseMult(true), this.dataService.currentTarget, soulburn, hitType) || 0);
  }

  getChallengeAftermathSkill(skill: Skill) {
    if (this.damageForm.casterHasChallenge && skill.id == 's1') {
      return new Skill({afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? new AftermathSkill({ targetMaxHPPercent: 0.1 }) : null});
    } else {
      return new Skill({});
    }
  }

  getSpecialFriendshipAftermathSkill() {
    if (this.damageForm.casterHasSpecialFriendship) {
      return new Skill({afterMath: (hitType: HitType) => (hitType === HitType.crit) ? new AftermathSkill({ hpPercent: 0.08 }) : null});
    } else {
      return new Skill({});
    }
  }
}
