import * as _ from 'lodash-es'
import { DefensePreset, ReductionPreset } from './target-presets';

export class DamageFormData {
    artifactLevel: number;
    attack: number;
    attackImprint: number;
    attackPercentUp: number;
    beehooPassive: boolean;
    bonusDamage: number;
    casterDefense: number;
    casterDefenseUp: boolean;
    casterEnrage: boolean;
    casterFury: boolean;
    casterHP: number;
    casterPerception: boolean;
    casterSpeed: number;
    casterSpeedUp: boolean;
    casterVigor: boolean;
    critDamage: number;
    critDamageUp: boolean;
    damageReduction: number;
    damageTransfer: number
    defensePercentUp: number;
    defensePreset?: DefensePreset;
    elementalAdvantage: boolean;
    molagoraS1: number;
    molagoraS2: number;
    molagoraS3: number;
    penSet: boolean;
    reductionPreset?: ReductionPreset;
    targetBleedDetonate: number;
    targetBombDetonate: number;
    targetBurnDetonate: number;
    targetDefense: number;
    targetInjuries: number;
    targetTargeted: boolean;
    torrentSetStack: number;

    constructor(data: any) {
        this.artifactLevel = _.get(data, 'artifactLevel', 0);
        this.attack = _.get(data, 'attack', 2500);
        this.attackImprint = _.get(data, 'attackImprint', 0);
        this.attackPercentUp = _.get(data, 'attackPercentUp', 0);
        this.beehooPassive = _.get(data, 'beehooPassive', false);
        this.bonusDamage = _.get(data, 'bonusDamage', 0);
        this.casterDefense = _.get(data, 'casterDefense', 1000);
        this.casterDefenseUp = _.get(data, 'casterDefenseUp', false);
        this.casterEnrage = _.get(data, 'casterEnrage', false);
        this.casterFury = _.get(data, 'casterFury', false);
        this.casterHP = _.get(data, 'casterHP', 10000);
        this.casterPerception = _.get(data, 'casterPerception', false);
        this.casterSpeed = _.get(data, 'casterSpeed', 200);
        this.casterSpeedUp = _.get(data, 'casterSpeedUp', false);
        this.casterVigor = _.get(data, 'casterVigor', false);
        this.critDamage = _.get(data, 'critDamage', 250);
        this.critDamageUp = _.get(data, 'critDamage', false);
        this.damageReduction = _.get(data, 'damageReduction', 0);
        this.damageTransfer = _.get(data, 'damageTransfer', 0);
        this.defensePercentUp = _.get(data, 'defensePercentUp', 0);
        this.defensePreset = _.get(data, 'defensePreset', null);
        this.elementalAdvantage = _.get(data, 'elementalAdvantage', false);
        this.molagoraS1 = _.get(data, 'molagoraS1', 0);
        this.molagoraS2 = _.get(data, 'molagoraS2', 0);
        this.molagoraS3 = _.get(data, 'molagoraS3', 0);
        this.penSet = _.get(data, 'penSet', false);
        this.reductionPreset = _.get(data, 'reductionPreset', null);
        this.targetBleedDetonate = _.get(data, 'targetBleedDetonate', 0);
        this.targetBombDetonate = _.get(data, 'targetBombDetonate', 0);
        this.targetBurnDetonate = _.get(data, 'targetBurnDetonate', 0);
        this.targetDefense = _.get(data, 'defense', 0);
        this.targetInjuries = _.get(data, 'targetInjuries', 0);
        this.targetTargeted = _.get(data, 'targetTargeted', false);
        this.torrentSetStack = _.get(data, 'torrentSetStack', 0);
    }
}