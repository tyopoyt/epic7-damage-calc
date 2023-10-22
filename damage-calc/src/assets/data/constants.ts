// TODO: don't have separate entries for target and caster for the same condition
export const BattleConstants: Record<string, number> = {
  'dmgConst': 1.871,
  'elementalAdvantage': 1.1,
  'decreasedAttack': 0.5, 
  'attackUp': 1.5, 
  'attackUpGreat': 1.75, 
  'casterVigor': 1.3,
  'increasedCritDamage': 0.5,
  'rageSet': 0.3,
  'torrentSet': 0.1,
  'penetrationSet': 0.15,
  'targetDefenseUp': 0.6,
  'targetDefenseDown': -0.7,
  'targetVigor': 0.3,
  'target': 1.15,
  'caster-fury': 1.3,
  'spdUp': 1.3, 
  'casterRage': 1.1,
  'targetRage': 1.1,
  'perception': 0.15
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
