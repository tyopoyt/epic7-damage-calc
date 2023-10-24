import * as _ from 'lodash-es'
import { DefensePreset, ReductionPreset } from './target-presets';
import { BattleConstants } from 'src/assets/data/constants';
import { Artifact } from './artifact';

// The | null here is to suppress a warning when using ?. in the html to check for a value in FormDefaults
// TODO: actually use the default: true
export const FormDefaults: Record<string, {max?: number, min?: number, defaultValue?: number, default?: boolean, step?: number, hint?: string, icon?: string, svgIcon?: boolean} | null> = {
    casterMaxHP: {
        max: 50000,
        min: 1000,
        defaultValue: 10000
    },
    casterDefenseUp: {
        icon: 'buffs/defense-buff.png'
    },
    casterDefenseDown: {
        icon: 'debuffs/defense-debuff.png'
    },
    casterHasStarsBlessing: {
        icon: 'buffs/stars-blessing-buff.png'
    },
    casterHasTrauma: {
        icon: 'debuffs/trauma-debuff.png'
    },
    targetHasTrauma: {
        icon: 'debuffs/trauma-debuff.png'
    },
    exclusiveEquipment1: {
        icon: 'icons/one.png'
    },
    exclusiveEquipment2: {
        icon: 'icons/two.png'
    },
    exclusiveEquipment3: {
        icon: 'icons/three.png'
    },
    extraDualOrCounter: {
        icon: 'buffs/dual-attack-buff.png'
    },
    skillTreeCompleted: {
        default: true,
        icon: 'icons/skill_tree.png'
    },
    casterSpeedUp: {
        icon: 'buffs/speed-buff.png'
    },
    targetSpeedUp: {
        icon: 'buffs/speed-buff.png'
    },
    casterSpeedDown: {
        icon: 'debuffs/speed-debuff.png'
    },
    targetSpeedDown: {
        icon: 'debuffs/speed-debuff.png'
    },
    casterEnraged: {
        icon: 'buffs/rage-buff.png'
    },
    targetEnraged: {
        icon: 'buffs/rage-buff.png'
    },
    casterFury: {
        icon: 'buffs/rage-buff.png'
    },
    beehooPassive: {
        icon: 'heroes/beehoo-icon.png'
    },
    casterFullFocus: {
        icon: 'icons/full-charge.svg',
        svgIcon: true
    },
    casterFullFightingSpirit: {
        icon: 'icons/full-charge.svg',
        svgIcon: true
    },
    casterHasBarrier: {
        icon: 'buffs/barrier-buff.png'
    },
    targetHasBarrier: {
        icon: 'buffs/barrier-buff.png'
    },
    casterHasStealth: {
        icon: 'buffs/stealth-buff.png'
    },
    targetHasDebuff: {
        icon: 'icons/e7-chevron-down.png'
    },
    targetHasBuff: {
        icon: 'icons/e7-chevron-up.png'
    },
    casterHasMultilayerBarrier: {
        icon: 'buffs/multilayer-barrier-buff.png'
    },
    casterDebuffed: {
        icon: 'icons/e7-chevron-down.png'
    },
    casterPerception: {
        icon: 'buffs/perception-buff.png'
    },
    targetMagicNailed: {
        icon: 'debuffs/nail-debuff.png'
    },
    targetAttackUp: {
        icon: 'buffs/attack-buff.png'
    },
    targetAttackDown: {
        icon: 'debuffs/attack-debuff.png'
    },
    targetAttackUpGreat: {
        icon: 'buffs/greater-attack-buff.png'
    },
    targetAsleep: {
        icon: 'debuffs/sleep-debuff.png'
    },
    targetProvoked: {
        icon: 'debuffs/provoke-debuff.png'
    },
    targetStunned: {
        icon: 'debuffs/stun-debuff.png'
    },
    targetSilenced: {
        icon: 'debuffs/silence-debuff.png'
    },
    casterHasNeoPhantomSword: {
        icon: 'buffs/neo-phantom-sword-buff.png'
    },
    casterInvincible: {
        icon: 'buffs/invincible-buff.png'
    },
    casterAboveHalfHP: {
        icon: 'icons/half-hp.png',
        default: true
    },
    casterHasImmensePower: {
        icon: 'buffs/immense-power-buff.png',
        default: true
    },
    casterHasFlameAlchemist: {
        icon: 'buffs/flame-alchemist-buff.png',
        default: true
    },
    targetIsHighestMaxHP: {
        icon: 'icons/highest-hp.png',
    },
    casterHasBzzt: {
        icon: 'buffs/bzzt-buff.png',
        default: true
    },
    numberOfTargets: {
        max: 9,
        min: 1,
        defaultValue: 4
    },
    numberOfHits: {
        max: 3,
        min: 1,
        defaultValue: 1
    },
    targetAttack: {
        max: 10000,
        min: 200,
        defaultValue: 2000
    },
    targetCurrentHP: {
        max: 50000,
        min: 1000,
        defaultValue: 10000
    },
    targetMaxHP: {
        max: 50000,
        min: 1000,
        defaultValue: 10000
    },
    targetInjuries: {
        max: 50000,
        min: 0,
        defaultValue: 0
    },
    targetCurrentHPPercent: {
        max: 100,
        min: 1,
        defaultValue: 100
    },
    targetSpeed: {
        max: 350,
        min: 70,
        defaultValue: 150
    },
    targetNumberOfBuffs: {
        max: 10,
        min: 0,
        defaultValue: 0
    },
    targetNumberOfDebuffs: {
        max: 10,
        min: 0,
        defaultValue: 0
    },
    targetNumberOfBleeds: {
        max: 10,
        min: 0,
        defaultValue: 0
    },
    targetBleedDetonate: {
        max: 10,
        min: 0,
        defaultValue: 0
    },
    targetBurnDetonate: {
        max: 10,
        min: 0,
        defaultValue: 0
    },
    targetBombDetonate: {
        max: 10,
        min: 0,
        defaultValue: 0
    },
    casterCurrentHPPercent: {
        max: 100,
        min: 1,
        defaultValue: 100
    },
    casterCurrentHP: {
        max: 50000,
        min: 1000,
        defaultValue: 10000
    },
    casterDefense: {
        max: 5000,
        min: 200,
        defaultValue: 750
    },
    casterSpeed: {
        max: 350,
        min: 70,
        defaultValue: 150
    },
    casterNumberOfBuffs: {
        max: 10,
        min: 0,
        defaultValue: 0
    },
    alliesNumberOfBuffs: {
        max: 40,
        min: 0,
        defaultValue: 0
    },
    casterTurn: {
        default: true
    },
    // TODO: default of casterBuffed depending on other buff boxes
    casterBuffed: {
        icon: 'icons/e7-chevron-up.png'
    },
    // TODO: caster has bzzt (and other unique buffs from passive) default to true? Check on queryparams stuff w/ that
    casterFocus: {
        max: 5,
        min: 0,
        defaultValue: 0
    },
    casterFightingSpirit: {
        max: 100,
        min: 0,
        defaultValue: 0,
        step: 5
    },
    criticalHitStack: {
        max: 50,
        min: 0,
        defaultValue: 0
    },
    nonAttackSkillStack: {
        max: 10,
        min: 0,
        defaultValue: 0
    },
    singleAttackStack: {
        max: 3,
        min: 0,
        defaultValue: 0
    },
    dualAttackStack: {
        max: 5,
        min: 0,
        defaultValue: 0
    },
    attackSkillStack: {
        max: 3,
        min: 0,
        defaultValue: 0
    },
    turnStack: {
        max: 20,
        min: 0,
        defaultValue: 0
    },
    aoeStack: {
        max: 5,
        min: 0,
        defaultValue: 0
    },
    casterAttackedStack: {
        max: 3,
        min: 0,
        defaultValue: 0
    },
    numberOfDeaths: {
        max: 8,
        min: 0,
        defaultValue: 0
    },
    enemyCounterStack: {
        max: 4,
        min: 0,
        defaultValue: 0
    },
    highestAllyAttack: {
        max: 10000,
        min: 200,
        defaultValue: 4000
    },
    highestAllyAttackUp: {
        icon: 'buffs/attack-buff.png'
    },
    highestAllyAttackUpGreat: {
        icon: 'buffs/greater-attack-buff.png'
    },
    highestAllyAttackDown: {
        icon: 'debuffs/attack-debuff.png'
    },
    s3OnCooldown: {
        default: true
    },
    skill3Stack: {
        max: 3,
        min: 0,
        defaultValue: 0
    },
    enemyDefeated: {
        icon: 'icons/skull.svg',
        svgIcon: true,
        default: true
    },
    inBattleHP: {
        default: false,
        hint: 'inBattleHPHint',
        icon: 'icons/full-hp.png'
    }
}

