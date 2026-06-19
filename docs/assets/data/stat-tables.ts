import { HeroClass, HeroStarGrade, HeroStarSign } from 'src/app/models/hero-enums';

export type HeroBaseStatEntry = { atk: number; hp: number; def: number };

const ZERO: HeroBaseStatEntry = { atk: 0, hp: 0, def: 0 };

function signMap(entry: HeroBaseStatEntry): Record<HeroStarSign, HeroBaseStatEntry> {
  return {
    [HeroStarSign.aries]:       { ...entry },
    [HeroStarSign.taurus]:      { ...entry },
    [HeroStarSign.gemini]:      { ...entry },
    [HeroStarSign.cancer]:      { ...entry },
    [HeroStarSign.leo]:         { ...entry },
    [HeroStarSign.virgo]:       { ...entry },
    [HeroStarSign.libra]:       { ...entry },
    [HeroStarSign.scorpio]:     { ...entry },
    [HeroStarSign.sagittarius]: { ...entry },
    [HeroStarSign.capricorn]:   { ...entry },
    [HeroStarSign.aquarius]:    { ...entry },
    [HeroStarSign.pisces]:      { ...entry },
  };
}

export const HeroBaseStatsTable: Record<HeroClass, Partial<Record<HeroStarGrade, Record<HeroStarSign, HeroBaseStatEntry>>>> = {
  [HeroClass.warrior]: {
    [HeroStarGrade.five]: {
      [HeroStarSign.aries]:       { atk: 984, hp: 6266, def: 637 },
      [HeroStarSign.taurus]:      { atk: 1228, hp: 5784, def: 553 },
      [HeroStarSign.gemini]:      { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.cancer]:      { atk: 975, hp: 7054, def: 652 },
      [HeroStarSign.leo]:         { atk: 1359, hp: 5542, def: 585 },
      [HeroStarSign.virgo]:       { atk: 1039, hp: 5340, def: 617 },
      [HeroStarSign.libra]:       { atk: 1119, hp: 6266, def: 627 },
      [HeroStarSign.scorpio]:     { atk: 1208, hp: 6488, def: 616 },
      [HeroStarSign.sagittarius]: { atk: 1177, hp: 5542, def: 553 },
      [HeroStarSign.capricorn]:   { atk: 966, hp: 7323, def: 657 },
      [HeroStarSign.aquarius]:    { atk: 885, hp: 6149, def: 613 },
      [HeroStarSign.pisces]:      { atk: 966, hp: 5663, def: 668 },
    },
    [HeroStarGrade.four]: signMap(ZERO),
    [HeroStarGrade.three]: signMap(ZERO),
  },
  [HeroClass.knight]: {
    [HeroStarGrade.five]: {
      [HeroStarSign.aries]:       { atk: 821, hp: 6751, def: 648 },
      [HeroStarSign.taurus]:      { atk: 1112, hp: 6321, def: 645 },
      [HeroStarSign.gemini]:      { atk: 957, hp: 6148, def: 634 },
      [HeroStarSign.cancer]:      { atk: 794, hp: 7332, def: 767 },
      [HeroStarSign.leo]:         { atk: 1134, hp: 5825, def: 662 },
      [HeroStarSign.virgo]:       { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.libra]:       { atk: 885, hp: 6663, def: 733 },
      [HeroStarSign.scorpio]:     { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.sagittarius]: { atk: 894, hp: 6840, def: 694 },
      [HeroStarSign.capricorn]:   { atk: 776, hp: 6593, def: 822 },
      [HeroStarSign.aquarius]:    { atk: 830, hp: 6619, def: 713 },
      [HeroStarSign.pisces]:      { atk: 839, hp: 6405, def: 752 },
    },
    [HeroStarGrade.four]: signMap(ZERO),
    [HeroStarGrade.three]: signMap(ZERO),
  },
  [HeroClass.mage]: {
    [HeroStarGrade.five]: {
      [HeroStarSign.aries]:       { atk: 1255, hp: 5016, def: 652 },
      [HeroStarSign.taurus]:      { atk: 1039, hp: 5299, def: 673 },
      [HeroStarSign.gemini]:      { atk: 1197, hp: 4572, def: 683 },
      [HeroStarSign.cancer]:      { atk: 1359, hp: 4895, def: 652 },
      [HeroStarSign.leo]:         { atk: 1412, hp: 4248, def: 645 },
      [HeroStarSign.virgo]:       { atk: 1306, hp: 4248, def: 652 },
      [HeroStarSign.libra]:       { atk: 1039, hp: 6034, def: 613 },
      [HeroStarSign.scorpio]:     { atk: 1286, hp: 4733, def: 652 },
      [HeroStarSign.sagittarius]: { atk: 1228, hp: 4370, def: 662 },
      [HeroStarSign.capricorn]:   { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.aquarius]:    { atk: 1316, hp: 4777, def: 715 },
      [HeroStarSign.pisces]:      { atk: 1102, hp: 5782, def: 634 },
    },
    [HeroStarGrade.four]: signMap(ZERO),
    [HeroStarGrade.three]: signMap(ZERO),
  },
  [HeroClass.ranger]: {
    [HeroStarGrade.five]: {
      [HeroStarSign.aries]:       { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.taurus]:      { atk: 1327, hp: 5138, def: 582 },
      [HeroStarSign.gemini]:      { atk: 1182, hp: 5299, def: 571 },
      [HeroStarSign.cancer]:      { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.leo]:         { atk: 1158, hp: 6002, def: 553 },
      [HeroStarSign.virgo]:       { atk: 1283, hp: 4976, def: 536 },
      [HeroStarSign.libra]:       { atk: 1079, hp: 5502, def: 564 },
      [HeroStarSign.scorpio]:     { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.sagittarius]: { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.capricorn]:   { atk: 1003, hp: 5704, def: 585 },
      [HeroStarSign.aquarius]:    { atk: 970, hp: 5299, def: 603 },
      [HeroStarSign.pisces]:      { atk: 993, hp: 6002, def: 611 },
    },
    [HeroStarGrade.four]: signMap(ZERO),
    [HeroStarGrade.three]: signMap(ZERO),
  },
  [HeroClass.soul_weaver]: {
    [HeroStarGrade.five]: {
      [HeroStarSign.aries]:       { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.taurus]:      { atk: 694, hp: 4855, def: 655 },
      [HeroStarSign.gemini]:      { atk: 649, hp: 5254, def: 694 },
      [HeroStarSign.cancer]:      { atk: 621, hp: 6034, def: 775 },
      [HeroStarSign.leo]:         { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.virgo]:       { atk: 640, hp: 5340, def: 720 },
      [HeroStarSign.libra]:       { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.scorpio]:     { atk: 785, hp: 5077, def: 634 },
      [HeroStarSign.sagittarius]: { atk: 957, hp: 4370, def: 652 },
      [HeroStarSign.capricorn]:   { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.aquarius]:    { atk: 0, hp: 0, def: 0 },
      [HeroStarSign.pisces]:      { atk: 621, hp: 5474, def: 802 },
    },
    [HeroStarGrade.four]: signMap(ZERO),
    [HeroStarGrade.three]: signMap(ZERO),
  },
  [HeroClass.thief]: {
    [HeroStarGrade.five]: {
      [HeroStarSign.aries]:       { atk: 1119, hp: 5380, def: 483 },
      [HeroStarSign.taurus]:      { atk: 1112, hp: 5623, def: 480 },
      [HeroStarSign.gemini]:      { atk: 1089, hp: 5380, def: 511 },
      [HeroStarSign.cancer]:      { atk: 1054, hp: 6606, def: 518 },
      [HeroStarSign.leo]:         { atk: 1283, hp: 5138, def: 522 },
      [HeroStarSign.virgo]:       { atk: 1075, hp: 5562, def: 487 },
      [HeroStarSign.libra]:       { atk: 1208, hp: 5178, def: 508 },
      [HeroStarSign.scorpio]:     { atk: 1228, hp: 6266, def: 473 },
      [HeroStarSign.sagittarius]: { atk: 1158, hp: 5016, def: 532 },
      [HeroStarSign.capricorn]:   { atk: 1057, hp: 5542, def: 532 },
      [HeroStarSign.aquarius]:    { atk: 1003, hp: 5057, def: 511 },
      [HeroStarSign.pisces]:      { atk: 0, hp: 0, def: 0 },
    },
    [HeroStarGrade.four]: signMap(ZERO),
    [HeroStarGrade.three]: signMap(ZERO),
  },
  [HeroClass.common]: {
    [HeroStarGrade.two]:   signMap(ZERO),
    [HeroStarGrade.three]: signMap(ZERO),
    [HeroStarGrade.four]:  signMap(ZERO),
    [HeroStarGrade.five]:  signMap(ZERO),
  },
};

export function getHeroBaseStats(
  heroClass: HeroClass,
  starGrade: HeroStarGrade,
  starSign: HeroStarSign,
): HeroBaseStatEntry | null {
  const entry = HeroBaseStatsTable[heroClass]?.[starGrade]?.[starSign];
  if (!entry || (entry.atk === 0 && entry.hp === 0 && entry.def === 0)) return null;
  return entry;
}
