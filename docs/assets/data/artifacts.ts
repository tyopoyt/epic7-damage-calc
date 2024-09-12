import { Artifact } from "src/app/models/artifact";
import { DamageFormData } from "src/app/models/forms";
import { HeroClass, HeroElement } from "src/app/models/hero";
import { DoT, Skill } from "src/app/models/skill";
import { Heroes } from "./heroes";
import { ArtifactDamageType } from "src/app/models/artifact"

//TODO: add ftene artifact
export const Artifacts: Record<string, Artifact> = {
  noProc: new Artifact({}),
  three_f: new Artifact({
    id: 'three_f',
    name: '3F',
    type: ArtifactDamageType.aftermath,
    artifactSpecific:['casterMaxHP'],
    hpScaling: true,
    hpPercent: 0.09,
    penetrate: 0.7,
    exclusive: HeroClass.knight,
  }),
  air_to_surface_missile_misha: new Artifact({
    id: 'air_to_surface_missile_misha',
    name: 'Air-to-Surface Missile: MISHA',
    scale: [0.15, 0.17, 0.18, 0.2, 0.21, 0.23, 0.24, 0.26, 0.27, 0.29, 0.3],
    type: ArtifactDamageType.critDamageBoost,
    exclusive: HeroClass.ranger,
  }),
  a_little_queens_crown: new Artifact({
    id: 'a_little_queens_crown',
    name: 'A Little Queen\'s Huge Crown',
    scale: [0.16, 0.176, 0.192, 0.208, 0.224, 0.24, 0.256, 0.272, 0.288, 0.304, 0.32],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.warrior,
    // artifactSpecific:[target_has_barrier],
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isSingle(inputValues),
    value: (artiScale: number, inputValues: DamageFormData) => artiScale / (inputValues.targetHasBarrier ? 1 : 2),
  }),
  a_symbol_of_unity: new Artifact({
    id: 'a_symbol_of_unity',
    name: 'A Symbol of Unity',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: ArtifactDamageType.damage
  }),
  an_offer_you_cant_refuse: new Artifact({
    id: 'an_offer_you_cant_refuse',
    name: 'An Offer You Can\'t Refuse',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: ArtifactDamageType.penetrate,
    exclusive: HeroClass.ranger,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isSingle(inputValues),
  }),
  ambrote: new Artifact({
    id: 'ambrote',
    name: 'Ambrote',
    type: ArtifactDamageType.damage,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    exclusive: HeroClass.ranger,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.id === 's1' || skill.s1Benefits,
  }),
  ancient_sheath: new Artifact({
    id: 'ancient_sheath',
    name: 'Ancient Sheath',
    type: ArtifactDamageType.damage,
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    // TODO: check s1_soulburn and s1_extra
    applies: (skill: Skill, inputValues: DamageFormData) => skill.id === 's1' || skill.s1Benefits,
  }),
  black_hand_of_the_goddess: new Artifact({
    id: 'black_hand_of_the_goddess',
    name: 'Black Hand of the Goddess',
    scale: [0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.24],
    type: ArtifactDamageType.critDamageBoost,
    exclusive: HeroClass.mage,
    // TODO: listen to form Maximums for artifacts
    artifactSpecific:['attackSkillStack'],
    artifactSpecificMaximums:{'attackSkillStack': 5},
    value: (artiScale: number, inputValues: DamageFormData) => artiScale - ((artiScale / 10) * inputValues.attackSkillStack),
  }),
  border_coin: new Artifact({
    id: 'border_coin',
    name: 'Border Coin',
    type: ArtifactDamageType.attack,
    scale: [0.075, 0.0825, 0.09, 0.0975, 0.105, 0.1125, 0.12, 0.1275, 0.135, 0.1425, 0.15],
    artifactSpecific:['nonAttackSkillStack'],
    artifactSpecificMaximums:{'nonAttackSkillStack': 3},
    exclusive: HeroClass.warrior,
    value: (artiScale: number, inputValues: DamageFormData) => inputValues.nonAttackSkillStack * artiScale
  }),
  broken_will_of_the_high_priest: new Artifact({
    id: 'broken_will_of_the_high_priest',
    name: 'Broken Will of the High Priest',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: ArtifactDamageType.penetrate,
    exclusive: HeroClass.knight
  }),
  dark_blood_keeper: new Artifact({
    id: 'dark_blood_keeper',
    type: ArtifactDamageType.attack,
    exclusive: HeroClass.thief,
    value: () => 0.15
  }),
  daydream_joker: new Artifact({
    id: 'daydream_joker',
    name: 'Daydream Joker',
    scale: [0.015, 0.0165, 0.018, 0.0195, 0.021, 0.0225, 0.024, 0.0255, 0.027, 0.0285, 0.03],
    type: ArtifactDamageType.flat,
    artifactSpecific:['targetMaxHP'],
    flat: (artiScale: number, inputValues: DamageFormData) => inputValues.targetFinalMaxHP() * artiScale
  }),
  dignus_orb: new Artifact({
    id: 'dignus_orb',
    name: 'Dignus Orb',
    value: () => 0.15,
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.mage,
  }),
  double_edged_decrescent: new Artifact({
    id: 'double_edged_decrescent',
    name: 'Double-Edged Decrescent',
    type: ArtifactDamageType.attack,
    scale: [0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1],
    artifactSpecific:['singleAttackStack'],
    artifactSpecificMaximums:{'singleAttackStack': 3},
    exclusive: HeroClass.thief,
    value: (artiScale: number, inputValues: DamageFormData) => inputValues.singleAttackStack * artiScale
  }),
  draco_plate: new Artifact({
    id: 'draco_plate',
    name: 'Draco Plate',
    scale: [0.15, 0.17, 0.18, 0.2, 0.21, 0.23, 0.24, 0.26, 0.27, 0.29, 0.3],
    type: ArtifactDamageType.critDamageBoost,
    exclusive: HeroClass.warrior
  }),
  dux_noctis: new Artifact({
    id: 'dux_noctis',
    name: 'Dux Noctis',
    type: ArtifactDamageType.attack,
    scale: [0.02, 0.022, 0.024, 0.026, 0.028, 0.03, 0.032, 0.034, 0.036, 0.038, 0.04],
    artifactSpecific:['criticalHitStack'],
    artifactSpecificMaximums:{'criticalHitStack': 6},
    exclusive: HeroClass.ranger,
    value: (artiScale: number, inputValues: DamageFormData) => (artiScale * 3) + (inputValues.criticalHitStack * artiScale)
  }),
  els_fist: new Artifact({
    id: 'els_fist',
    name: 'El\'s Fist',
    type: ArtifactDamageType.attack,
    scale: [0.25, 0.275, 0.3, 0.325, 0.35, 0.375, 0.4, 0.425, 0.45, 0.475, 0.5],
    artifactSpecific:['casterCurrentHPPercent'],
    exclusive: HeroClass.warrior,
    value: (artiScale: number, inputValues: DamageFormData) => {
      if (inputValues.casterCurrentHPPercent < 25) return artiScale;
      if (inputValues.casterCurrentHPPercent < 50) return artiScale * 2 / 3;
      if (inputValues.casterCurrentHPPercent < 75) return artiScale / 3;
      return 0.1;
    }
  }),
  exorcist_tonfa: new Artifact({
    id: 'exorcist_tonfa',
    name: 'Exorcist\'s Tonfa',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: ArtifactDamageType.damage
  }),
  elyha_knife: new Artifact({
    id: 'elyha_knife',
    name: 'Elyha\'s Knife',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: ArtifactDamageType.penetrate,
    exclusive: HeroClass.thief
  }),
  fairy_tale_for_a_nightmare: new Artifact({
    id: 'fairy_tale_for_a_nightmare',
    name: 'Fairy Tale for a Nightmare',
    type: ArtifactDamageType.fixedDamage,
    artifactSpecific: ['extraDualOrCounter'],
    penetrate: 1,
    scale: [750, 825, 900, 975, 1050, 1125, 1200, 1275, 1350, 1425, 1500],
    exclusive: HeroClass.mage,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isExtra || inputValues.extraDualOrCounter,
    value: (artiScale: number, inputValues: DamageFormData) => artiScale
  }),
  frame_of_light: new Artifact({
    id: 'frame_of_light',
    name: 'Frame of Light',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.mage,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isSingle(inputValues),
  }),
  golden_rose: new Artifact({
    id: 'golden_rose',
    name: 'Golden Rose',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.warrior
  }),
  hell_cutter: new Artifact({
    id: 'hell_cutter',
    name: 'Hell Cutter',
    type: ArtifactDamageType.attack,
    scale: [0.02, 0.022, 0.024, 0.026, 0.028, 0.03, 0.032, 0.034, 0.036, 0.038, 0.04],
    artifactSpecific:['turnStack'],
    exclusive: HeroClass.warrior,
    value: (artiScale: number, inputValues: DamageFormData) => inputValues.turnStack * artiScale
  }),
  hostess_of_the_banquet: new Artifact({
    id: 'hostess_of_the_banquet',
    name: 'Hostess of the Banquet',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.thief
  }),
  ignition_cloth_gloves: new Artifact({
    id: 'ignition_cloth_gloves',
    name: 'Ignition Cloth Gloves',
    type: ArtifactDamageType.attack,
    scale: [0.07, 0.077, 0.084, 0.091, 0.098, 0.105, 0.112, 0.119, 0.126, 0.133, 0.14],
    exclusive: HeroClass.mage,
  }),
  iron_fan: new Artifact({
    id: 'iron_fan',
    name: 'Iron Fan',
    scale: [0.16, 0.176, 0.192, 0.208, 0.224, 0.24, 0.256, 0.272, 0.288, 0.304, 0.32],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.ranger,
  }),
  jack_o_symbol: new Artifact({
    id: 'jack_o_symbol',
    name: 'Jack-O\'s Symbol',
    scale: [0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.24],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.warrior,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isSingle(inputValues),
  }),
  junkyard_dog: new Artifact({
    id: 'junkyard_dog',
    name: 'Junkyard Dog',
    type: ArtifactDamageType.dot,
    dot: [DoT.burn],
    exclusive: HeroClass.warrior
  }),
  kaladra: new Artifact({
    id: 'kaladra',
    name: 'Kal\'adra',
    scale: [0.15, 0.17, 0.18, 0.2, 0.21, 0.23, 0.24, 0.26, 0.27, 0.28, 0.3],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.mage
  }),
  last_teatime: new Artifact({
    id: 'last_teatime',
    name: 'Last Teatime',
    scale: [0.07, 0.077, 0.084, 0.091, 0.098, 0.105, 0.112, 0.119, 0.126, 0.133, 0.14],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.mage,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isAOE(inputValues),
  }),
  mature_sunglasses: new Artifact({
    id: 'mature_sunglasses',
    name: 'Mature Sunglasses',
    scale: [0.15, 0.17, 0.18, 0.2, 0.21, 0.23, 0.24, 0.26, 0.27, 0.29, 0.3],
    type: ArtifactDamageType.critDamageBoost,
    exclusive: HeroClass.knight
  }),
  merciless_glutton: new Artifact({
    id: 'merciless_glutton',
    name: 'Merciless Glutton',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.warrior,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isSingle(inputValues),
  }),
  pipette_lance: new Artifact({
    id: 'pipette_lance',
    name: 'Pipette Lance',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.warrior,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isSingle(inputValues),
  }),
  portrait_of_the_saviors: new Artifact({
    id: 'portrait_of_the_saviors',
    name: 'Portrait of the Saviors',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: ArtifactDamageType.damage
  }),
  p_o_s: new Artifact({
    id: 'p_o_s',
    name: 'P.O.S',
    scale: [0.01, 0.011, 0.012, 0.013, 0.014, 0.015, 0.016, 0.017, 0.018, 0.019, 0.02],
    type: ArtifactDamageType.critDamageBoost,
    artifactSpecific:['turnStack'],
    artifactSpecificMaximums:{'turnStack': 10},
    value: (artiScale: number, inputValues: DamageFormData) => inputValues.turnStack * artiScale
  }),
  prayer_of_solitude: new Artifact({
    id: 'prayer_of_solitude',
    name: 'Prayer of Solitude',
    extraAttackBonus: true,
    maxHP: 1.1,
    scale: [0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1],
    value:(artiScale: number, inputValues: DamageFormData, skill: Skill, isExtra: boolean) => (skill.isExtra || isExtra) ? artiScale * 2 : artiScale,
    exclusive: HeroClass.warrior,
    type: ArtifactDamageType.damage
  }),
  prelude_to_a_new_era: new Artifact({
    id: 'prelude_to_a_new_era',
    name: 'Prelude to a New Era',
    value: () => 0.2,
    type: ArtifactDamageType.damage
  }),
  otherworldly_machinery: new Artifact({
    id: 'otherworldly_machinery',
    name: 'Otherworldly Machinery',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.ranger,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isAOE(inputValues),
  }),
  our_beautiful_seasons: new Artifact({
    id: 'our_beautiful_seasons',
    name: 'Our Beautiful Seasons',
    value: () => 0.2,
    type: ArtifactDamageType.damage
  }),
  radiant_forever: new Artifact({
    id: 'radiant_forever',
    name: 'Radiant Forever',
    scale: [0.25, 0.275, 0.3, 0.325, 0.35, 0.375, 0.4, 0.425, 0.45, 0.475, 0.5],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.mage,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isAOE(inputValues)
  }),
  reingar_special_drink: new Artifact({
    id: 'reingar_special_drink',
    name: 'Reingar\'s Special Drink',
    type: ArtifactDamageType.aftermath,
    attackPercent: 0.3,
    penetrate: 0.7,
    exclusive: HeroClass.ranger,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isAOE(inputValues)
  }),
  renewed_will: new Artifact({
    id: 'renewed_will',
    name: 'Renewed Will',
    type: ArtifactDamageType.attack,
    exclusive: HeroClass.ranger,
    scale: [0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1],
  }),
  rocket_punch_gauntlet: new Artifact({
    id: 'rocket_punch_gauntlet',
    name: 'Rocket Punch Gauntlet',
    type: ArtifactDamageType.aftermath,
    artifactSpecific:['casterDefense'],
    defenseScaling: true,
    defensePercent: 1.0,
    penetrate: 0.7,
    exclusive: HeroClass.knight,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isSingle(inputValues),
  }),
  samsara_prayer_beads: new Artifact({
    id: 'samsara_prayer_beads',
    name: 'Samsara Prayer Beads',
    value: () => 0.1,
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.warrior,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isSingle(inputValues),
  }),
  scroll_of_shadows: new Artifact({
    id: 'scroll_of_shadows',
    name: 'Scroll of Shadows',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.mage
  }),
  severed_horn_wand: new Artifact({
    id: 'severed_horn_wand',
    name: 'Severed Horn Wand',
    type: ArtifactDamageType.attack,
    exclusive: HeroClass.mage,
    value: () => 0.15
  }),
  shepherd_of_the_hollow: new Artifact({
    id: 'shepherd_of_the_hollow',
    name: 'Shepherd of the Hollow',
    scale: [0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.24],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.thief,
    artifactSpecific:['casterCurrentHPPercent'],
    value: (artiScale: number, inputValues: DamageFormData) => {
      if (inputValues.casterCurrentHPPercent < 25) return artiScale;
      if (inputValues.casterCurrentHPPercent < 50) return artiScale * 0.83;
      if (inputValues.casterCurrentHPPercent < 75) return artiScale * 0.66;
      return artiScale * 0.5;
    }
  }),
  special_strawberry_cake: new Artifact({
    id: 'special_strawberry_cake',
    name: 'Special Strawberry Cake',
    value: () => 0.2,
    type: ArtifactDamageType.damage
  }),
  sigurd_scythe: new Artifact({
    id: 'sigurd_scythe',
    name: 'Sigurd Scythe',
    type: ArtifactDamageType.attack,
    exclusive: HeroClass.warrior,
    value: () => 0.25
  }),
  spear_of_a_new_dawn: new Artifact({
    id: 'spear_of_a_new_dawn',
    name: 'Spear of a New Dawn',
    type: ArtifactDamageType.aftermath,
    attackPercent: 0.4,
    penetrate: 0.7,
    exclusive: HeroClass.knight,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.id === 's1' || skill.s1Benefits,
  }),
  spear_of_purification: new Artifact({
    id: 'spear_of_purification',
    name: 'Spear of Purification',
    type: ArtifactDamageType.attack,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    exclusive: HeroClass.warrior,
  }),
  star_of_the_deep_sea: new Artifact({
    id: 'star_of_the_deep_sea',
    name: 'Star of the Deep Sea',
    type: ArtifactDamageType.dot,
    dot: [DoT.bomb],
    exclusive: HeroClass.ranger
  }),
  sweet_miracle: new Artifact({
    id: 'sweet_miracle',
    name: 'Sweet Miracle',
    scale: [1.05, 1.055, 1.06, 1.065, 1.07, 1.075, 1.08, 1.085, 1.09, 1.095, 1.1],
    exclusive: HeroClass.warrior,
    type: ArtifactDamageType.health_only
  }),
  sword_of_cycling_seasons: new Artifact({
    id: 'sword_of_cycling_seasons',
    name: 'Sword of Cycling Seasons',
    value: () => 0.25,
    type: ArtifactDamageType.damage,
    heroExclusive: ['adin', 'savior_adin', 'holy_flame_adin', 'serene_purity_adin', 'verdant_adin'],
    applies: (skill: Skill, inputValues: DamageFormData) => {
      return inputValues.elementalAdvantage || skill.elementalAdvantage(inputValues);
    },
  }),
  sword_of_summer_twilight: new Artifact({
    id: 'sword_of_summer_twilight',
    name: 'Sword of Summer Twilight',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: ArtifactDamageType.penetrate,
    exclusive: HeroClass.thief,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isAOE(inputValues),
  }),
  sword_of_winter_shadow: new Artifact({
    id: 'sword_of_winter_shadow',
    name: 'Sword of Winter Shadow',
    type: ArtifactDamageType.attack,
    exclusive: HeroClass.thief,
    value: () => 0.15
  }),
  sword_of_the_morning: new Artifact({
    id: 'sword_of_the_morning',
    name: 'Sword of the Morning',
    type: ArtifactDamageType.attack,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
  }),
  tear_of_the_desert: new Artifact({
    id: 'tear_of_the_desert',
    name: 'Tear of the Desert',
    type: ArtifactDamageType.attack,
    scale: [0.02, 0.022, 0.024, 0.026, 0.028, 0.03, 0.032, 0.034, 0.036, 0.038, 0.04],
    artifactSpecific:['AOEStack'],
    artifactSpecificMaximums:{'AOEStack': 5},
    exclusive: HeroClass.mage,
    value: (artiScale: number, inputValues: DamageFormData) => inputValues.AOEStack * artiScale
  }),
  time_matter: new Artifact({
    id: 'time_matter',
    name: 'Time Matter',
    scale: [0.06, 0.66, 0.072, 0.078, 0.084, 0.09, 0.096, 0.102, 0.108, 0.114, 0.12],
    additional: [0.12, 0.132, 0.144, 0.156, 0.168, 0.18, 0.192, 0.204, 0.216, 0.228, 0.24],
    artifactSpecific:['enemyDefeated'],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.mage,
    value: (artiScale: number, inputValues: DamageFormData) => artiScale + (inputValues.enemyDefeated ? Artifacts.time_matter.additional[Artifacts.time_matter.scale.indexOf(artiScale)] : 0) ,
  }),
  torn_sleeve: new Artifact({
    id: 'torn_sleeve',
    name: 'Torn Sleeve',
    type: ArtifactDamageType.dot,
    dot: [DoT.bleed],
    exclusive: HeroClass.thief
  }),
  tyrants_descent: new Artifact({
    id: 'tyrants_descent',
    name: "Tyrant's Descent",
    artifactSpecific: ['targetNumberOfDebuffs'],
    scale: [0.06, 0.66, 0.072, 0.078, 0.084, 0.09, 0.096, 0.102, 0.108, 0.114, 0.12],
    // TODO: Check additional scaling, is max 24 total or 24 + scale
    additional: [0.18, 0.186, 0.192, 0.198, 0.204, 0.21, 0.216, 0.222, 0.228, 0.234, 0.24],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.warrior,
    value: (artiScale: number, inputValues: DamageFormData) => {
      return artiScale + Math.min(inputValues.targetNumberOfDebuffs * 0.03, Artifacts.tyrants_descent.additional[Artifacts.tyrants_descent.scale.indexOf(artiScale)])
    }
  }),
  uberius_tooth: new Artifact({
    id: 'uberius_tooth',
    name: 'Uberius\'s Tooth',
    type: ArtifactDamageType.aftermath,
    attackPercent: 0.45,
    penetrate: 0.7,
    exclusive: HeroClass.warrior,
    applies: (skill: Skill, inputValues: DamageFormData) => skill.isSingle(inputValues),
  }),
  victorious_flag: new Artifact({
    id: 'victorious_flag',
    name: 'Victorious Flag',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: ArtifactDamageType.damage,
    // info: infoLabel('victorious_flag'),
    applies: (skill: Skill, inputValues: DamageFormData) => {
      const hero = Heroes[inputValues.heroID];

      return !(hero.element === HeroElement.dark || hero.element === HeroElement.light);
    }
  }),
  violet_talisman: new Artifact({
    id: 'violet_talisman',
    name: 'Violet Talisman',
    type: ArtifactDamageType.attack,
    scale: [0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1],
    artifactSpecific:['turnStack'],
    artifactSpecificMaximums:{'turnStack': 3},
    exclusive: HeroClass.thief,
    value: (artiScale: number, inputValues: DamageFormData) => inputValues.turnStack * artiScale
  }),
  wind_rider: new Artifact({
    id: 'wind_rider',
    name: 'Wind Rider',
    type: ArtifactDamageType.attack,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    additional: [0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4],
    exclusive: HeroClass.thief,
    artifactSpecific:['enemyDefeated'],
    value: (artiScale: number, inputValues: DamageFormData) => {
      return artiScale + (inputValues.enemyDefeated ? Artifacts.wind_rider.additional[Artifacts.wind_rider.scale.indexOf(artiScale)] : 0);
    }
  }),
  wings_of_light_and_shadow: new Artifact({
    id: 'wings_of_light_and_shadow',
    name: 'Wings of Light and Shadow',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: ArtifactDamageType.damage,
    exclusive: HeroClass.knight,
  }),
};