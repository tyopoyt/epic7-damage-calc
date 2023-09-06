import * as _ from 'lodash-es'

export class DamageFormData {
    attack: number;
    bonusDamage: number;
    casterDefense: number;
    critDamage: number;
    damageReduction: number;
    damageTransfer: number
    defense: number;
    defensePercentUp: number;
    penSet: boolean;
    targetInjuries: number;
    artifactLevel: number;

    constructor(data: any) {
        this.attack = _.get(data, 'attack', 2500);
        this.bonusDamage = _.get(data, 'bonusDamage', 0);
        this.casterDefense = _.get(data, 'casterDefense', 0);
        this.critDamage = _.get(data, 'critDamage', 250);
        this.damageReduction = _.get(data, 'damageReduction', 0);
        this.damageTransfer = _.get(data, 'damageTransfer', 0);
        this.defense = _.get(data, 'defense', 0);
        this.defensePercentUp = _.get(data, 'defensePercentUp', 0);
        this.penSet = _.get(data, 'penSet', false);
        this.targetInjuries = _.get(data, 'targetInjuries', 0);
        this.artifactLevel = _.get(data, 'artifactLevel', 0);
    }

}