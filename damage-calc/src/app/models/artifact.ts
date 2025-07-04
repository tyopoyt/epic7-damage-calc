import { DamageFormData } from "./forms";
import { HeroClass } from "./hero";
import { DoT, HitType, Skill } from "./skill";

import  * as _ from 'lodash-es'

export enum ArtifactDamageType {
    damage = 'damage',
    penetrate = 'penetrate',
    aftermath = 'aftermath',
    attack = 'attack',
    critDamageBoost = 'critDamageBoost',
    fixedDamage = 'fixedDamage',
    flat = 'flat',
    dot = 'dot',
    health_only = 'health_only',
    defense = 'defense'
}

export class Artifact {
    id: string;
    dot: DoT[];
    exclusive: HeroClass;
    heroExclusive: string[];
    type: ArtifactDamageType;
    applies: (skill: Skill, inputValues: DamageFormData, soulburn: boolean) => boolean; // Pass Skill
    // TODO: Made the later inputs optional to avoid clutter, change if this causes any issues
    value: (artiScale: number, inputValues: DamageFormData, skill?: Skill, isExtra?: boolean, hitType?: HitType, soulburn?: boolean) => number; // Pass Skill and DamageFormData (and optionally isExtra)
    scale: number[];
    additional: number[];
    maxHP: number;
    flat: (artiScale: number, inputValues: DamageFormData) => number;
    attackPercent: number;
    defensePercent: number;
    hpPercent: number;
    defenseScaling: boolean;
    fixedDamage: number;
    hpScaling: boolean;
    speedScaling: boolean;
    penetrate: number;
    extraAttackBonus: boolean;
    artifactSpecific: string[];
    artifactSpecificMaximums: Record<string, number>;
    ignoreDamageTransfer: (inputValues: DamageFormData) => boolean;

    constructor(data: any) {
        this.id = _.get(data, 'id', 'noProc');
        this.dot = _.get(data, 'dot', null);
        this.exclusive = _.get(data, 'exclusive', HeroClass.common)
        this.heroExclusive = _.get(data, 'heroExclusive', [])
        this.type = _.get(data, 'type', null);
        this.scale = _.get(data, 'scale', null);
        this.additional = _.get(data, 'additional', null);
        this.maxHP = _.get(data, 'maxHP', 1);
        this.applies = _.get(data, 'applies', () => true);
        this.defenseScaling = _.get(data, 'defenseScaling', false);
        this.hpScaling = _.get(data, 'hpScaling', false);
        this.speedScaling = _.get(data, 'speedScaling', false);
        this.extraAttackBonus = _.get(data, 'extraAttackBonus', false);
        this.value = _.get(data, 'value', (artifactScale: number) => artifactScale);
        this.flat = _.get(data, 'flat', () => 0); //TODO: add appropriate inputs to these fxns
        this.attackPercent = _.get(data, 'attackPercent', 0);
        this.defensePercent = _.get(data, 'defensePercent', 0);
        this.hpPercent = _.get(data, 'hpPercent', 0);
        this.fixedDamage = _.get(data, 'fixedDamage', 0);
        this.penetrate = _.get(data, 'penetrate', 0.7);
        this.artifactSpecific = _.get(data, 'artifactSpecific', []);
        this.artifactSpecificMaximums = _.get(data, 'artifactSpecificMaximums', {});
        this.ignoreDamageTransfer = _.get(data, 'ignoreDamageTransfer', () => false);
    }

    getDefensePenetration(level: number, inputValues: DamageFormData, skill: Skill, soulburn: boolean, hitType: HitType, isExtra = false): number {
      if (!(this.id && this.type === ArtifactDamageType.penetrate && this.applies(skill, inputValues, soulburn))) {
        return 0;
      }
      return this.value(this.getScale(level), inputValues, skill, isExtra, hitType, soulburn);
    }

    getScale(level: number): number {
      return this.scale ? this.scale[Math.floor(level / 3)] : 0;
    }

    getDoT(): DoT[] {
      return (this.id && this.type === ArtifactDamageType.dot) ? this.dot : [];
    }

    getFlatMult(level: number, inputValues: DamageFormData, skill: Skill, soulburn: boolean, hitType: HitType, isExtra = false) {
        if (this.type !== ArtifactDamageType.flat) {
            return 0;
        }

        return this.flat(this.value(this.getScale(level), inputValues, skill, isExtra, hitType, soulburn), inputValues);
    }

    getDamageMultiplier(level: number, inputValues: DamageFormData, skill: Skill, soulburn: boolean, hitType: HitType, isExtra = false) {
      if(!this.applies(skill, inputValues, soulburn)) return 0;
      if (this.id === undefined || this.type !== ArtifactDamageType.damage) {
        return 0;
      }

      return this.value(this.getScale(level), inputValues, skill, isExtra, hitType, soulburn);
    }

    getCritDmgBoost(level: number, inputValues: DamageFormData, skill: Skill, soulburn: boolean, hitType: HitType, isExtra = false) {
      if (this.id === undefined || this.type !== ArtifactDamageType.critDamageBoost) {
        return 0;
      }

      return this.value(this.getScale(level), inputValues, skill, isExtra, hitType, soulburn);
    }

    getAttackBoost(level: number, inputValues: DamageFormData, skill: Skill, soulburn: boolean, hitType: HitType, isExtra = false) {
      if (this.id === undefined || this.type !== ArtifactDamageType.attack) {
        return 0;
      }

      return this.value(this.getScale(level), inputValues, skill, isExtra, hitType, soulburn);
    }

    getAfterMathMultipliers(skill: Skill, inputValues: DamageFormData, soulburn: boolean, isExtra: boolean, hitType: HitType) {
        if(!this.applies(skill, inputValues, soulburn)) return null;
        if (this.id === undefined || ![ArtifactDamageType.aftermath, ArtifactDamageType.fixedDamage].includes(this.type)  || (this.attackPercent === undefined && this.defensePercent === undefined && this.hpPercent === undefined) || this.penetrate === undefined) {
          return null;
        }

        return {
          attackPercent: this.attackPercent,
          defensePercent: this.defensePercent,
          hpPercent: this.hpPercent,
          fixedDamage: this.type === ArtifactDamageType.fixedDamage ? this.value(this.getScale(inputValues.artifactLevel), inputValues, skill, isExtra, hitType, soulburn) : 0,
          penetrate: this.penetrate
        };
      }
}