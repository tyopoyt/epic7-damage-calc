import * as _ from 'lodash-es'
import { DefensePreset, ReductionPreset } from './target-presets';

export class DamageFormData {
    attack: number;
    artifactLevel: number;
    attackImprint: number;
    attackPercentUp: number;
    bonusDamage: number;
    casterDefense: number;
    casterEnrage: boolean;
    casterPerception: boolean;
    critDamage: number;
    critDamageUp: boolean;
    damageReduction: number;
    damageTransfer: number
    defense: number;
    defensePercentUp: number;
    elementalAdvantage: boolean;
    molagoraS1: number;
    molagoraS2: number;
    molagoraS3: number;
    penSet: boolean;
    targetInjuries: number;
    targetTargeted: boolean;
    torrentSetStack: number;
    defensePreset?: DefensePreset;
    reductionPreset?: ReductionPreset;
    targetBleedDetonate: number;
    targetBurnDetonate: number;
    targetBombDetonate: number;
    beehooPassive: boolean;


    constructor(data: any) {
        this.artifactLevel = _.get(data, 'artifactLevel', 0);
        this.attack = _.get(data, 'attack', 2500);
        this.attackImprint = _.get(data, 'attackImprint', 0);
        this.attackPercentUp = _.get(data, 'attackPercentUp', 0);
        this.bonusDamage = _.get(data, 'bonusDamage', 0);
        this.casterDefense = _.get(data, 'casterDefense', 0);
        this.casterEnrage = _.get(data, 'casterEnrage', false);
        this.casterPerception = _.get(data, 'casterPerception', false);
        this.critDamage = _.get(data, 'critDamage', 250);
        this.critDamageUp = _.get(data, 'critDamage', false);
        this.damageReduction = _.get(data, 'damageReduction', 0);
        this.damageTransfer = _.get(data, 'damageTransfer', 0);
        this.defense = _.get(data, 'defense', 0);
        this.defensePercentUp = _.get(data, 'defensePercentUp', 0);
        this.elementalAdvantage = _.get(data, 'elementalAdvantage', false);
        this.molagoraS1 = _.get(data, 'molagoraS1', 0);
        this.molagoraS2 = _.get(data, 'molagoraS2', 0);
        this.molagoraS3 = _.get(data, 'molagoraS3', 0);
        this.penSet = _.get(data, 'penSet', false);
        this.targetInjuries = _.get(data, 'targetInjuries', 0);
        this.targetTargeted = _.get(data, 'targetTargeted', false);
        this.torrentSetStack = _.get(data, 'torrentSetStack', 0);
        this.defensePreset = _.get(data, 'defensePreset', null);
        this.reductionPreset = _.get(data, 'reductionPreset', null);
        this.targetBleedDetonate = _.get(data, 'targetBleedDetonate', 0);
        this.targetBurnDetonate = _.get(data, 'targetBurnDetonate', 0);
        this.targetBombDetonate = _.get(data, 'targetBombDetonate', 0);
        this.beehooPassive = _.get(data, 'beehooPassive', false);
    }
}