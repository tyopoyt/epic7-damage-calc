// TODO: refactor these to be more readable
export const BattleConstants: Record<string, number> = {
  'dmgConst': 1.871,
  'elementalAdvantage': 1.1,
  'decreasedAttack': 0.5, 
  'increasedAttack': 1.5, 
  'increasedAttackGreat': 1.75, 
  'casterVigor': 1.3,
  'increasedCritDamage': 0.5,
  'rageSet': 0.3,
  'torrentSet': 0.1,
  'penetrationSet': 0.15,
  'defUp': 0.6,
  'defDown': -0.7,
  'targetVigor': 0.3,
  'target': 1.15,
  'caster-fury': 1.3,
  'spdUp': 1.3, 
  'casterRage': 1.1
};

export const HeroConstants = {
  'beehooBurnMult': 1.3
};

// Used for the caster_has_buff field
export const CasterBuffs = [
  'atk-up', 'vigor', 'atk-up-great', 'crit-dmg-up', 'caster-defense-up', 'caster-speed-up',
  'caster-has-flame-alchemist', 'caster-has-multilayer-barrier', 'caster-invincible',
  'caster-perception', 'caster-enrage', 'caster-fury', 'caster-stealth'
];

export const DisplayConstants = {
  'font-family': '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
};