export const TargetAttackModifiers = [
    'targetAttackDown', 'targetAttackUp', 'targetAttackUpGreat', 'targetVigor', 'targetEnraged'
]

export class DamageFormData {
    [key: string]: string | number | boolean | DefensePreset | ReductionPreset | undefined | ((artifact: Artifact) => number) | Record<string, number>,
    AOEStack: number;
    artifactLevel: number;
    attack: number;
    attackImprint: number;
    attackIncreasePercent: number;
    beehooPassive: boolean;
    damageIncrease: number;
    decreasedAttack: boolean;
    casterAboveHalfHP: boolean;
    casterAttackedStack: number;
    casterCurrentHP: number;
    casterCurrentHPPercent: number;
    casterDebuffed: boolean;
    casterDefense: number;
    casterDefenseUp: boolean;
    casterDefenseDown: boolean;
    casterEnraged: boolean;
    casterFocus: number;
    casterFullFightingSpirit: boolean;
    casterFightingSpirit: number;
    casterFullFocus: boolean;
    casterFury: boolean;
    casterBuffed: boolean;
    casterHasBzzt: boolean;
    casterHasFlameAlchemist: boolean;
    casterHasImmensePower: boolean;
    casterHasMultilayerBarrier: boolean;
    casterHasNeoPhantomSword: boolean;
    casterHasStealth: boolean;
    casterHasTrauma: boolean;
    casterHasStarsBlessing: boolean;
    casterInvincible: boolean;
    casterMaxHP: number;
    casterNumberOfBuffs: number;
    alliesNumberOfBuffs: number;
    casterPerception: boolean;
    casterSpeed: number;
    casterSpeedUp: boolean;
    casterSpeedDown: boolean;
    casterVigor: boolean;
    critDamage: number;
    increasedCritDamage: boolean;
    criticalHitStack: number;
    damageReduction: number;
    damageTransfer: number
    defensePercentUp: number;
    defensePreset?: DefensePreset;
    dualAttackStack: number;
    elementalAdvantage: boolean;
    enemyCounterStack: number;
    enemyDefeated: boolean;
    exclusiveEquipment1: boolean;
    exclusiveEquipment2: boolean;
    exclusiveEquipment3: boolean;
    extraDualOrCounter: boolean;
    heroID: string;
    highestAllyAttack: number;
    highestAllyAttackUp: boolean;
    highestAllyAttackUpGreat: boolean;
    highestAllyAttackDown: boolean;
    inBattleHP: boolean;
    attackUp: boolean;
    attackUpGreat: boolean;
    molagoras1: number;
    molagoras2: number;
    molagoras3: number;
    nonAttackSkillStack: number;
    attackSkillStack: number;
    nonattackSkillStack: number;
    numberOfDeaths: number;
    numberOfHits: number;
    numberOfTargets: number;
    penetrationSet: boolean;
    rageSet: boolean;
    reductionPreset?: ReductionPreset;
    S3OnCooldown: boolean;
    singleAttackStack: number;
    skill3Stack: number;
    skillTreeCompleted: boolean;
    targetAsleep: boolean;
    targetAttack: number;
    targetBleedDetonate: number;
    targetBombDetonate: number;
    targetBurnDetonate: number;
    targetCurrentHP: number;
    targetCurrentHPPercent: number;
    targetDefense: number;
    targetDefenseIncrease: number;
    targetDefenseDown: boolean;
    targetDefenseUp: boolean;
    targetEnraged: boolean;
    targetFury: boolean;
    targetHasBarrier: boolean;
    targetHasBuff: boolean;
    targetHasDebuff: boolean;
    targetHasTrauma: boolean;
    targetInjuries: number;
    targetIsHighestMaxHP: boolean;
    targetMagicNailed: boolean;
    targetMaxHP: number;
    targetNumberOfBleeds: number;
    targetNumberOfDebuffs: number;
    targetProvoked: boolean;
    targetSilenced: boolean;
    targetVigor: boolean;
    targetSpeed: number;
    targetSpeedUp: boolean;
    targetSpeedDown: boolean;
    targetStunned: boolean;
    targetTargeted: boolean;
    torrentSetStack: number;
    totalAllyBuffs: number;
    turnStack: number;

