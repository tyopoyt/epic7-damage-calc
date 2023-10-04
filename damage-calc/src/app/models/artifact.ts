import { DamageFormData } from "./forms";
import { HeroClass } from "./hero";
import { DoT, Skill } from "./skill";

import  * as _ from 'lodash-es'

export enum ArtifactDamageType {
    damage = 'damage',
    penetrate = 'penetrate',
    aftermath = 'aftermath',
    attack = 'attack',
    critDamageBoost = 'critDamageBoost',
    flat = 'flat',
    dot = 'dot'
}

export class Artifact {
    id: string;
    dot: DoT[];
    exclusive: HeroClass;
    heroExclusive: string[];
    type: ArtifactDamageType;
    applies: (skill: Skill, inputValues: DamageFormData) => boolean; // Pass Skill
    value: (artiScale: number, inputValues: DamageFormData, skill: Skill, isExtra: boolean) => number; // Pass Skill and DamageFormData (and optionally isExtra)
    scale: number[];
    additional: number[];
    maxHP: number;
    flat: (artiScale: number, inputValues: DamageFormData) => number;
    attackPercent: number;
    defensePercent: number;
    penetrate: number;


    constructor(data: any) {
        this.id = _.get(data, 'id', 'no_proc');
        this.dot = _.get(data, 'dot', null);
        this.exclusive = _.get(data, 'exclusive', HeroClass.common)
        this.heroExclusive = _.get(data, 'heroExclusive', [])
        this.type = _.get(data, 'type', null);
        this.scale = _.get(data, 'scale', null);
        this.additional = _.get(data, 'additional', null);
        this.maxHP = _.get(data, 'maxHP', 1);
        this.applies = _.get(data, 'applies', () => true);
        this.value = _.get(data, 'value', (artifactScale: number) => artifactScale);
        this.flat = _.get(data, 'flat', () => 0); //TODO: add appropriate inputs to these fxns
        this.attackPercent = _.get(data, 'attackPercent', 0);
        this.defensePercent = _.get(data, 'defensePercent', 0);
        this.penetrate = _.get(data, 'penetrate', 0.7);
    }

    getDefensePenetration(level: number, inputValues: DamageFormData, skill: Skill, isExtra = false): number {
      if (!(this.id && this.applies(skill, inputValues) && this.type === ArtifactDamageType.penetrate)) {
        return 0;
      }
      return this.value(this.getScale(level), inputValues, skill, isExtra);
    }

    getScale(level: number): number {
      return this.scale ? this.scale[Math.floor(level / 3)] : 0;
    }

    getDoT(): DoT[] {
      return (this.id && this.type === ArtifactDamageType.dot) ? this.dot : [];
    }

    getFlatMult(level: number, inputValues: DamageFormData, skill: Skill, isExtra = false) {
        if (this.type !== ArtifactDamageType.flat) {
            return 0;
        }

        return this.flat(this.value(this.getScale(level), inputValues, skill, isExtra), inputValues);
    }

    getDamageMultiplier(level: number, inputValues: DamageFormData, skill: Skill, isExtra = false) {
      if(!this.applies(skill, inputValues)) return 0;
      if (this.id === undefined || this.type !== ArtifactDamageType.damage) {
        return 0;
      }

      return this.value(this.getScale(level), inputValues, skill, isExtra);
    }

    getCritDmgBoost(level: number, inputValues: DamageFormData, skill: Skill, isExtra = false) {
      if (this.id === undefined || this.type !== ArtifactDamageType.critDamageBoost) {
        return 0;
      }

      return this.value(this.getScale(level), inputValues, skill, isExtra);
    }

    getAttackBoost(level: number, inputValues: DamageFormData, skill: Skill, isExtra = false) {
      if (this.id === undefined || this.type !== ArtifactDamageType.attack) {
        return 0;
      }

      return this.value(this.getScale(level), inputValues, skill, isExtra);
    }

    getAfterMathMultipliers(skill: Skill, inputValues: DamageFormData) {
        if(!this.applies(skill, inputValues)) return null;
        if (this.id === undefined || this.type !== ArtifactDamageType.aftermath || (this.attackPercent === undefined && this.defensePercent === undefined) || this.penetrate === undefined) {
          return null;
        }
        return {
          attackPercent: this.attackPercent,
          defensePercent: this.defensePercent,
          penetrate: this.penetrate
        };
      }
}