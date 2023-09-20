import * as _ from 'lodash-es'
import { DefensePreset, ReductionPreset } from './target-presets';
//TODO: heroes will replace form with heroSpecific [] and heroSpecificMaximums {}
export class DamageFormData {
    artifactLevel: number;
    attack: number;
    attackImprint: number;
    attackPercentUp: number;
    beehooPassive: boolean;
    bonusDamage: number;
    casterAboveHalfHP: boolean;
    casterAttackedStack: number;
    casterAttackStack: number;
    casterCurrentHP: number;
    casterCurrentHPPercent: number;
    casterDebuffed: boolean;
    casterDefense: number;
    casterDefenseUp: boolean;
    casterEnraged: boolean;
    casterFocus: number;
    casterFullFightingSpirit: boolean;
    casterFullFocus: boolean;
    casterFury: boolean;
    casterHasBuff: boolean;
    casterHasBzzt: boolean;
    casterHasFlameAlchemist: boolean;
    casterHasImmensePower: boolean;
    casterHasMultilayerBarrier: boolean;
    casterHasNeoPhantomSword: boolean;
    casterHasStealth: boolean;
    casterInvincible: boolean;
    casterMaxHP: number;
    casterNumberOfBuffs: number;
    casterPerception: boolean;
    casterSpeed: number;
    casterSpeedUp: boolean;
    casterVigor: boolean;
    critDamage: number;
    critDamageUp: boolean;
    criticalHitStack: number;
    damageReduction: number;
    damageTransfer: number
    defensePercentUp: number;
    defensePreset?: DefensePreset;
    dualAttackStack: number;
    elementalAdvantage: boolean;
    enemyCounterStack: number;
    exclusiveEquipment1: boolean;
    exclusiveEquipment2: boolean;
    exclusiveEquipment3: boolean;
    highestAllyAttack: number;
    molagoraS1: number;
    molagoraS2: number;
    molagoraS3: number;
    nonAttackSkillStack: number;
    nonCasterAttackStack: number;
    numberOfDeaths: number;
    numberOfHits: number;
    numberOfTargets: number;
    penSet: boolean;
    reductionPreset?: ReductionPreset;
    S3OnCooldown: boolean;
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
    targetHasBarrier: boolean;
    targetHasBuff: boolean;
    targetHasDebuff: boolean;
    targetInjuries: number;
    targetIsHighestMaxHP: boolean;
    targetMagicNailed: boolean;
    targetMaxHP: number;
    targetNumberOfBleeds: number;
    targetNumberOfDebuffs: number;
    targetProvoked: boolean;
    targetSilenced: boolean;
    targetSpeed: number;
    targetStunned: boolean;
    targetTargeted: boolean;
    torrentSetStack: number;
    totalAllyBuffs: number;

