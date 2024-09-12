import * as _ from 'lodash-es'
import { DamageFormData } from './forms';
import { Artifact } from './artifact';

export enum DoT {
    bleed = 'bleed',
    burn = 'burn',
    bomb = 'bomb'
}

export enum HitType {
    crit = 'crit',
    crush = 'crush',
    normal = 'normal',
    miss = 'miss'
}

export class AftermathSkill {
    defensePercent?: number
    hpPercent?: number
    attackPercent?: number
    injuryPercent?: number
    targetMaxHPPercent?: number
    penetrate: number
    
    constructor(data: any) {
        this.defensePercent = data.defensePercent;
        this.hpPercent = data.hpPercent;
        this.attackPercent = data.attackPercent;
        this.injuryPercent = data.injuryPercent;
        this.targetMaxHPPercent = data.targetMaxHPPercent;
        this.penetrate = data.penetrate || 0.7;
    }
}

export class Skill {
    id: string;
    // TODO: refactor this name
    atk: (inputValues: DamageFormData) => number;
    afterMath: (hitType: HitType, inputValues: DamageFormData, soulburn: boolean) => AftermathSkill;
    canExtra: boolean;
    critDmgBoost: Function;
    critDmgBoostTip: Function;
    detonation: Function;
    elementalAdvantage: (inputValues: DamageFormData) => boolean;
    enhance: number[];
    enhanceFrom: string;
    exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => number;
    fixed: (hitType: HitType, inputValues: DamageFormData) => number;
    fixedTip: (fixedDamage: number, inputValues: DamageFormData) => Record<string, number>;
    flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => number;
    flat2: Function;
    flatTip: Function;
    ignoreDamageTransfer: (inputValuse: DamageFormData) => boolean;
    isAOE: (inputValues: DamageFormData) => boolean;
    isExtra: boolean;
    extraModifier: boolean;
    isSingle: (inputValues: DamageFormData) => boolean;
    mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact, heroAttack: number) => number;
    multTip: Function;
    name: string | null;
    penetrate: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact, casterAttack: number, casterSpeed: number) => number;
    penetrateTip: Function;
    pow: (soulburn: boolean, inputValues: DamageFormData) => number;
    rate: (soulburn: boolean, inputValues: DamageFormData, isExtra: boolean) => number;
    s1Benefits: boolean;
    noBuff: boolean; //TODO: possible remove this and just use atk (atkToUse)
    noTrans: (inputValues: DamageFormData) => boolean;
    noCrit: boolean;
    onlyCrit: (soulburn: boolean) => boolean;
    onlyMiss: boolean;
    noMiss: boolean;
    detonate: DoT[];
    hpScaling: boolean;
    defenseScaling: boolean;
    speedScaling: boolean;
    soulburn: boolean;

    // TODO: refactor atk to attackToUse
    constructor(data: any) {
        this.id = _.get(data, 'id', 's1');
        this.atk = _.get(data, 'atk', () => 0)
        this.afterMath = _.get(data, 'afterMath', () => null);
        this.canExtra = _.get(data, 'canExtra', false);
        this.extraModifier = _.get(data, 'extraModifier', false);
        this.critDmgBoost = _.get(data, 'critDmgBoost', () => 0);
        this.critDmgBoostTip = _.get(data, 'critDmgBoostTip', () => null);
        this.detonation = _.get(data, 'detonation', () => 0);
        this.elementalAdvantage = _.get(data, 'elementalAdvantage', (inputValues: DamageFormData) => inputValues.elementalAdvantage);
        this.enhance = _.get(data, 'enhance', []);
        this.enhanceFrom = _.get(data, 'enhanceFrom', '');
        this.exclusiveEquipmentMultiplier = _.get(data, 'exclusiveEquipmentMultiplier', () => 0);
        this.fixed = _.get(data, 'fixed', () => 0);
        this.fixedTip = _.get(data, 'fixedTip', () => null);
        this.flat = _.get(data, 'flat', () => 0); //TODO: give these appropriate params
        this.flat2 = _.get(data, 'flat2', () => 0); // TODO: remove this if unncessary (only sc alexa has it)
        this.flatTip = _.get(data, 'flatTip', () => null);
        this.ignoreDamageTransfer = _.get(data, 'ignoreDamageTransfer', () => false);
        this.isAOE = _.get(data, 'isAOE', () => false);
        this.isExtra = _.get(data, 'isExtra', false);
        this.isSingle = _.get(data, 'isSingle', () => false);
        this.mult = _.get(data, 'mult', () => 1);
        this.name = _.get(data, 'name', null);
        this.multTip = _.get(data, 'multTip', () => null);
        this.penetrate = _.get(data, 'penetrate', () => 0);
        this.penetrateTip = _.get(data, 'penetrateTip', () => null);
        this.pow = _.get(data, 'pow', () => 0);
        this.rate = _.get(data, 'rate', () => 0);
        this.noBuff = _.get(data, 'noBuff', false);
        this.noTrans = _.get(data, 'noTrans', () => false);
        this.s1Benefits = _.get(data, 's1Benefits', false);
        this.noCrit = _.get(data, 'noCrit', false);
        this.onlyCrit = _.get(data, 'onlyCrit', () => false);
        this.onlyMiss = _.get(data, 'onlyMiss', false);
        this.noMiss = _.get(data, 'noMiss', false);
        this.hpScaling = _.get(data, 'hpScaling', false);
        this.defenseScaling = _.get(data, 'defenseScaling', false);
        this.speedScaling = _.get(data, 'speedScaling', false);
        this.detonate = _.get(data, 'detonate', []);
        this.soulburn = _.get(data, 'soulburn', false);
    }
}

export const DoTSkill: Skill = new Skill({id: 'FixedPenetration', penetrate: () => 0.7});