    inputOverrides: Record<string, number>;

    get casterFinalAttack() {
        return this.inputOverrides['attack'] ? this.inputOverrides['attack'] : this.attack;
    }

    get casterFinalCritDamage() {
        return this.inputOverrides['critDamage'] ? this.inputOverrides['critDamage'] : this.critDamage;
    }

    constructor(data: any) {
        this.AOEStack = _.get(data, 'AOEStack', 0);
        this.artifactLevel = _.get(data, 'artifactLevel', 0);
        this.attack = _.get(data, 'attack', 2500);
        this.attackImprint = _.get(data, 'attackImprint', 0);
        this.attackIncreasePercent = _.get(data, 'attackIncreasePercent', 0);
        this.beehooPassive = _.get(data, 'beehooPassive', false);
        this.damageIncrease = _.get(data, 'damageIncrease', 0);
        this.decreasedAttack = _.get(data, 'decreasedAttack', false);
        this.casterAboveHalfHP = _.get(data, 'casterAboveHalfHP', true);
        this.casterAttackedStack = _.get(data, 'casterAttackedStack', 0);
        this.casterCurrentHP = _.get(data, 'casterCurrentHP', 10000);
        this.casterCurrentHPPercent = _.get(data, 'casterCurrentHPPercent', 100);
        this.casterDebuffed = _.get(data, 'casterDebuffed', false);
        this.casterDefense = _.get(data, 'casterDefense', 1000);
        this.casterDefenseUp = _.get(data, 'casterDefenseUp', false);
        this.casterDefenseDown = _.get(data, 'casterDefenseDown', false);
        this.casterEnraged = _.get(data, 'casterEnraged', false);
        this.casterFocus = _.get(data, 'casterFocus', 0);
        this.casterFullFightingSpirit = _.get(data, 'casterFullFightingSpirit', false);
        this.casterFightingSpirit = _.get(data, 'casterFightingSpirit', 0);
        this.casterFullFocus = _.get(data, 'casterFullFocus', false);
        this.casterFury = _.get(data, 'casterFury', false);
        this.casterBuffed = _.get(data, 'casterBuffed', false);
        this.casterHasBzzt = _.get(data, 'casterHasBzzt', false);
        this.casterHasFlameAlchemist = _.get(data, 'casterHasFlameAlchemist', false);
        this.casterHasImmensePower = _.get(data, 'casterHasImmensePower', false);
        this.casterHasMultilayerBarrier = _.get(data, 'casterHasMultilayerBarrier', false);
        this.casterHasNeoPhantomSword = _.get(data, 'casterHasNeoPhantomSword', false);
        this.casterHasStealth = _.get(data, 'casterHasStealth', false);
        this.casterHasTrauma = _.get(data, 'casterHasTrauma', false);
        this.casterHasStarsBlessing = _.get(data, 'casterHasStarsBlessing', false);
        this.casterInvincible = _.get(data, 'casterInvincible', false);
        this.casterMaxHP = _.get(data, 'casterMaxHP', 10000);
        this.casterNumberOfBuffs = _.get(data, 'casterNumberOfBuffs', 0)
        this.alliesNumberOfBuffs = _.get(data, 'alliesNumberOfBuffs', 0)
        this.casterPerception = _.get(data, 'casterPerception', false);
        this.casterSpeed = _.get(data, 'casterSpeed', 150);
        this.casterSpeedUp = _.get(data, 'casterSpeedUp', false);
        this.casterSpeedDown = _.get(data, 'casterSpeedDown', false);
        this.casterVigor = _.get(data, 'casterVigor', false);
        this.critDamage = _.get(data, 'critDamage', 250);
        this.increasedCritDamage = _.get(data, 'increasedCritDamage', false);
        this.criticalHitStack = _.get(data, 'criticalHitStack', 0)
        this.damageReduction = _.get(data, 'damageReduction', 0);
        this.damageTransfer = _.get(data, 'damageTransfer', 0);
        this.defensePercentUp = _.get(data, 'defensePercentUp', 0);
        this.defensePreset = _.get(data, 'defensePreset', null);
        this.dualAttackStack = _.get(data, 'dualAttackStack', 0)
        this.elementalAdvantage = _.get(data, 'elementalAdvantage', false);
        this.enemyCounterStack = _.get(data, 'enemyCounterStack', 0)
        this.enemyDefeated = _.get(data, 'enemyDefeated', false);
        this.exclusiveEquipment1 = _.get(data, 'exclusiveEquipment1', false);
        this.exclusiveEquipment2 = _.get(data, 'exclusiveEquipment2', false);
        this.exclusiveEquipment3 = _.get(data, 'exclusiveEquipment3', false);
        this.extraDualOrCounter = _.get(data, 'extraDualOrCounter', false);
        this.heroID = _.get(data, 'heroID', 'abigail');
        this.highestAllyAttack = _.get(data, 'highestAllyAttack', 2500);
        this.highestAllyAttackUp = _.get(data, 'highestAllyAttackUp', false);
        this.highestAllyAttackUpGreat = _.get(data, 'highestAllyAttackUpGreat', false);
        this.highestAllyAttackDown = _.get(data, 'highestAllyAttackDown', false);
        this.inBattleHP = _.get(data, 'inBattleHP', false);
        this.attackUp = _.get(data, 'attackUp', false);
        this.attackUpGreat = _.get(data, 'attackUpGreat', false);
        this.molagoras1 = _.get(data, 'molagoraS1', 0);
        this.molagoras2 = _.get(data, 'molagoraS2', 0);
        this.molagoras3 = _.get(data, 'molagoraS3', 0);
        this.nonAttackSkillStack = _.get(data, 'nonAttackSkillStack', 0);
        this.attackSkillStack = _.get(data, 'attackSkillStack', 0);
        this.nonattackSkillStack = _.get(data, 'nonattackSkillStack', 0);
        this.numberOfDeaths = _.get(data, 'numberOfDeaths', 0);
        this.numberOfHits = _.get(data, 'numberOfHits', 1);
        this.numberOfTargets = _.get(data, 'numberOfTargets', 0);
        this.penetrationSet = _.get(data, 'penetrationSet', false);
        this.rageSet = _.get(data, 'rageSet', false);
        this.reductionPreset = _.get(data, 'reductionPreset', null);
        this.S3OnCooldown = _.get(data, 'S3OnCooldown', false);
        this.singleAttackStack = _.get(data, 'singleAttackStack', 0);
        this.skill3Stack = _.get(data, 'skill3Stack', 0);
        this.skillTreeCompleted = _.get(data, 'skillTreeCompleted', true);
        this.targetAsleep = _.get(data, 'targetAsleep', false);
        this.targetAttack = _.get(data, 'targetAttack', 2500);
        this.targetBleedDetonate = _.get(data, 'targetBleedDetonate', 0);
        this.targetBombDetonate = _.get(data, 'targetBombDetonate', 0);
        this.targetBurnDetonate = _.get(data, 'targetBurnDetonate', 0);
        this.targetCurrentHP = _.get(data, 'targetCurrentHP', 10000);
        this.targetCurrentHPPercent = _.get(data, 'targetCurrentHPPercent', 100);
        this.targetDefense = _.get(data, 'targetDefense', 1000);
        this.targetDefenseIncrease = _.get(data, 'targetDefenseIncrease', 0);
        this.targetDefenseDown = _.get(data, 'targetDefenseDown', false);
        this.targetDefenseUp = _.get(data, 'targetDefenseUp', false);
        this.targetEnraged = _.get(data, 'targetEnraged', false);
        this.targetFury = _.get(data, 'targetFury', false);
        this.targetHasBarrier = _.get(data, 'targetHasBarrier', false);
        this.targetHasBuff = _.get(data, 'targetHasBuff', false);
        this.targetHasDebuff = _.get(data, 'targetHasDebuff', false);
        this.targetHasTrauma = _.get(data, 'targetHasTrauma', false);
        this.targetInjuries = _.get(data, 'targetInjuries', 0);
        this.targetIsHighestMaxHP = _.get(data, 'targetIsHighestMaxHP', false);
        this.targetMagicNailed = _.get(data, 'targetMagicNailed', false);
        this.targetMaxHP = _.get(data, 'targetMaxHP', 0);
        this.targetNumberOfBleeds = _.get(data, 'targetNumberOfBleeds', 0);
        this.targetNumberOfDebuffs = _.get(data, 'targetNumberOfDebuffs', 0);
        this.targetProvoked = _.get(data, 'targetProvoked', false);
        this.targetSilenced = _.get(data, 'targetSilenced', false);
        this.targetSpeed = _.get(data, 'targetSpeed', 150);
        this.targetSpeedUp = _.get(data, 'targetSpeedUp', false);
        this.targetSpeedDown = _.get(data, 'targetSpeedDown', false);
        this.targetStunned = _.get(data, 'targetStunned', false);
        this.targetTargeted = _.get(data, 'targetTargeted', false);
        this.targetVigor = _.get(data, 'targetVigor', false);
        this.torrentSetStack = _.get(data, 'torrentSetStack', 0);
        this.totalAllyBuffs = _.get(data, 'totalAllyBuffs', 0);
        this.turnStack = _.get(data, 'turnStack', 0);
        this.inputOverrides = _.get(data, 'inputOverrides', {});
    }