    constructor(data: any) {
        this.artifactLevel = _.get(data, 'artifactLevel', 0);
        this.attack = _.get(data, 'attack', 2500);
        this.attackImprint = _.get(data, 'attackImprint', 0);
        this.attackPercentUp = _.get(data, 'attackPercentUp', 0);
        this.beehooPassive = _.get(data, 'beehooPassive', false);
        this.bonusDamage = _.get(data, 'bonusDamage', 0);
        this.casterAboveHalfHP = _.get(data, 'casterAboveHalfHP', true);
        this.casterAttackedStack = _.get(data, 'casterAttackedStack', 0);
        this.casterAttackStack = _.get(data, 'casterAttackStack', 0);
        this.casterCurrentHP = _.get(data, 'casterCurrentHP', 10000);
        this.casterCurrentHPPercent = _.get(data, 'casterCurrentHPPercent', 100);
        this.casterDebuffed = _.get(data, 'casterDebuffed', false);
        this.casterDefense = _.get(data, 'casterDefense', 1000);
        this.casterDefenseUp = _.get(data, 'casterDefenseUp', false);
        this.casterEnraged = _.get(data, 'casterEnrage', false);
        this.casterFocus = _.get(data, 'casterFocus', 0);
        this.casterFullFightingSpirit = _.get(data, 'casterFullFightingSpirit', false);
        this.casterFullFocus = _.get(data, 'casterFullFocus', false);
        this.casterFury = _.get(data, 'casterFury', false);
        this.casterHasBuff = _.get(data, 'casterHasBuff', false);
        this.casterHasBzzt = _.get(data, 'casterHasBzzt', false);
        this.casterHasFlameAlchemist = _.get(data, 'casterHasFlameAlchemist', false);
        this.casterHasImmensePower = _.get(data, 'casterHasImmensePower', false);
        this.casterHasMultilayerBarrier = _.get(data, 'casterHasMultilayerBarrier', false);
        this.casterHasNeoPhantomSword = _.get(data, 'casterHasNeoPhantomSword', false);
        this.casterHasStealth = _.get(data, 'casterHasStealth', false);
        this.casterInvincible = _.get(data, 'casterInvincible', false);
        this.casterMaxHP = _.get(data, 'casterMaxHP', 10000);
        this.casterNumberOfBuffs = _.get(data, 'casterNumberOfBuffs', 0)
        this.casterPerception = _.get(data, 'casterPerception', false);
        this.casterSpeed = _.get(data, 'casterSpeed', 150);
        this.casterSpeedUp = _.get(data, 'casterSpeedUp', false);
        this.casterVigor = _.get(data, 'casterVigor', false);
        this.critDamage = _.get(data, 'critDamage', 250);
        this.critDamageUp = _.get(data, 'critDamage', false);
        this.criticalHitStack = _.get(data, 'criticalHitStack', 0)
        this.damageReduction = _.get(data, 'damageReduction', 0);
        this.damageTransfer = _.get(data, 'damageTransfer', 0);
        this.defensePercentUp = _.get(data, 'defensePercentUp', 0);
        this.defensePreset = _.get(data, 'defensePreset', null);
        this.dualAttackStack = _.get(data, 'dualAttackStack', 0)
        this.elementalAdvantage = _.get(data, 'elementalAdvantage', false);
        this.enemyCounterStack = _.get(data, 'enemyCounterStack', 0)
        this.exclusiveEquipment1 = _.get(data, 'exclusiveEquipment1', false);
        this.exclusiveEquipment2 = _.get(data, 'exclusiveEquipment2', false);
        this.exclusiveEquipment3 = _.get(data, 'exclusiveEquipment3', false);
        this.highestAllyAttack = _.get(data, 'highestAllyAttack', 2500);
        this.molagoraS1 = _.get(data, 'molagoraS1', 0);
        this.molagoraS2 = _.get(data, 'molagoraS2', 0);
        this.molagoraS3 = _.get(data, 'molagoraS3', 0);
        this.nonAttackSkillStack = _.get(data, 'nonAttackSkillStack', 0);
        this.nonCasterAttackStack = _.get(data, 'nonCasterAttackStack', 10000);
        this.numberOfDeaths = _.get(data, 'numberOfDeaths', 0);
        this.numberOfHits = _.get(data, 'numberOfHits', 1);
        this.numberOfTargets = _.get(data, 'numberOfTargets', 0);
        this.penSet = _.get(data, 'penSet', false);
        this.reductionPreset = _.get(data, 'reductionPreset', null);
        this.S3OnCooldown = _.get(data, 'S3OnCooldown', false);
        this.skill3Stack = _.get(data, 'skill3Stack', 0);
        this.skillTreeCompleted = _.get(data, 'skillTreeCompleted', true);
        this.targetAsleep = _.get(data, 'targetAsleep', false);
        this.targetAttack = _.get(data, 'targetAttack', 2500);
        this.targetBleedDetonate = _.get(data, 'targetBleedDetonate', 0);
        this.targetBombDetonate = _.get(data, 'targetBombDetonate', 0);
        this.targetBurnDetonate = _.get(data, 'targetBurnDetonate', 0);
        this.targetCurrentHP = _.get(data, 'targetCurrentHP', 10000);
        this.targetCurrentHPPercent = _.get(data, 'targetCurrentHPPercent', 100);
        this.targetDefense = _.get(data, 'defense', 0);
        this.targetHasBarrier = _.get(data, 'targetHasBarrier', false);
        this.targetHasBuff = _.get(data, 'targetHasBuff', false);
        this.targetHasDebuff = _.get(data, 'targetHasDebuff', false);
        this.targetInjuries = _.get(data, 'targetInjuries', 0);
        this.targetIsHighestMaxHP = _.get(data, 'targetIsHighestMaxHP', false);
        this.targetMagicNailed = _.get(data, 'targetMagicNailed', false);
        this.targetMaxHP = _.get(data, 'targetMaxHP', 10000);
        this.targetNumberOfBleeds = _.get(data, 'targetNumberOfBleeds', 0);
        this.targetNumberOfDebuffs = _.get(data, 'targetNumberOfDebuffs', 0);
        this.targetProvoked = _.get(data, 'targetProvoked', false);
        this.targetSilenced = _.get(data, 'targetSilenced', false);
        this.targetSpeed = _.get(data, 'targetSpeed', 150);
        this.targetStunned = _.get(data, 'targetStunned', false);
        this.targetTargeted = _.get(data, 'targetTargeted', false);
        this.torrentSetStack = _.get(data, 'torrentSetStack', 0);
        this.totalAllyBuffs = _.get(data, 'totalAllyBuffs', 0);
    }
}