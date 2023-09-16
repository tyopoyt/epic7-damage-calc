import { DataService } from "../services/data.service";
import { Artifact } from "./artifact";
import { Target } from "./target";
import { DamageFormData } from "./forms";

import * as _ from 'lodash-es'
import { DamageService } from "../services/damage.service";
import { DoT, HitType, Skill } from "./skill";
import { LanguageService } from "../services/language.service";
import { BattleConstants } from "../../assets/data/constants"

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
    warrior = 'warrior'
}
//TODO: refactor atk to attack and crit to critDamage
export class Hero {
    id: string;
    element: HeroElement;
    class: HeroClass;
    atk: number;
    crit: number;
    bonus: number;
    skills: Record<string, Skill>;
    baseAtk: number;
    baseDef: number;
    baseHP: number;
    target: Target;
    artifact?: Artifact;
    dot?: DoT[];
    atkUp?: Function;
    innateAtkUp?: Function;
    barrierSkills?: string[];
    barrier?: Function;
    barrier2?: Function;
    barrierEnhance?: string;
    barrier2Enhance?: string;
    defense?: number;
    hp?: number;
    defenseUp: boolean;
    speedUp: boolean;
    vigor: boolean;
    fury: boolean;
    speed?: number;
    enraged?: boolean;

  //TODO make this class not require any services
  constructor(
      id: string,
      artifact: Artifact,
      inputValues: DamageFormData,
      private dataService: DataService,
      private damageService: DamageService,
      private languageService: LanguageService
    )
  {
    this.id = id;
    this.atk = inputValues.attack;
    this.crit = inputValues.critDamage;
    this.bonus = inputValues.bonusDamage;
    this.defense = inputValues.casterDefense;
    this.speed = inputValues.casterSpeed;
    this.defenseUp = inputValues.casterDefenseUp;
    this.speedUp = inputValues.casterSpeedUp;
    this.vigor = inputValues.casterVigor;
    this.fury = inputValues.casterFury;
    this.enraged = inputValues.casterEnrage;
    this.hp = inputValues.casterHP;
    this.skills = this.dataService.heroes[id].skills;
    this.baseAtk = this.dataService.heroes[id].baseAtk || 0;
    this.baseDef = this.dataService.heroes[id].baseDef || 0;
    this.baseHP = this.dataService.heroes[id].baseHP || 0;
    this.dot = [...(this.dataService.heroes[id].dot || []), ...(artifact?.getDoT() || [])];
    this.atkUp = this.dataService.heroes[id].atkUp;
    this.innateAtkUp = this.dataService.heroes[id].innateAtkUp;
    this.element = this.dataService.heroes[id].element;
    this.barrierSkills = this.dataService.heroes[id].barrierSkills;
    this.barrier = this.dataService.heroes[id].barrier;
    this.barrier2 = this.dataService.heroes[id].barrier2;
    this.barrierEnhance = this.dataService.heroes[id].barrierEnhance;
    this.barrier2Enhance = this.dataService.heroes[id].barrier2Enhance;
    this.class = this.dataService.heroes[id].class
    this.artifact = artifact;
    this.target = new Target(artifact, this.dataService, this.damageService);
  }

  getSkillEnhanceMult(skill: Skill) {
    let mult = 1.0;

    let skillToUse = skill;

    if (!skill.enhance.length && skill.enhanceFrom) {
      skillToUse = _.get(this.skills, skill.enhanceFrom);
    }

    if (skillToUse.enhance) {
      const enhanceLevel =  Number(_.get(this.dataService.damageInputValues, `molagora${skillToUse.id.toUpperCase()}`, '0'));
      for (let i = 0; i < enhanceLevel; i++) {
        mult += skillToUse.enhance[i];
      }
    }

    mult += skill.exclusiveEquipment();

    return mult;
  }

  //TODO: check if skill will ever come in here undefined/null
  getAtk(skill: Skill, artifact: Artifact): number {
    let atk = skill.atk() || this.atk;

    if (this.innateAtkUp !== undefined) {
      atk = atk / (1 + this.innateAtkUp());
    }

    let atkImprint = 0;
    let atkMod = 1;
    if (!skill.noBuff) {
      atkImprint = this.baseAtk * (this.dataService.damageInputValues.attackImprint / 100);
      atkMod = 1
          + this.damageService.getGlobalAtkMult()
          + (this.atkUp !== undefined ? this.atkUp() - 1 : 0)
          + (this.innateAtkUp !== undefined ? this.innateAtkUp() : 0)
          + artifact.getAttackBoost();
    }

    return (atk + atkImprint) * atkMod;
  }

  getDef(): number {
    if (this.defense) {
      return this.defense * (1 + (this.defenseUp ? BattleConstants.defUp : 0)
           + (this.vigor ? BattleConstants.vigor - 1 : 0)
           + (this.fury ? BattleConstants['caster-fury'] - 1 : 0));
    }
    return this.defense || 1000;
  }

  // TODO: remove this?
  getHP(): number {
    return this.hp || 10000;
  }

  getSpd(): number {
    if (this.speed) {
      return Math.floor(this.speed) * (1 + (this.speedUp ? BattleConstants.spdUp - 1 : 0)
           + (this.enraged ? BattleConstants['casterRage'] - 1 : 0));
    }
    return this.speed || 200;
  }

  getAfterMathSkillDamage(skill: Skill, hitType: HitType, artifact: Artifact, targetInjuries: number = 0) {
    let skillDamage = 0;
    const skillMultipliers = skill.afterMath ? skill.afterMath(hitType) : null;
    if (skillMultipliers !== null) {
      if (skillMultipliers.atkPercent) {
        skillDamage = this.getAtk(skill, artifact) * skillMultipliers.atkPercent * BattleConstants.dmgConst * this.target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), true);
      } else if (skillMultipliers.defPercent) {
        skillDamage = this.getDef() * skillMultipliers.defPercent * BattleConstants.dmgConst * this.target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), true);
      } else if (skillMultipliers.injuryPercent) {
        skillDamage = targetInjuries * skillMultipliers.injuryPercent * BattleConstants.dmgConst * this.target.defensivePower(new Skill({ penetrate: () => skillMultipliers.penetrate }), true);
      }
    }

    return skillDamage;
  }

  getAfterMathArtifactDamage(skill: Skill, artifact: Artifact) {

    const artiMultipliers = artifact.getAfterMathMultipliers(skill);
    if (artiMultipliers !== null) {
      if (artiMultipliers.atkPercent) {
        return this.getAtk(skill, artifact) * artiMultipliers.atkPercent * BattleConstants.dmgConst * this.target.defensivePower(new Skill({ penetrate: () => artiMultipliers.penetrate }), true);
      } else if (artiMultipliers.defPercent) {
        return this.getDef() * artiMultipliers.defPercent * BattleConstants.dmgConst * this.target.defensivePower(new Skill({ penetrate: () => artiMultipliers.penetrate }), true);
      }
    }

    return null;
  }

  getBarrierStrength() {
    return this.barrier ? (this.barrier(this) * (this.barrierEnhance ? this.getSkillEnhanceMult(_.get(this.skills, this.barrierEnhance, this.skills[0])) : 1)) : 0;
  }

  getBarrier2Strength() {
    //TODO: update this if needed
    // For now only Roana needs this and her barrier does not scale with enhances
    return this.barrier2 ? (this.barrier2(this) * (this.barrier2Enhance ? this.getSkillEnhanceMult(_.get(this.skills, this.barrier2Enhance, this.skills[0])) : 1)) : 0;
  }
}