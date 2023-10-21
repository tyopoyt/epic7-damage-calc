import * as _ from 'lodash-es'
import { HeroElement } from './hero';

//TODO: double check all these preset values
// TODO: remove name and description if unused
export const TargetPresetGroups: Record<string, DefensePreset[]> = {
    default: [
        {
            id: 'manual',
            name: 'Manual',
            defense: null
        },
    ],
    wyvern13: [ //TODO: add translations for these into i18n files
        {
            id: 'blaze-dragona-13',
            name: 'Blaze Dragona',
            description: '20241 hp/175 spd',
            defense: 1392,
            hp: 20241,
            speed: 175
        },
        {
            id: 'blood-ridge-naga-13',
            name: 'Blood Ridge Naga',
            description: '13554 hp/154 spd',
            defense: 1340,
            hp: 13554,
            speed: 154
        },
        {
            id: 'wyvern-13',
            name: 'Wyvern',
            description: '233578 hp/242 spd',
            defense: 1940,
            hp: 233578,
            extraDamageElement: HeroElement.ice,
            extraDamageMultiplier: 1.3,
            speed: 242
        },
    ],
    golem13: [
        {
            id: 'raqix-flying-troop-13',
            name: 'Raqix Flying Troop',
            description: '14743 hp/188 spd',
            defense: 1007,
            hp: 14743,
            speed: 188
        },
        {
            id: 'mossy-testudo-13',
            name: 'Mossy Testudo',
            description: '17172 hp',
            defense: 1221,
            hp: 17172
        },
        {
            id: 'golem-13',
            name: 'Golem',
            description: '158553 hp',
            defense: 1550,
            hp: 158553,
            extraDamageElement: HeroElement.fire,
            extraDamageMultiplier: 1.3
        },
    ],
    banshee13: [
        {
            id: 'mystychain-13',
            name: 'Mistychain',
            description: '11015 hp/174 spd',
            defense: 1248,
            hp: 11015,
            speed: 174
        },
        {
            id: 'icy-dark-broom-13',
            name: 'Icy Dark Broom',
            description: '11015 hp/174 spd',
            defense: 1248,
            hp: 11015,
            speed: 174
        },
        {
            id: 'banshee-13',
            name: 'Banshee',
            description: '115703 hp/203 spd',
            defense: 1977,
            hp: 115703,
            extraDamageElement: HeroElement.earth,
            extraDamageMultiplier: 1.3,
            speed: 203
        },
    ],
    azimanak13: [
        {
            id: 'striker-raqix-warlord-13',
            name: 'Raqix Warlord',
            description: '14653 hp/218 spd',
            defense: 1134,
            hp: 14653,
            speed: 218
        },
        {
            id: 'karax-charger-13',
            name: 'Karax Charger',
            description: '23805 hp/176 spd',
            defense: 1297,
            hp: 23805,
            speed: 176
        },
        {
            id: 'egg-13',
            name: 'Egg',
            description: '9156 hp',
            defense: 600,
            hp: 9156
        },
        {
            id: 'azimanak-13',
            name: 'Azimanak',
            description: '134511 hp',
            defense: 2822,
            hp: 134511
        },
    ],
    caides13: [
        {
            id: 'converted-symaqus-13',
            name: 'Converted Symaqus',
            description: '41387 hp/264 spd',
            defense: 2698,
            hp: 41387,
            speed: 264
        },
        {
            id: 'caides-13',
            name: 'Caides',
            description: '226348 hp/180 spd/50% HP-Dmg Reduction',
            defense: 1456,
            hp: 226348,
            hpDamageMultiplier: 0.5,
            speed: 180
        },
    ],
    wyvern11: [
        {
            id: 'blaze-dragona-11',
            name: 'Blaze Dragona',
            description: '14158 hp/163 spd',
            defense: 984,
            hp: 14158,
            speed: 163
        },
        {
            id: 'blood-ridge-naga-11',
            name: 'Blood Ridge Naga',
            description: '11851 hp/144 spd',
            defense: 1183,
            hp: 11851,
            speed: 144
        },
        {
            id: 'wyvern-11',
            name: 'Wyvern',
            description: '150452 hp/208 spd',
            defense: 1254,
            hp: 150452,
            extraDamageElement: HeroElement.ice,
            extraDamageMultiplier: 1.3,
            speed: 208
        },
    ],
    golem11: [
        {
            id: 'raqix-flying-troop-11',
            name: 'Raqix Flying Troop',
            description: '12528 hp',
            defense: 891,
            hp: 12528
        },
        {
            id: 'mossy-testudo-11',
            name: 'Mossy Testudo',
            description: '15015 hp',
            defense: 1077,
            hp: 15015
        },
        {
            id: 'golem-11',
            name: 'Golem',
            description: '101983 hp',
            defense: 1306,
            hp: 101983,
            extraDamageElement: HeroElement.fire,
            extraDamageMultiplier: 1.3
        },
    ],
    banshee11: [
        {
            id: 'mystychain-11',
            name: 'Mistychain',
            description: '9631 hp/154 spd',
            defense: 1101,
            hp: 9631,
            speed: 154
        },
        {
            id: 'icy-dark-broom-11',
            name: 'Icy Dark Broom',
            description: '9631 hp/152 spd',
            defense: 1101,
            hp: 9631,
            speed: 152
        },
        {
            id: 'banshee-11',
            name: 'Banshee',
            description: '60624 hp/160 spd',
            defense: 1289,
            hp: 60624,
            extraDamageElement: HeroElement.earth,
            extraDamageMultiplier: 1.3,
            speed: 160
        },
    ],
    azimanak11: [
        {
            id: 'striker-raqix-warlord-11',
            name: 'Raqix Warlord',
            description: '12812 hp/211 spd',
            defense: 1030,
            hp: 12812,
            speed: 211
        },
        {
            id: 'karax-charger-11',
            name: 'Karax Charger',
            description: '20814 hp/149 spd',
            defense: 1150,
            hp: 20814,
            speed: 149
        },
        {
            id: 'egg-11',
            name: 'Egg',
            description: '8098 hp',
            defense: 540,
            hp: 8098
        },
        {
            id: 'azimanak-11',
            name: 'Azimanak',
            description: '87729 hp',
            defense: 1825,
            hp: 87729,
        },
    ],
    earthExpedition3: [
        {
            id: 'earth-exp-3',
            name: 'Earth Expedition - Level 3',
            defense: 1087,
            extraDamageElement: HeroElement.fire,
            extraDamageMultiplier: 1.5,
            singleAttackMultiplier: 0.3,
            nonSingleAttackMultiplier: 1.7
        }
    ],
    iceExpedition3: [
        {
            id: 'ice-exp-3',
            name: 'Ice Expedition - Level 3',
            defense: 905,
            extraDamageElement: HeroElement.earth,
            extraDamageMultiplier: 1.5
        }
    ],
    fireExpedition3: [
        {
            id: 'fire-exp-3',
            name: 'Fire Expedition - Level 3',
            defense: 1340,
            extraDamageElement: HeroElement.ice,
            extraDamageMultiplier: 1.5
        }
    ],
    lightExpedition3: [
        {
            id: 'light-exp-3',
            name: 'Light Expedition - Level 3',
            defense: 815
        }
    ],
    //TODO: get dark expo defense and add here
}

