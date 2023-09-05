import { DataService } from "../services/data.service";
import { Artifact } from "./artifact";
import { Target } from "./target";
import { DamageFormData } from "./forms";

import * as _ from 'lodash'
import { DamageService } from "../services/damage.service";
import { DoT, Skill } from "./skill";

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
    
  constructor(id: string, artifact: Artifact, inputValues: DamageFormData, private dataService: DataService, private damageService: DamageService) {
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

  getDamage(skillId, soulburn = false, isExtra = false) {
    const critDmgBuff = inputValues.critDmgUp ? battleConstants.critDmgUp : 0.0;

    const skill = this.skills[skillId];
    const hit = this.offensivePower(skillId, soulburn, isExtra, this) * this.target.defensivePower(skill);
    const critDmg = Math.min((this.crit / 100) + critDmgBuff, 3.5)
        + (skill.critDmgBoost ? skill.critDmgBoost(soulburn) : 0)
        + (this.artifact.getCritDmgBoost() || 0)
        + (elements.caster_perception.value() ? 0.15 : 0);
    return {
      crit: skill.noCrit || skill.onlyMiss ? null : Math.round(hit * critDmg + (skill.fixed !== undefined ? skill.fixed(hitTypes.crit) : 0) + this.getAfterMathDamage(skillId, hitTypes.crit)),
      crush: skill.noCrit || skill.onlyCrit || skill.onlyMiss ? null : Math.round(hit * 1.3 + (skill.fixed !== undefined ? skill.fixed(hitTypes.crush) : 0) + this.getAfterMathDamage(skillId, hitTypes.crush)),
      normal: skill.onlyCrit || skill.onlyMiss ? null : Math.round(hit + (skill.fixed !== undefined ? skill.fixed(hitTypes.normal) : 0) + this.getAfterMathDamage(skillId, hitTypes.normal)),
      miss: skill.noMiss ? null : Math.round(hit * 0.75 + (skill.fixed !== undefined ? skill.fixed(hitTypes.miss) : 0) + this.getAfterMathDamage(skillId, hitTypes.miss))
    };
  }

  getAtk(skill: Skill) {
    let atk = (skill !== undefined && skill.atk !== undefined) ? skill.atk() : this.atk;

    if (this.innateAtkUp !== undefined) {
      atk = atk / (1 + this.innateAtkUp());
    }

    let atkImprint = 0;
    let atkMod = 1;
    if (skill === undefined || skill.noBuff !== true) {
      atkImprint = this.baseAtk * (inputValues.atkPcImprint / 100);
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

  offensivePower(skillId, soulburn, isExtra, hero) {
    const skill = this.skills[skillId];

    const rate = (typeof skill.rate === 'function') ? skill.rate(soulburn) : skill.rate;
    const flatMod = skill.flat ? skill.flat(soulburn, hero) : 0;
    const flatMod2 = this.artifact.getFlatMult() + (skill.flat2 !== undefined ? skill.flat2() : 0);

    const pow = (typeof skill.pow === 'function') ? skill.pow(soulburn) : skill.pow;
    const skillEnhance = this.getSkillEnhanceMult(skillId);
    let elemAdv = 1.0;
    if (inputValues.elemAdv || (typeof skill.elementalAdvantage === 'function') && skill.elementalAdvantage() === true) {
      elemAdv = battleConstants.elemAdv;
    }
    const target = inputValues.target ? battleConstants.target : 1.0;

    let dmgMod = 1.0
        + getGlobalDamageMult(this, skill)
        + this.bonus / 100
        + this.artifact.getDamageMultiplier(skill, skillId, isExtra)
        + (skill.mult ? skill.mult(soulburn, this) - 1 : 0);

    return ((this.getAtk(skillId) * rate + flatMod) * dmgConst + flatMod2) * pow * skillEnhance * elemAdv * target * dmgMod;
  }

  getSkillEnhanceMult(skillId) {
    const skill = this.skills[skillId];
    let mult = 1.0;

    let enhancementSkillId = skillId;
    let enhancement = skill.enhance;

    if (!enhancement && skill.enhance_from) {
      enhancementSkillId = skill.enhance_from;
      enhancement = this.skills[skill.enhance_from].enhance;
    }

    if (enhancement) {
      const enhanceLevel = Number(document.getElementById(`molagora-${enhancementSkillId}`).value);
      for (let i = 0; i < enhanceLevel; i++) {
        mult += enhancement[i];
      }
    }

    if (skill.exclusiveEquipment !== undefined) {
      mult += skill.exclusiveEquipment();
    }

    return mult;
  }

  getAfterMathDamage(skillId, hitType) {
    const skill = this.skills[skillId];
    const detonation = this.getDetonateDamage(skillId);

    let artiDamage = this.getAfterMathArtifactDamage(skillId);
    if (artiDamage === null) {
      artiDamage = 0;
    }


    const skillDamage = this.getAfterMathSkillDamage(skillId, hitType);
    const skillExtraDmg = skill.extraDmg !== undefined ? Math.round(skill.extraDmg(hitType)) : 0;

    return detonation + artiDamage + skillDamage + skillExtraDmg;
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

  getDetonateDamage(skillId) {
    const skill = this.skills[skillId];

    const dotTypes = Array.isArray(skill.detonate) ? skill.detonate : [skill.detonate];
    let damage = 0;

    if (dotTypes.includes(dot.bleed)) damage += elements.target_bleed_detonate.value() * skill.detonation() * this.getDotDamage(dot.bleed);
    if (dotTypes.includes(dot.burn)) damage += elements.target_burn_detonate.value() * skill.detonation() * this.getDotDamage(dot.burn);
    if (dotTypes.includes(dot.bomb)) damage += elements.target_bomb_detonate.value() * skill.detonation() * this.getDotDamage(dot.bomb);

    return damage;
  }

  getDotDamage(type) {
    switch (type) {
    case dot.bleed:
      return this.getAtk() * 0.3 * dmgConst * this.target.defensivePower({ penetrate: () => 0.7 }, true);
    case dot.burn:
      return this.getAtk() * 0.6 * dmgConst * (elements.beehoo_passive.value() ? heroConstants.beehooBurnMult : 1) * this.target.defensivePower({ penetrate: () => 0.7 }, true);
    case dot.bomb:
      return this.getAtk() * 1.5 * dmgConst * this.target.defensivePower({ penetrate: () => 0.7 }, true);
    default: return 0;
    }
  }

  getBarrierStrength() {
    return this.barrier(this) * (this.barrierEnhance ? this.getSkillEnhanceMult(this.barrierEnhance) : 1);
  }

  getBarrier2Strength() {
    // For now only Roana needs this and her barrier does not scale with enhances
    return this.barrier2(this); // *(this.barrier2Enhance ? this.getSkillEnhanceMult(this.barrier2Enhance) : 1);
  }
}