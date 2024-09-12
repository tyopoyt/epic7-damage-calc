// TODO: don't have separate entries for target and caster for the same condition
export const BattleConstants: Record<string, number> = {
  'damageConstant': 1.871,
  'elementalAdvantage': 1.1,
  'decreasedAttack': 0.5, 
  'targetAttackDown': 0.5, 
  'attackUp': 1.5, 
  'targetAttackUp': 1.5, 
  'attackUpGreat': 1.75,
  'casterHasArchdemonsMight': 1.3,
  'targetAttackUpGreat': 1.75, 
  'targetArchdemonsMight': 1.3, 
  'casterVigor': 1.3,
  'targetVigor': 0.3,
  'increasedCritDamage': 0.5,
  'rageSet': 0.3,
  'torrentSet': 0.1,
  'penetrationSet': 0.15,
  'targetDefenseUp': 0.6,
  'targetDefenseDown': -0.7,
  'target': 1.15,
  'caster-fury': 1.3,
  'spdUp': 1.3, 
  'casterEnraged': 1.2,
  'targetEnraged': 1.2,
  'perception': 0.15,
  'casterPromotionStack': 0.05,
  'casterHasStarsBlessing': 1.15,
  'trauma': -0.7,
  'targetHasTrauma': -0.7,
  'casterHasPossession': 1.25
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