export const TargetReductionPresetGroups: Record<string, ReductionPreset[]> = {
    default: [
        {
            id: 'manual',
            name: 'Manual',
            label: null
        },
    ],
    damageReduction: [
        {
            id: 'proof-of-valor-init',
            name: 'Proof of Valor (Battle start)',
            label: '30%',
            damageReduction: 30
        },
        {
            id: 'proof-of-valor-down',
            name: 'Proof of Valor (After 5 hits)',
            label: '15%',
            damageReduction: 15
        },
        {
            id: 'adamant-shield',
            name: 'Adamant Shield (Max)',
            label: '16%',
            damageReduction: 16
        },
        {
            id: 'elena',
            name: 'Elena (S2 Passive)',
            label: '15%',
            damageReduction: 15
        },
        {
            id: 'c-armin',
            name: 'Crimson Armin (S2 Passive)',
            label: '15%',
            damageReduction: 15
        },
        {
            id: 'sepulcrum-1',
            name: 'Sepulcrum (Max - 1 stack)',
            label: '8%',
            damageReduction: 8
        },
        {
            id: 'sepulcrum-2',
            name: 'Sepulcrum (Max - 2 stacks)',
            label: '16%',
            damageReduction: 16
        },
        {
            id: 'sepulcrum-3',
            name: 'Sepulcrum (Max - 3 stacks)',
            label: '24%',
            damageReduction: 24
        }
    ],
    damageTransfer: [
        {
            id: 'ss-bellona',
            name: 'Seaside Bellona (S2 Passive)',
            label: '30%',
            damageTransfer: 30
        },
        {
            id: 'escort',
            name: 'Escort Buff',
            label: '30%',
            damageTransfer: 30
        },
        {
            id: 'aurius',
            name: 'Aurius (Max)',
            label: '20% (+10% Defense)',
            damageTransfer: 20,
            defenseIncrease: 10
        },
        {
            id: 't-crozet',
            name: 'Troublemaker Crozet (S2 Passive)',
            label: '40%',
            damageTransfer: 40
        },
        {
            id: 'eaton',
            name: 'Eaton (S2 Passive)',
            label: '30%',
            damageTransfer: 30
        }
    ]
}

export class DefensePreset {
    id: string; // TODO: remove if unused
    name: string;
    description?: string;
    defense: number | null;
    hp?: number;
    speed?: number;
    extraDamageElement?: HeroElement;
    extraDamageMultiplier?: number;
    hpDamageMultiplier?: number;
    singleAttackMultiplier?: number;
    nonSingleAttackMultiplier?: number;

    constructor(data: any) {
        this.id = _.get(data, 'id', '');
        this.name = _.get(data, 'name', '');
        this.description = _.get(data, 'label', '');
        this.defense = _.get(data, 'defense', 0);
        this.hp = _.get(data, 'hp', 0);
        this.speed = _.get(data, 'speed', 0);
        this.extraDamageElement = _.get(data, 'extraDamageElement', null);
        this.extraDamageMultiplier = _.get(data, 'extraDamageMultiplier', 1);
        this.hpDamageMultiplier = _.get(data, 'hpDamageMultiplier', 1);
        this.singleAttackMultiplier = _.get(data, 'singleAttackMultiplier', 1);
        this.nonSingleAttackMultiplier = _.get(data, 'nonSingleAttackMultiplier', 1);
    }
}

export class ReductionPreset {
    id: string; // TODO: remove if unused
    name: string;
    label: string | null;
    damageReduction?: number;
    damageTransfer?: number;
    defenseIncrease?: number;

    constructor(data: any) {
        this.id = _.get(data, 'id', '');
        this.name = _.get(data, 'name', '');
        this.label = _.get(data, 'label', '');
        this.damageReduction = _.get(data, 'damageReduction', 0);
        this.damageTransfer = _.get(data, 'damageTransfer', 0);
        this.defenseIncrease = _.get(data, 'defenseIncrease', 0);
    }
}