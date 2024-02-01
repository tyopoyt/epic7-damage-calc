const artifactDmgType = {
  damage: 'damage',
  penetrate: 'penetrate',
  aftermath: 'aftermath',
  attack: 'attack',
  critDmgBoost: 'crit-dmg-boost',
  fixedDamage: 'fixedDamage',
  flat: 'flat',
  dot: 'dot',
  health_only: 'health_only'
};

const artifacts = {
  air_to_surface_missile_misha: {
    id: 'air_to_surface_missile_misha',
    name: 'Air-to-Surface Missile: MISHA',
    scale: [0.15, 0.17, 0.18, 0.2, 0.21, 0.23, 0.24, 0.26, 0.27, 0.29, 0.3],
    type: artifactDmgType.critDmgBoost,
    exclusive: classType.ranger,
  },
  a_little_queens_crown: {
    id: 'a_little_queens_crown',
    name: 'A Little Queen\'s Huge Crown',
    scale: [0.16, 0.176, 0.192, 0.208, 0.224, 0.24, 0.256, 0.272, 0.288, 0.304, 0.32],
    type: artifactDmgType.damage,
    exclusive: classType.warrior,
    form: [elements.target_has_barrier],
    applies: (skill) => getSkillType(skill) === skillTypes.single,
    value: (artiScale) => artiScale / (elements.target_has_barrier.value() ? 1 : 2),
  },
  a_symbol_of_unity: {
    id: 'a_symbol_of_unity',
    name: 'A Symbol of Unity',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage
  },
  an_offer_you_cant_refuse: {
    id: 'an_offer_you_cant_refuse',
    name: 'An Offer You Can\'t Refuse',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: artifactDmgType.penetrate,
    exclusive: classType.ranger,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  ambrote: {
    id: 'ambrote',
    name: 'Ambrote',
    type: artifactDmgType.damage,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    exclusive: classType.ranger,
    applies: (skill, skillId) => skillId === 's1' || skill.s1_benefits,
  },
  ancient_sheath: {
    id: 'ancient_sheath',
    name: 'Ancient Sheath',
    type: artifactDmgType.damage,
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    applies: (skill, skillId) => skillId === 's1' || skill.s1_benefits,
  },
  black_hand_of_the_goddess: {
    id: 'black_hand_of_the_goddess',
    name: 'Black Hand of the Goddess',
    scale: [0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.24],
    type: artifactDmgType.critDmgBoost,
    exclusive: classType.mage,
    form: [elements.attack_skill_stack_5],
    value: (artiScale) => artiScale - ((artiScale / 10) * elements.attack_skill_stack_5.value()),
  },
  border_coin: {
    id: 'border_coin',
    name: 'Border Coin',
    type: artifactDmgType.attack,
    scale: [0.075, 0.0825, 0.09, 0.0975, 0.105, 0.1125, 0.12, 0.1275, 0.135, 0.1425, 0.15],
    form: [elements.non_attack_skill_stack_3],
    exclusive: classType.warrior,
    value: (artiScale) => elements.non_attack_skill_stack_3.value() * artiScale
  },
  broken_will_of_the_priest: {
    id: 'broken_will_of_the_priest',
    name: 'Broken Will of the Priest',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.penetrate,
    exclusive: classType.knight
  },
  daydream_joker: {
    id: 'daydream_joker',
    name: 'Daydream Joker',
    scale: [0.015, 0.0165, 0.018, 0.0195, 0.021, 0.0225, 0.024, 0.0255, 0.027, 0.0285, 0.03],
    type: artifactDmgType.flat,
    form: [elements.target_max_hp],
    flat: (artiScale) => elements.target_max_hp.value() * artiScale
  },
  dignus_orb: {
    id: 'dignus_orb',
    name: 'Dignus Orb',
    value: 0.15,
    type: artifactDmgType.damage,
    exclusive: classType.mage,
  },
  double_edged_decrescent: {
    id: 'double_edged_decrescent',
    name: 'Double-Edged Decrescent',
    type: artifactDmgType.attack,
    scale: [0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1],
    form: [elements.single_attack_stack_3],
    exclusive: classType.thief,
    value: (artiScale) => elements.single_attack_stack_3.value() * artiScale
  },
  draco_plate: {
    id: 'draco_plate',
    name: 'Draco Plate',
    scale: [0.15, 0.17, 0.18, 0.2, 0.21, 0.23, 0.24, 0.26, 0.27, 0.29, 0.3],
    type: artifactDmgType.critDmgBoost,
    exclusive: classType.warrior
  },
  dux_noctis: {
    id: 'dux_noctis',
    name: 'Dux Noctis',
    type: artifactDmgType.attack,
    scale: [0.02, 0.022, 0.024, 0.026, 0.028, 0.03, 0.032, 0.034, 0.036, 0.038, 0.04],
    form: [elements.critical_hit_stack_6],
    exclusive: classType.ranger,
    value: (artiScale) => (artiScale * 3) + (elements.critical_hit_stack_6.value() * artiScale)
  },
  els_fist: {
    id: 'els_fist',
    name: 'El\'s Fist',
    type: artifactDmgType.attack,
    scale: [0.25, 0.275, 0.3, 0.325, 0.35, 0.375, 0.4, 0.425, 0.45, 0.475, 0.5],
    form: [elements.caster_hp_pc],
    exclusive: classType.warrior,
    value: (artiScale) => {
      if (elements.caster_hp_pc.value() < 25) return artiScale;
      if (elements.caster_hp_pc.value() < 50) return artiScale * 2 / 3;
      if (elements.caster_hp_pc.value() < 75) return artiScale / 3;
      return 0.1;
    }
  },
  exorcist_tonfa: {
    id: 'exorcist_tonfa',
    name: 'Exorcist\'s Tonfa',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage
  },
  elyha_knife: {
    id: 'elyha_knife',
    name: 'Elyha\'s Knife',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: artifactDmgType.penetrate,
    exclusive: classType.thief
  },
  //TODO: translate and add announcement/changelog
  fairy_tale_for_a_nightmare: {
    id: 'fairy_tale_for_a_nightmare',
    name: 'Fairy Tale for a Nightmare',
    type: artifactDmgType.fixedDamage,
    form: [elements.extra_dual_or_counter],
    penetrate: 1,
    scale: [750, 825, 900, 975, 1050, 1125, 1200, 1275, 1350, 1425, 1500],
    exclusive: classType.mage,
    applies: (skill) => skill.isExtra || elements.extra_dual_or_counter.value(),
    value: () => {
      const artiScale = Math.floor(Number(document.getElementById('artifact-lvl')?.value || '30') / 3)
      return artifacts['fairy_tale_for_a_nightmare'].scale[artiScale];
    }
  },
  frame_of_light: {
    id: 'frame_of_light',
    name: 'Frame of Light',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    exclusive: classType.mage,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  golden_rose: {
    id: 'golden_rose',
    name: 'Golden Rose',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    exclusive: classType.warrior
  },
  hell_cutter: {
    id: 'hell_cutter',
    name: 'Hell Cutter',
    type: artifactDmgType.attack,
    scale: [0.02, 0.022, 0.024, 0.026, 0.028, 0.03, 0.032, 0.034, 0.036, 0.038, 0.04],
    form: [elements.turn_stack],
    exclusive: classType.warrior,
    value: (artiScale) => elements.turn_stack.value() * artiScale
  },
  hostess_of_the_banquet: {
    id: 'hostess_of_the_banquet',
    name: 'Hostess of the Banquet',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    exclusive: classType.thief,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  ignition_cloth_gloves: {
    id: 'ignition_cloth_gloves',
    name: 'Ignition Cloth Gloves',
    type: artifactDmgType.attack,
    scale: [0.07, 0.077, 0.084, 0.091, 0.098, 0.105, 0.112, 0.119, 0.126, 0.133, 0.14],
    exclusive: classType.mage,
  },
  iron_fan: {
    id: 'iron_fan',
    name: 'Iron Fan',
    scale: [0.16, 0.176, 0.192, 0.208, 0.224, 0.24, 0.256, 0.272, 0.288, 0.304, 0.32],
    type: artifactDmgType.damage,
    exclusive: classType.ranger,
  },
  jack_o_symbol: {
    id: 'jack_o_symbol',
    name: 'Jack-O\'s Symbol',
    scale: [0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.24],
    type: artifactDmgType.damage,
    exclusive: classType.warrior,
    applies: (skill) => (getSkillType(skill) === skillTypes.single) && elements.target_has_debuff.value() !== false,
  },
  junkyard_dog:{
    id: 'junkyard_dog',
    name: 'Junkyard Dog',
    type: artifactDmgType.dot,
    dot: [dot.burn],
    exclusive: classType.warrior
  },
  kaladra: {
    id: 'kaladra',
    name: 'Kal\'adra',
    scale: [0.15, 0.17, 0.18, 0.2, 0.21, 0.23, 0.24, 0.26, 0.27, 0.28, 0.3],
    type: artifactDmgType.damage,
    exclusive: classType.mage
  },
  last_teatime: {
    id: 'last_teatime',
    name: 'Last Teatime',
    scale: [0.07, 0.077, 0.084, 0.091, 0.098, 0.105, 0.112, 0.119, 0.126, 0.133, 0.14],
    type: artifactDmgType.damage,
    exclusive: classType.mage,
    applies: (skill) => getSkillType(skill) === skillTypes.aoe,
  },
  mature_sunglasses: {
    id: 'mature_sunglasses',
    name: 'Mature Sunglasses',
    scale: [0.15, 0.17, 0.18, 0.2, 0.21, 0.23, 0.24, 0.26, 0.27, 0.29, 0.3],
    type: artifactDmgType.critDmgBoost,
    exclusive: classType.knight
  },
  merciless_glutton: {
    id: 'merciless_glutton',
    name: 'Merciless Glutton',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    exclusive: classType.warrior,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  portrait_of_the_saviors: {
    id: 'portrait_of_the_saviors',
    name: 'Portrait of the Saviors',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: artifactDmgType.damage
  },
  p_o_s: {
    id: 'p_o_s',
    name: 'P.O.S',
    scale: [0.01, 0.011, 0.012, 0.013, 0.014, 0.015, 0.016, 0.017, 0.018, 0.019, 0.02],
    type: artifactDmgType.critDmgBoost,
    form: [elements.turn_stack_10],
    value: (artiScale) => elements.turn_stack_10.value() * artiScale
  },
  prayer_of_solitude: {
    id: 'prayer_of_solitude',
    name: 'Prayer of Solitude',
    extraAttack: true,
    maxHP: 1.1,
    scale: [0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1],
    value:(artiScale, skill, isExtra) => (skill.isExtra || isExtra) ? artiScale * 2 : artiScale,
    exclusive: classType.warrior,
    type: artifactDmgType.damage
  },
  prelude_to_a_new_era: {
    id: 'prelude_to_a_new_era',
    name: 'Prelude to a New Era',
    value: 0.2,
    type: artifactDmgType.damage
  },
  otherworldly_machinery: {
    id: 'otherworldly_machinery',
    name: 'Otherworldly Machinery',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    exclusive: classType.ranger,
    applies: (skill) => getSkillType(skill) === skillTypes.aoe,
  },
  our_beautiful_seasons: {
    id: 'our_beautiful_seasons',
    name: 'Our Beautiful Seasons',
    value: 0.2,
    type: artifactDmgType.damage
  },
  radiant_forever: {
    id: 'radiant_forever',
    name: 'Radiant Forever',
    scale: [0.25, 0.275, 0.3, 0.325, 0.35, 0.375, 0.4, 0.425, 0.45, 0.475, 0.5],
    type: artifactDmgType.damage,
    exclusive: classType.mage,
    applies: (skill) => getSkillType(skill) === skillTypes.aoe
  },
  reingar_special_drink: {
    id: 'reingar_special_drink',
    name: 'Reingar\'s Special Drink',
    type: artifactDmgType.aftermath,
    atkPercent: 0.3,
    penetrate: 0.7,
    exclusive: classType.ranger,
    applies: (skill) => getSkillType(skill) === skillTypes.aoe
  },
  rocket_punch_gauntlet: {
    id: 'rocket_punch_gauntlet',
    name: 'Rocket Punch Gauntlet',
    type: artifactDmgType.aftermath,
    form: [elements.caster_defense],
    defenseScaling: true,
    defPercent: 1.0,
    penetrate: 0.7,
    exclusive: classType.knight,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  samsara_prayer_beads: {
    id: 'samsara_prayer_beads',
    name: 'Samsara Prayer Beads',
    value: 0.1,
    type: artifactDmgType.damage,
    exclusive: classType.warrior,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  scroll_of_shadows: {
    id: 'scroll_of_shadows',
    name: 'Scroll of Shadows',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    exclusive: classType.mage
  },
  severed_horn_wand: {
    id: 'severed_horn_wand',
    name: 'Severed Horn Wand',
    type: artifactDmgType.attack,
    exclusive: classType.mage,
    value: () => 0.15
  },
  shepherd_of_the_hollow: {
    id: 'shepherd_of_the_hollow',
    name: 'Shepherd of the Hollow',
    scale: [0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.24],
    type: artifactDmgType.damage,
    exclusive: classType.thief,
    form: [elements.caster_hp_pc],
    value: (artiScale) => {
      if (elements.caster_hp_pc.value() < 25) return artiScale;
      if (elements.caster_hp_pc.value() < 50) return artiScale * 0.83;
      if (elements.caster_hp_pc.value() < 75) return artiScale * 0.66;
      return artiScale * 0.5;
    }
  },
  sigurd_scythe: {
    id: 'sigurd_scythe',
    name: 'Sigurd Scythe',
    type: artifactDmgType.attack,
    exclusive: classType.warrior,
    value: () => 0.25
  },
  spear_of_a_new_dawn: {
    id: 'spear_of_a_new_dawn',
    name: 'Spear of a New Dawn',
    type: artifactDmgType.aftermath,
    atkPercent: 0.4,
    penetrate: 0.7,
    exclusive: classType.knight,
    applies: (skill, skillId) => skillId === 's1' || skill.s1_benefits,
  },
  spear_of_purification: {
    id: 'spear_of_purification',
    name: 'Spear of Purification',
    type: artifactDmgType.attack,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    exclusive: classType.warrior,
  },
  star_of_the_deep_sea:{
    id: 'star_of_the_deep_sea',
    name: 'Star of the Deep Sea',
    type: artifactDmgType.dot,
    dot: [dot.bomb],
    exclusive: classType.ranger
  },
  sweet_miracle: {
    id: 'sweet_miracle',
    name: 'Sweet Miracle',
    maxHP: 1.1,
    scale: [1.05, 1.055, 1.06, 1.065, 1.07, 1.075, 1.08, 1.085, 1.09, 1.095, 1.1],
    exclusive: classType.warrior,
    type: artifactDmgType.health_only
  },
  sword_of_cycling_seasons: {
    id: 'sword_of_cycling_seasons',
    name: 'Sword of Cycling Seasons',
    value: 0.25,
    type: artifactDmgType.damage,
    hero_exclusive: [heroes.savior_adin.name, heroes.adin.name, heroes.holy_flame_adin.name, heroes.serene_purity_adin.name, heroes.verdant_adin.name],
    applies: (skill) => {
      return document.getElementById('elem-adv').checked || ((skill.elemAdv !== undefined) && skill.elemAdv() === true);
    },
  },
  sword_of_summer_twilight: {
    id: 'sword_of_summer_twilight',
    name: 'Sword of Summer Twilight',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: artifactDmgType.penetrate,
    exclusive: classType.thief,
    applies: (skill) => getSkillType(skill) === skillTypes.aoe,
  },
  sword_of_winter_shadow: {
    id: 'sword_of_winter_shadow',
    name: 'Sword of Winter Shadow',
    type: artifactDmgType.attack,
    exclusive: classType.thief,
    value: () => 0.15
  },
  sword_of_the_morning: {
    id: 'sword_of_the_morning',
    name: 'Sword of the Morning',
    type: artifactDmgType.attack,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
  },
  tear_of_the_desert: {
    id: 'tear_of_the_desert',
    name: 'Tear of the Desert',
    type: artifactDmgType.attack,
    scale: [0.02, 0.022, 0.024, 0.026, 0.028, 0.03, 0.032, 0.034, 0.036, 0.038, 0.04],
    form: [elements.aoe_stack_5],
    exclusive: classType.mage,
    value: (artiScale) => elements.aoe_stack_5.value() * artiScale
  },
  time_matter: {
    id: 'time_matter',
    name: 'Time Matter',
    form: [elements.enemy_defeated],
    scale: [0.06, 0.66, 0.072, 0.078, 0.084, 0.09, 0.096, 0.102, 0.108, 0.114, 0.12],
    additional: [0.12, 0.132, 0.144, 0.156, 0.168, 0.18, 0.192, 0.204, 0.216, 0.228, 0.24],
    type: artifactDmgType.damage,
    exclusive: classType.mage,
    value: (input) => {
      return input + (elements.enemy_defeated.value() ? artifacts.time_matter.additional[artifacts.time_matter.scale.indexOf(input)] : 0);
    }
  },
  torn_sleeve:{
    id: 'torn_sleeve',
    name: 'Torn Sleeve',
    type: artifactDmgType.dot,
    dot: [dot.bleed],
    exclusive: classType.thief
  },
  tyrants_descent: {
    id: 'tyrants_descent',
    name: "Tyrant's Descent",
    form: [elements.target_nb_debuff],
    scale: [0.06, 0.66, 0.072, 0.078, 0.084, 0.09, 0.096, 0.102, 0.108, 0.114, 0.12],
    // TODO: Check additional scaling
    additional: [0.18, 0.186, 0.192, 0.198, 0.204, 0.21, 0.216, 0.222, 0.228, 0.234, 0.24],
    type: artifactDmgType.damage,
    exclusive: classType.warrior,
    value: (artiScale) => {
      return artiScale + Math.min(elements.target_nb_debuff.value() * 0.03, artifacts.tyrants_descent.additional[artifacts.tyrants_descent.scale.indexOf(artiScale)])
    }
  },
  uberius_tooth: {
    id: 'uberius_tooth',
    name: 'Uberius\'s Tooth',
    type: artifactDmgType.aftermath,
    atkPercent: 0.45,
    penetrate: 0.7,
    exclusive: classType.warrior,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  victorious_flag: {
    id: 'victorious_flag',
    name: 'Victorious Flag',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    info: infoLabel('victorious_flag'),
    applies: (skill) => {
      const hero = heroes[document.getElementById('hero').value];
      if (hero.element === element.dark || hero.element === element.light) return false;

      return (document.getElementById('elem-adv').checked || ((skill.elemAdv !== undefined) && skill.elemAdv() === true));
    }
  },
  violet_talisman: {
    id: 'violet_talisman',
    name: 'Violet Talisman',
    type: artifactDmgType.attack,
    scale: [0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1],
    form: [elements.turn_stack_3],
    exclusive: classType.thief,
    value: (artiScale) => elements.turn_stack_3.value() * artiScale
  },
  wind_rider: {
    id: 'wind_rider',
    name: 'Wind Rider',
    type: artifactDmgType.attack,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    additional: [0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4],
    exclusive: classType.thief,
    form: [elements.enemy_defeated],
    value: (input) => {
      return input + (elements.enemy_defeated.value() ? artifacts.wind_rider.additional[artifacts.wind_rider.scale.indexOf(input)] : 0);
    }
  },
  wings_of_light_and_shadow: {
    id: 'wings_of_light_and_shadow',
    name: 'Wings of Light and Shadow',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: artifactDmgType.damage,
    exclusive: classType.knight,
  },
};