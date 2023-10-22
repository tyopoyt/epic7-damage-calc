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
    common = 'common',
    knight = 'knight',
    mage = 'mage',
    ranger = 'ranger',
    soul_weaver = 'soul_weaver',
    warrior = 'warrior',
    thief = 'thief'
}
//TODO: refactor atk to attack and crit to critDamage
export class Hero {
    attackIncrease: (inputValues: DamageFormData) => number;
    barrier?: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => number;
    barrier2?: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => number;
    barrier2Enhance?: string;
    barrierEnhance?: string;
    barrierSkills?: string[];
    baseAttack: number;
    baseDefense: number;
    baseHP: number;
    class: HeroClass;
    dot?: DoT[];
    element: HeroElement;
    heroSpecific: string[];
    heroSpecificMaximums: Record<string, number>;
    innateAttackIncrease?: (inputValues: DamageFormData) => number;
    skills: Record<string, Skill>;
    exclusiveEquipmentMultiplier?: (inputValues: DamageFormData) => number;
    innateAtkUp: any;

  constructor(
      heroValues: any,
    )
  {
    this.attackIncrease = _.get(heroValues, 'attackIncrease', () => 1);
    this.barrier = _.get(heroValues, 'barrier', null);
    this.barrier2 = _.get(heroValues, 'barrier2', null);
    this.barrier2Enhance = _.get(heroValues, 'barrier2Enhance', '');
    this.barrierEnhance = _.get(heroValues, 'barrierEnhance', '');
    this.barrierSkills = _.get(heroValues, 'barrierSkills', []);
    this.baseAttack = _.get(heroValues, 'baseAttack', 0);
    this.baseDefense = _.get(heroValues, 'baseDefense', 0);
    this.baseHP = _.get(heroValues, 'baseHP', 0);
    this.class = _.get(heroValues, 'class', HeroClass.warrior);
    this.dot = _.get(heroValues, 'dot', []);
    this.element = _.get(heroValues, 'element', HeroElement.fire);
    this.heroSpecific = _.get(heroValues, 'heroSpecific', []);
    this.heroSpecificMaximums = _.get(heroValues, 'heroSpecificMaximums', {});
    this.innateAttackIncrease = _.get(heroValues, 'innateAttackIncrease', () => 0);
    this.exclusiveEquipmentMultiplier = _.get(heroValues, 'exclusiveEquipmentMultiplier', () => 0);
    this.skills = _.get(heroValues, 'skills', {});
  }

  getDoT(artifact: Artifact) {
    return [...(this.dot || []), ...artifact.getDoT()];
  }

  getSkillEnhanceMult(skill: Skill, inputValues: DamageFormData) {
    let mult = 1.0;

    let skillToUse = skill;

    if (!skill.enhance.length && skill.enhanceFrom) {
      skillToUse = _.get(this.skills, skill.enhanceFrom);
    }

  if (skillToUse.enhance.length) {
      const enhanceLevel =  inputValues[`molagoras${skillToUse.id[1]}`] as number;
      for (let i = 0; i < enhanceLevel; i++) {
        mult += skillToUse.enhance[i];
      }
    }

    mult += skill.exclusiveEquipmentMultiplier(inputValues);
    return mult;
  }

  getAttack(artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, skill: Skill, isExtra = false): number {
    let atk = skill?.atk(inputValues) || inputValues.casterFinalAttack;

    // TODO: check if this is innateAttackIncrease val is added twice?
    if (this.innateAttackIncrease !== undefined) {
      atk = atk / (1 + this.innateAttackIncrease(inputValues));
    }

    let atkImprint = 0;
    let atkMod = 1;
    if (!skill?.noBuff) {
      atkImprint = this.baseAttack * (inputValues.attackImprint / 100);
      atkMod = 1
          + attackMultiplier
          + (this.attackIncrease !== undefined ? this.attackIncrease(inputValues) - 1 : 0)
          + (this.innateAttackIncrease !== undefined ? this.innateAttackIncrease(inputValues) : 0)
          + artifact.getAttackBoost(inputValues.artifactLevel, inputValues, skill, isExtra);
    }

    return (atk + atkImprint) * atkMod;
  }

  getAfterMathSkillDamage(skill: Skill, hitType: HitType, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, defenseMultiplier: number, target: Target, isExtra = false) {
    let skillDamage = 0;
    const skillMultipliers = skill.afterMath(hitType, inputValues);
    const attack = this.getAttack(artifact, inputValues, attackMultiplier, skill, isExtra)
    if (skillMultipliers !== null) {
      if (skillMultipliers.attackPercent) {
        skillDamage = this.getAttack(artifact, inputValues, attackMultiplier, skill, isExtra) * skillMultipliers.attackPercent * BattleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, true);
      } else if (skillMultipliers.defensePercent) {
        skillDamage = inputValues.casterFinalDefense() * skillMultipliers.defensePercent * BattleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, true);
      } else if (skillMultipliers.injuryPercent) {
        skillDamage = inputValues.targetInjuries * skillMultipliers.injuryPercent * BattleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, true);
      }
    }
    return skillDamage;
  }

  // this belongs to hero because it calls getAtk and getDef
  getAfterMathArtifactDamage(skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, defenseMultiplier: number, target: Target, isExtra = false) {
    const artiMultipliers = artifact.getAfterMathMultipliers(skill, inputValues);
    const attack = this.getAttack(artifact, inputValues, attackMultiplier, skill, isExtra)
    if (artiMultipliers !== null) {
      if (artiMultipliers.attackPercent) {
        return this.getAttack(artifact, inputValues, attackMultiplier, skill, isExtra) * artiMultipliers.attackPercent * BattleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => artiMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, true);
      } else if (artiMultipliers.defensePercent) {
        return inputValues.casterFinalDefense() * artiMultipliers.defensePercent * BattleConstants.dmgConst * target.defensivePower(new Skill({ penetrate: () => artiMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, true);
      }
    }

    return null;
  }
}