import * as _ from 'lodash-es'

export const AttackPresets: Record<string, AttackPreset> = {
    //TODO: add translations for these into i18n files
    manual: {
        id: 'manual',
    },
    starter_gear: {
        id: 'starter_gear',
        attack: 2500,
        critDamage: 175
    },
    all_in_attack: {
        id: 'all_in_attack',
        attack: 6500,
        critDamage: 150
    },
    all_in_crit_damage: {
        id: 'all_in_crit_damage',
        attack: 2500,
        critDamage: 350
    },
    elite_balanced: {
        id: 'elite_balanced',
        attack: 5000,
        critDamage: 300
    },
}

export class AttackPreset {
    id: string;
    attack?: number;
    critDamage?: number;

    constructor(data: any) {
        this.id = _.get(data, 'id', '');
        this.attack = _.get(data, 'attack', null);
        this.critDamage = _.get(data, 'critDamage', null);
    }
}