    casterFinalSpeed = () => {
        return Math.floor((this.inputOverrides['casterSpeed'] ? this.inputOverrides['casterSpeed'] : this.casterSpeed) * (1 + (this.casterSpeedUp ? BattleConstants.spdUp - 1 : 0)
           + (this.casterSpeedDown ? 1 - BattleConstants.spdUp : 0)
           + (this.casterEnraged ? BattleConstants.casterEnraged - 1 : 0)));
    }

    targetFinalSpeed = () => {
        return Math.floor(this.targetSpeed * (1 + (this.targetSpeedUp ? BattleConstants.spdUp - 1 : 0)
           + (this.targetSpeedDown ? 1 - BattleConstants.spdUp : 0)
           + (this.targetEnraged ? BattleConstants.targetEnraged - 1 : 0)));
    }

    // TODO: Make sure the targetdefense... get replaced when constants are renamed
    casterFinalDefense = () => {
        let defenseMultiplier = (1 + (this.casterDefenseUp ? BattleConstants.targetDefenseUp : 0)
        + (this.casterDefenseDown ? BattleConstants.targetDefenseDown : 0)
        + (this.casterHasTrauma ? BattleConstants.trauma : 0)
        + (this.casterVigor ? BattleConstants.casterVigor - 1 : 0)
        + (this.casterFury ? BattleConstants['caster-fury'] - 1 : 0));

        if (this.casterHasTrauma && this.casterDefenseDown) {
            defenseMultiplier -= BattleConstants.trauma;
            defenseMultiplier *= BattleConstants.trauma * -1;
        }
        
        return Math.floor((this.inputOverrides['casterDefense'] ? this.inputOverrides['casterDefense'] : this.casterDefense) * defenseMultiplier);
    }
    // TODO: add indomitable for peacemaker
    targetFinalDefense = () => {
        let defenseMultiplier = (1 + (this.targetDefenseUp ? BattleConstants.targetDefenseUp : 0)
        + (this.targetDefenseDown ? BattleConstants.targetDefenseDown : 0)
        + (this.targetHasTrauma ? BattleConstants.trauma : 0)
        + (this.targetVigor ? BattleConstants.casterVigor - 1 : 0)
        + (this.targetFury ? BattleConstants['caster-fury'] - 1 : 0));

        if (this.targetHasTrauma && this.targetDefenseDown) {
            defenseMultiplier -= BattleConstants.trauma;
            defenseMultiplier *= BattleConstants.trauma * -1;
        }

        return Math.floor(this.targetDefense * defenseMultiplier);
    }

    casterFinalMaxHP = (artifact: Artifact) => {
        return (this.inputOverrides['casterMaxHP'] ? this.inputOverrides['casterMaxHP'] : this.casterMaxHP) * (this.inBattleHP ? 1: artifact.maxHP);
    }

    targetFinalMaxHP = () => {
        return (this.inputOverrides['targetMaxHP'] ? this.inputOverrides['targetMaxHP'] : this.targetMaxHP * (this.defensePreset?.hpDamageMultiplier ? this.defensePreset.hpDamageMultiplier : 1));
    }

    targetFinalAttack = () => {
        let targetAttackModifier = 1
        TargetAttackModifiers.forEach((mod) => {
            let modValue = BattleConstants[mod] - 1
            if (mod === 'targetVigor') {
                modValue += 1
            }

            targetAttackModifier += this[mod as keyof DamageFormData] ? modValue : 0.0;
        });
        return this.targetAttack * targetAttackModifier
    }
}