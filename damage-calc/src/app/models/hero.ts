import { Artifact } from "./artifact";
import { Target } from "./target";
import { DamageFormData } from "./forms";
import { DoT, HitType, Skill } from "./skill";
import { BattleConstants } from "../../assets/data/constants"
import * as _ from 'lodash-es'

export enum HeroElement {
    fire = 'fire',
    earth = 'earth',
    ice = 'ice',
    light = 'light',
    dark = 'dark'
}

export enum HeroClass {
    knight = 'knight',
    mage = 'mage',
    ranger = 'ranger',
    soul_weaver = 'soul_weaver',
    warrior = 'warrior',
    thief = 'thief'
}
//TODO: refactor atk to attack and crit to critDamage
export class Hero {
    attackIncrease?: Function;
    barrier?: Function;
    barrier2?: Function;
    barrier2Enhance?: string;
    barrierEnhance?: string;
    barrierSkills?: string[];
    baseAttack: number;
    baseDefense: number;
    baseHP: number;
    class: HeroClass;
    dot?: DoT[];
    element: HeroElement;
    innateAttackIncrease?: Function;
    skills: Record<string, Skill>;
    exclusiveEquipmentMultiplier?: Function;

  constructor(
      heroValues: any,
    )
  {
    this.attackIncrease = _.get(heroValues, 'attackIncrease', () => 1);
    this.barrier = _.get(heroValues, 'barrier', () => 0);
    this.barrier2 = _.get(heroValues, 'barrier2', () => 0);
    this.barrier2Enhance = _.get(heroValues, 'barrier2Enhance', '');
    this.barrierEnhance = _.get(heroValues, 'barrierEnhance', '');
    this.barrierSkills = _.get(heroValues, 'barrierSkills', []);
    this.baseAttack = _.get(heroValues, 'baseAttack', 0);
    this.baseDefense = _.get(heroValues, 'baseDefense', 0);
    this.baseHP = _.get(heroValues, 'baseHP', 0);
    this.class = _.get(heroValues, 'class', HeroClass.warrior);
    // this.dot = [...(heroValues.dot || []), ...(artifact?.getDoT() || [])];
    this.dot = _.get(heroValues, 'dot', []);
    this.element = _.get(heroValues, 'element', HeroElement.fire);
    this.innateAttackIncrease = _.get(heroValues, 'innateAttackIncrease', () => 0);
    this.exclusiveEquipmentMultiplier = _.get(heroValues, 'exclusiveEquipmentMultiplier', () => 0);
    this.skills = _.get(heroValues, 'skills', {});
  }

  getSkillEnhanceMult(skill: Skill, molagoras: Record<string, number>) {
    let mult = 1.0;

    let skillToUse = skill;

    if (!skill.enhance.length && skill.enhanceFrom) {
      skillToUse = _.get(this.skills, skill.enhanceFrom);
    }

    if (skillToUse.enhance) {
      const enhanceLevel =  _.get(molagoras, skillToUse.id.toUpperCase(), 0);
      for (let i = 0; i < enhanceLevel; i++) {
        mult += skillToUse.enhance[i];
      }
    }

    mult += skill.exclusiveEquipment();

    return mult;
  }

  getAttack(artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, skill: Skill | null = null): number {
    let atk = skill?.atk() || inputValues.attack;

    if (this.innateAttackIncrease !== undefined) {
      atk = atk / (1 + this.innateAttackIncrease());
    }

    let atkImprint = 0;
    let atkMod = 1;
    if (!skill?.noBuff) {
      atkImprint = this.baseAttack * (inputValues.attackImprint / 100);
      atkMod = 1
          + attackMultiplier
          + (this.attackIncrease !== undefined ? this.attackIncrease() - 1 : 0)
          + (this.innateAttackIncrease !== undefined ? this.innateAttackIncrease() : 0)
          + artifact.getAttackBoost(inputValues.artifactLevel);
    }

    return (atk + atkImprint) * atkMod;
  }

  getDefense(inputValues: DamageFormData): number {
    if (inputValues.casterDefense) {
      return inputValues.casterDefense * (1 + (inputValues.casterDefenseUp ? BattleConstants.defUp : 0)
           + (inputValues.casterVigor ? BattleConstants.vigor - 1 : 0)
           + (inputValues.casterFury ? BattleConstants['caster-fury'] - 1 : 0));
    } else {
      return 1000;
    }
  }

  // TODO: remove this?
  getHP(inputValues: DamageFormData): number {
    return inputValues.casterMaxHP || 10000;
  }

  getSpeed(inputValues: DamageFormData): number {
    if (inputValues.casterSpeed) {
      return Math.floor(inputValues.casterSpeed) * (1 + (inputValues.casterSpeedUp ? BattleConstants.spdUp - 1 : 0)
           + (inputValues.casterEnraged ? BattleConstants['casterRage'] - 1 : 0));
    } else {
      return 200;
    }
  }

  getAfterMathSkillDamage(skill: Skill, hitType: HitType, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, target: Target) {
    let skillDamage = 0;
    const skillMultipliers = skill.afterMath ? skill.afterMath(hitType) : null;
    if (skillMultipliers !== null) {
      if (skillMultipliers.atkPercent) {
        skillDamage = this.getAttack(artifact, inputValues, attackMultiplier) * skillMultipliers.atkPercent * BattleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), inputValues.artifactLevel, true);
      } else if (skillMultipliers.defPercent) {
        skillDamage = this.getDefense(inputValues) * skillMultipliers.defPercent * BattleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), inputValues.artifactLevel, true);
      } else if (skillMultipliers.injuryPercent) {
        skillDamage = inputValues.targetInjuries * skillMultipliers.injuryPercent * BattleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), inputValues.artifactLevel, true);
      }
    }

    return skillDamage;
  }

  // this belongs to hero because it calls getAtk and getDef
  getAfterMathArtifactDamage(skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, target: Target) {

    const artiMultipliers = artifact.getAfterMathMultipliers(skill);
    if (artiMultipliers !== null) {
      if (artiMultipliers.atkPercent) {
        return this.getAttack(artifact, inputValues, attackMultiplier) * artiMultipliers.atkPercent * BattleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => artiMultipliers.penetrate }), inputValues.artifactLevel, true);
      } else if (artiMultipliers.defPercent) {
        return this.getDefense(inputValues) * artiMultipliers.defPercent * BattleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => artiMultipliers.penetrate }), inputValues.artifactLevel, true);
      }
    }

    // TODO: should this return 0 instead?
    return null;
  }

  getBarrierStrength(molagoras: Record<string, number>) {
    return this.barrier ? (this.barrier(this) * (this.barrierEnhance ? this.getSkillEnhanceMult(_.get(this.skills, this.barrierEnhance, this.skills[0]), molagoras) : 1)) : 0;
  }

  getBarrier2Strength(molagoras: Record<string, number>) {
    //TODO: update this if needed
    // For now only Roana needs this and her barrier does not scale with enhances
    return this.barrier2 ? (this.barrier2(this) * (this.barrier2Enhance ? this.getSkillEnhanceMult(_.get(this.skills, this.barrier2Enhance, this.skills[0]), molagoras) : 1)) : 0;
  }
}