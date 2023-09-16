import * as _ from 'lodash-es'

export enum DoT {
    bleed = 'bleed',
    burn = 'burn',
    bomb = 'bomb'
}

export enum SkillType {
    single = 'single',
    aoe = 'aoe'
}

export enum HitType {
    crit = 'crit',
    crush = 'crush',
    normal = 'normal',
    miss = 'miss'
  };

export class Skill {
    id: string;
    afterMath: Function;
    critDmgBoost: Function;
    critDmgBoostTip: Function;
    detonation: Function;
    elementalAdvantage: Function;
    enhance: number[];
    enhanceFrom: string;
    exclusiveEquipment: Function;
    extraDmg: Function;
    extraDmgTip: Function;
    fixed: Function;
    fixedTip: Function;
    flat: Function;
    flat2: Function;
    flatTip: Function;
    ignoreDamageTransfer: Function;
    isAOE: Function;
    isSingle: Function;
    mult: Function;
    multTip: Function;
    penetration: Function;
    penetrationTip: Function;
    pow: Function;
    rate: Function;
    atk: Function;
    noBuff: boolean; //TODO: possible remove this and just use atk (atkToUse)
    noCrit: boolean;
    onlyCrit: boolean;
    onlyMiss: boolean;
    noMiss: boolean;
    detonate: DoT[];

    // TODO: refactor things like isAOE to be boolean not fxn
    // TODO: refactor atk to attackToUse
    constructor(data: any) {
        this.id = _.get(data, 'id', 's1');
        this.afterMath = _.get(data, 'afterMath', () => null); //TODO: define a type for this
        this.critDmgBoost = _.get(data, 'critDmgBoost', () => 0);
        this.critDmgBoostTip = _.get(data, 'critDmgBoostTip', () => null);
        this.detonation = _.get(data, 'detonation', () => 0);
        this.elementalAdvantage = _.get(data, 'elementalAdvantage', () => false);
        this.enhance = _.get(data, 'enhance', []);
        this.enhanceFrom = _.get(data, 'enhanceFrom', '');
        this.exclusiveEquipment = _.get(data, 'exclusiveEquipment', () => 0);
        this.extraDmg = _.get(data, 'extraDmg', () => 0);
        this.extraDmgTip = _.get(data, 'extraDmgTip', () => null);
        this.fixed = _.get(data, 'fixed', () => 0);
        this.fixedTip = _.get(data, 'fixedTip', () => null);
        this.flat = _.get(data, 'flat', (soulburn: boolean) => 0); //TODO: give these appropriate params
        this.flat2 = _.get(data, 'flat2', (soulburn: boolean) => 0); // TODO: remove this if unncessary (only sc alexa has it)
        this.flatTip = _.get(data, 'flatTip', () => null);
        this.ignoreDamageTransfer = _.get(data, 'ignoreDamageTransfer', () => false);
        this.isAOE = _.get(data, 'aoe', () => false);
        this.isSingle = _.get(data, 'single', () => false);
        this.mult = _.get(data, 'mult', () => 0);
        this.multTip = _.get(data, 'multTip', () => null);
        this.penetration = _.get(data, 'penetrate', () => 0);
        this.penetrationTip = _.get(data, 'penetrationTip', () => null);
        this.pow = _.get(data, 'pow', () => 0);
        this.rate = _.get(data, 'rate', () => 0);
        this.atk = _.get(data, 'atk', () => 0);
        this.noBuff = _.get(data, 'noBuff', false);
        this.noCrit = _.get(data, 'noCrit', false);
        this.onlyCrit = _.get(data, 'onlyCrit', false);
        this.onlyMiss = _.get(data, 'onlyMiss', false);
        this.noMiss = _.get(data, 'noMiss', false);
        this.detonate = _.get(data, 'detonate', null);
    }

    //TODO: get rid of this if unused
    getSkillType = () => {
        if (this.isSingle()) return SkillType.single;
        if (this.isAOE()) return SkillType.aoe;
        return undefined;
    };
}