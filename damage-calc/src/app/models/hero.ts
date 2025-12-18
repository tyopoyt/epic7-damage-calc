import { Artifact } from "./artifact";
import { Target } from "./target";
import { DamageFormData } from "./forms";
import { AftermathSkill, DoT, HitType, Skill } from "./skill";
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
    resistanceIncrease: (artifact: Artifact, inputValues: DamageFormData) => number;
    flatAttackIncrease: (inputValues: DamageFormData, artifact: Artifact) => number;
    defenseIncrease: (inputValues: DamageFormData) => number;
    speedIncrease: (inputValues: DamageFormData) => number;
    barrier?: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, soulburn: boolean) => number;
    barrier2?: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, soulburn: boolean) => number;
    barrier2Enhance?: string;
    barrierEnhance?: string;
    barrierSkills?: string[];
    baseAttack: number;
    baseDefense: number;
    baseHP: number;
    class: HeroClass;
    dot?: DoT[];
    element: HeroElement;
    gameID: string;
    heroSpecific: string[];
    heroSpecificMaximums: Record<string, number>;
    innateAttackIncrease: (inputValues: DamageFormData) => number;
    innateHPIncrease?: (inputValues: DamageFormData) => number;
    skills: Record<string, Skill>;
    exclusiveEquipmentMultiplier?: (inputValues: DamageFormData) => number;
    innateAtkUp: any;

  constructor(
      heroValues: any,
    )
  {
    this.attackIncrease = _.get(heroValues, 'attackIncrease', () => 1);
    this.resistanceIncrease = _.get(heroValues, 'resistanceIncrease', () => 0);
    this.flatAttackIncrease = _.get(heroValues, 'flatAttackIncrease', () => 0);
    this.defenseIncrease = _.get(heroValues, 'defenseIncrease', () => 0);
    this.speedIncrease = _.get(heroValues, 'speedIncrease', () => 1);
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
    this.gameID = _.get(heroValues, 'gameID', '0000');
    this.heroSpecific = _.get(heroValues, 'heroSpecific', []);
    this.heroSpecificMaximums = _.get(heroValues, 'heroSpecificMaximums', {});
    this.innateAttackIncrease = _.get(heroValues, 'innateAttackIncrease', () => 0);
    this.innateHPIncrease = _.get(heroValues, 'innateHPIncrease', () => 0);
    this.exclusiveEquipmentMultiplier = _.get(heroValues, 'exclusiveEquipmentMultiplier', () => 0);
    this.skills = _.get(heroValues, 'skills', {});
  }

  getDoT(artifact: Artifact) {
    return [...(this.dot || []), ...artifact.getDoT()];
  }

  // Get damage multiplier from skill enhancements
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

  // Get the hero's attack if it's modified
  getAttack(artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, skill: Skill, soulburn: boolean, hitType: HitType, isExtra = false): number {
    // skill.atk is for lilias
    let atk = skill?.atk(inputValues) || inputValues.casterFinalAttack;

    // TODO: check if this is innateAttackIncrease val is added twice? doesn't seem to be though
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
          + artifact.getAttackBoost(inputValues.artifactLevel, inputValues, skill, soulburn, hitType, isExtra);
    }

    return ((atk + atkImprint) * atkMod) + this.flatAttackIncrease(inputValues, artifact);
  }

  // Get the hero's speed if it's modified
  getSpeed(inputValues: DamageFormData): number {
    return inputValues.casterFinalSpeed(this.speedIncrease(inputValues) - 1);
  }

  // Get the hero's aftermath (additional) damage
  getAfterMathSkillDamage(skill: Skill, hitType: HitType, soulburn: boolean, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, defenseMultiplier: number, target: Target, isExtra = false, isCounter = false) {
    let skillDamage = 0;
    let skillMultipliers = skill.afterMath(hitType, inputValues, soulburn);
    const attack = this.getAttack(artifact, inputValues, attackMultiplier, skill, soulburn, hitType, isExtra)
    const speed = this.getSpeed(inputValues)
    // TODO: can aftermath skills just use the same skill as DoTSkill now?
    if (skillMultipliers !== null) {
      if (skillMultipliers.attackPercent) {
        skillDamage = this.getAttack(artifact, inputValues, attackMultiplier, skill, soulburn, hitType, isExtra) * skillMultipliers.attackPercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
      } else if (skillMultipliers.defensePercent) {
        skillDamage = inputValues.casterFinalDefense(artifact) * skillMultipliers.defensePercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
      } else if (skillMultipliers.hpPercent) {
        skillDamage = inputValues.casterFinalMaxHP(artifact) * skillMultipliers.hpPercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
      } else if (skillMultipliers.injuryPercent) {
        skillDamage = inputValues.targetInjuries * skillMultipliers.injuryPercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
      } else if (skillMultipliers.targetMaxHPPercent) {
        // TODO: should this also be affected by target's defensive power?
        skillDamage = inputValues.targetFinalMaxHP() * skillMultipliers.targetMaxHPPercent;
      } else if (skillMultipliers.allyHPPercent) {
        skillDamage = inputValues.allyMaxHP * skillMultipliers.allyHPPercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
      }
    }

    // this is ugly I know but it's the easiest way to accomodate young senya's dual-scaling aftermath damage
    if (skill.afterMath2(hitType, inputValues, soulburn)) {
      skillMultipliers = skill.afterMath2(hitType, inputValues, soulburn);

      if (skillMultipliers !== null) {
        if (skillMultipliers.attackPercent) {
          skillDamage += this.getAttack(artifact, inputValues, attackMultiplier, skill, soulburn, hitType, isExtra) * skillMultipliers.attackPercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
        } else if (skillMultipliers.defensePercent) {
          skillDamage += inputValues.casterFinalDefense(artifact) * skillMultipliers.defensePercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
        } else if (skillMultipliers.hpPercent) {
          skillDamage += inputValues.casterFinalMaxHP(artifact) * skillMultipliers.hpPercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
        } else if (skillMultipliers.injuryPercent) {
          skillDamage += inputValues.targetInjuries * skillMultipliers.injuryPercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
        } else if (skillMultipliers.targetMaxHPPercent) {
          // rupture and challenge
          skillDamage += inputValues.targetFinalMaxHP() * skillMultipliers.targetMaxHPPercent;
        } else if (skillMultipliers.allyHPPercent) {
          skillDamage += inputValues.allyMaxHP * skillMultipliers.allyHPPercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => skillMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
        }
      }
    }

    const additionalDamageReduction = 1 - (inputValues.additionalDamageReduction / 100)
    return skillDamage * additionalDamageReduction;
  }

  // Get aftermath damage from the artifact. This belongs to hero because it calls hero's getAtk and getDef
  getAfterMathArtifactDamage(skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number, defenseMultiplier: number, target: Target, soulburn: boolean, hitType: HitType, isExtra = false) {

    const artiMultipliers = artifact.getAfterMathMultipliers(skill, inputValues, soulburn, isExtra || skill.id.endsWith('extra'), hitType);
    const attack = this.getAttack(artifact, inputValues, attackMultiplier, skill, soulburn, hitType, isExtra || skill.id.endsWith('extra'))
    const speed = this.getSpeed(inputValues)
    const additionalDamageReduction = 1 - (inputValues.additionalDamageReduction / 100)
    // TODO: can aftermath skills just use the same skill as DoTSkill now?
    if (artiMultipliers !== null) {
      if (artiMultipliers.attackPercent) {
        return additionalDamageReduction * this.getAttack(artifact, inputValues, attackMultiplier, skill, soulburn, hitType, isExtra) * artiMultipliers.attackPercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => artiMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
      } else if (artiMultipliers.defensePercent) {
        return additionalDamageReduction * inputValues.casterFinalDefense(artifact, this.defenseIncrease(inputValues)) * artiMultipliers.defensePercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => artiMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
      } else if (artiMultipliers.hpPercent) {
        return additionalDamageReduction * inputValues.casterFinalMaxHP(artifact) * artiMultipliers.hpPercent * BattleConstants.damageConstant * target.defensivePower(new Skill({ id: 'FixedPenetration', penetrate: () => artiMultipliers.penetrate }), inputValues, defenseMultiplier, artifact, false, attack, speed, hitType, true);
      } else if (artiMultipliers.fixedDamage) {
        return additionalDamageReduction * artiMultipliers.fixedDamage
      }
    }

    return null;
  }
}