import { DataService } from "../services/data.service";
import { Artifact } from "./artifact";
import { Target } from "./target";
import { DamageFormData } from "./forms";

import * as _ from 'lodash-es'
import { DamageService } from "../services/damage.service";
import { DoT, Skill } from "./skill";
import { LanguageService } from "../services/language.service";

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
  getAtk(skill: Skill) {
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
          + this.artifact.getAttackBoost();
    }

    return (atk + atkImprint) * atkMod;
  }

  getDef() {
    if (this.def) {
      return this.def * (1 + (elements.caster_defense_up.value() ? battleConstants.defUp : 0)
           + (document.getElementById('vigor').checked ? battleConstants.vigor - 1 : 0)
           + (document.getElementById('caster-fury')?.checked ? battleConstants['caster-fury'] - 1 : 0));
    }
    return elements.caster_defense.value();
  }

  getHP() {
    return this.hp || elements.caster_max_hp.value();
  }

  getSpd() {
    if (this.spd) {
      return Math.floor(this.spd) * (1 + (elements.caster_speed_up.value() ? battleConstants.spdUp - 1 : 0)
           + (document.getElementById('caster-enrage')?.checked ? battleConstants['casterRage'] - 1 : 0));
    }
    return elements.caster_speed.value();
  }

  getAfterMathSkillDamage(skillId, hitType) {
    const skill = this.skills[skillId];

    let skillDamage = 0;
    const skillMultipliers = skill.afterMath ? skill.afterMath(hitType) : null;
    if (skillMultipliers !== null) {
      if (skillMultipliers.atkPercent) {
        skillDamage = this.getAtk(skillId) * skillMultipliers.atkPercent * dmgConst * this.target.defensivePower({ penetrate: () => skillMultipliers.penetrate }, true);
      } else if (skillMultipliers.defPercent) {
        skillDamage = elements.caster_defense.value() * skillMultipliers.defPercent * dmgConst * this.target.defensivePower({ penetrate: () => skillMultipliers.penetrate }, true);
      } else if (skillMultipliers.injuryPercent) {
        skillDamage = elements.target_injuries.value() * skillMultipliers.injuryPercent * dmgConst * this.target.defensivePower({ penetrate: () => skillMultipliers.penetrate }, true);
      }
    }

    return skillDamage;
  }

  getAfterMathArtifactDamage(skillId) {
    const skill = this.skills[skillId];

    const artiMultipliers = this.artifact.getAfterMathMultipliers(skill, skillId);
    if (artiMultipliers !== null) {
      if (artiMultipliers.atkPercent) {
        return this.getAtk() * artiMultipliers.atkPercent * dmgConst * this.target.defensivePower({ penetrate: () => artiMultipliers.penetrate }, true);
      } else if (artiMultipliers.defPercent) {
        return elements.caster_defense.value() * artiMultipliers.defPercent * dmgConst * this.target.defensivePower({ penetrate: () => artiMultipliers.penetrate }, true);
      }
    }

    return null;
  }

  getBarrierStrength() {
    return this.barrier(this) * (this.barrierEnhance ? this.getSkillEnhanceMult(this.barrierEnhance) : 1);
  }

  getBarrier2Strength() {
    // For now only Roana needs this and her barrier does not scale with enhances
    return this.barrier2(this); // *(this.barrier2Enhance ? this.getSkillEnhanceMult(this.barrier2Enhance) : 1);
  }
}