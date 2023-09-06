import * as _ from 'lodash-es'
import { LanguageService } from '../services/language.service';

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
    exclusiveEquipment: Function;
    extraDmg: Function;
    extraDmgTip: Function;
    fixed: Function;
    fixedTip: Function;
    flat: Function;
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

    constructor(data: any, private languageService: LanguageService) {
        this.id = _.get(data, 'id', 's1');
        this.afterMath = _.get(data, 'mult', () => {penetrate: 0 }); //TODO: define a type for this
        this.critDmgBoost = _.get(data, 'mult', () => 0);
        this.critDmgBoostTip = _.get(data, 'mult', () => {});
        this.detonation = _.get(data, 'mult', () => 0);
        this.elementalAdvantage = _.get(data, 'mult', () => false);
        this.exclusiveEquipment = _.get(data, 'mult', () => 0);
        this.extraDmg = _.get(data, 'mult', () => 0);
        this.extraDmgTip = _.get(data, 'mult', () => {});
        this.fixed = _.get(data, 'mult', () => 0);
        this.fixedTip = _.get(data, 'mult', () => {});
        this.flat = _.get(data, 'mult', (soulburn: boolean) => 0); //TODO: give these appropriate params
        this.flatTip = _.get(data, 'mult', () => {});
        this.ignoreDamageTransfer = _.get(data, 'ignoreDamageTransfer', () => false);
        this.isAOE = _.get(data, 'aoe', () => false);
        this.isSingle = _.get(data, 'single', () => false);
        this.mult = _.get(data, 'mult', () => 0);
        this.multTip = _.get(data, 'mult', () => {});
        this.penetration = _.get(data, 'penetrate', () => 0);
        this.penetrationTip = _.get(data, 'mult', () => {});
        this.pow = _.get(data, 'pow', () => 0);
        this.rate = _.get(data, 'rate', () => 0);
    }

    //TODO: get rid of this if unused
    getSkillType = () => {
        if (this.isSingle()) return SkillType.single;
        if (this.isAOE()) return SkillType.aoe;
        return undefined;
    };

    getModifiers(soulburn = false) {
        return {
          rate: this.rate(soulburn),
          pow: this.pow(soulburn),
          mult: this.mult(soulburn, this) - 1, // TODO: change anything checking for this to be null to check for -1
          multTip: this.multTip !== undefined ? this.languageService.getSkillModTip(this.multTip(soulburn)) : '',
          afterMathDmg: this.afterMath !== undefined ? this.getAfterMathSkillDamage(this.id, HitType.crit) : null,
          afterMathFormula: this.afterMath !== undefined ? this.afterMath(soulburn) : null,
          critBoost: this.critDmgBoost ? this.critDmgBoost(soulburn) : null,
          critBoostTip: this.critDmgBoostTip ? getSkillModTip(this.critDmgBoostTip(soulburn)) : '',
          detonation: this.detonation !== undefined ? this.detonation() - 1 : null,
          elemAdv: (typeof this.elementalAdvantage === 'function') ? this.elementalAdvantage() : null,
          exEq: this.exclusiveEquipment !== undefined ? this.exclusiveEquipment() : null,
          extraDmg: this.extraDmg !== undefined ? this.extraDmg() : null,
          extraDmgTip: this.extraDmgTip !== undefined ? getSkillModTip(this.extraDmgTip(soulburn)) : '',
          fixed: this.fixed !== undefined ? this.fixed(hitTypes.crit) : null,
          fixedTip: this.fixedTip !== undefined ? getSkillModTip(this.fixedTip()) : null,
          flat: this.flat ? this.flat(soulburn, this) : null,
          flatTip: this.flatTip !== undefined ? getSkillModTip(this.flatTip(soulburn)) : '',
          pen: this.penetration ? this.penetration() : null,
          penTip: this.penetrationTip !== undefined ? getSkillModTip(this.penetrationTip(soulburn)) : '',
        };
      }
}