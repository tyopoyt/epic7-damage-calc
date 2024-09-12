// architect_laika_old: {
  //   name: 'Architect Laika (Pre-Balance)',
  //   element: HeroElement.light,
  //   class: HeroClass.mage,
  //   baseAttack: 1306,
  //   heroSpecific: ['casterSpeed'],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 1,
  //       pow: () => 0.9,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.15],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.9,
  //       pow: () => 0.9,
  //       penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.targetTargeted ? 0.8 : 0,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001125,
  //       multTip: () => ({ casterSpeed: 0.1125 }),
  //       enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.15],
  //       noTrans: true,
  //       isAOE: () => true,
  //     }
  //   }
  // },

  // arunka_old: {
  //   name: 'Arunka (Pre-Balance)',
  //   element: HeroElement.earth,
  //   class: HeroClass.warrior,
  //   baseAttack: 1570,
  //   baseHP: 6488,
  //   baseDefense: 616,
  //   heroSpecific: ['targetHasBarrier'],
  //   dot: [DoT.bleed],
  //   innateAtkUp: () => 0.30,
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //       noCrit: true,
  //     },
  //     s1_bis: {
  //     //       rate: () => 1.3,
  //       pow: () => 1.3,
  //       // enhanceFrom: 's1', Presumed not to inherit from s1 mola since the pow is so high already
  //       isSingle: () => true,
  //       noCrit: true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.9,
  //       pow: () => 1,
  //       penetrate: () => 0.7,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasBarrier ? 2.2 : 1,
  //       multTip: () => ({ targetHasBarrier: 120 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //       noCrit: true,
  //     },
  //   }
  // },

    // bad_cat_armin_old: {
  //   name: 'Bad Cat Armin (Pre-Balance)',
  //   element: HeroElement.dark,
  //   class: HeroClass.warrior,
  //   baseAttack: 912,
  //   heroSpecific: ['casterMaxHP'],
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact)*0.15,
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.9,
  //       pow: () => 1,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.06,
  //       flatTip: () => ({ casterMaxHP: 6 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isAOE: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1.3,
  //       pow: () => 1,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.2,
  //       flatTip: () => ({ casterMaxHP: 20 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //   }
  // },

    // briar_witch_iseria_old: {
  //   name: 'Briar Witch Iseria (Pre-Balance)',
  //   element: HeroElement.dark,
  //   class: HeroClass.ranger,
  //   baseAttack: 1182,
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.85,
  //       pow: () => 1,
  //       afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? { attackPercent: 0.3 } : null,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.2 : 0.95,
  //       pow: () => 1.1,
  //       afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? { attackPercent: 0.3 } : null,
  //       enhance: [0.05, 0, 0, 0, 0.15],
  //       isAOE: () => true,
  //     }
  //   }
  // },

    // celine_old: {
  //   name: 'Celine (Pre-Balance)',
  //   element: HeroElement.earth,
  //   class: HeroClass.thief,
  //   heroSpecific: ['exclusiveEquipment2', 'exclusiveEquipment3'],
  //   baseAttack: 1228,
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAtk()*0.5,
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 1,
  //       pow: () => 1,
  //       critDmgBoost: () => 0.2,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       rate: () => 1.4,
  //       pow: () => 1,
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       noTrans: true,
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 2.3 : 1.8,
  //       pow: () => 1,
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     }
  //   }
  // },

  // chaos_sect_axe_old: {
  //   name: 'Chaos Sect Axe (Pre-Balance)',
  //   element: HeroElement.dark,
  //   class: HeroClass.warrior,
  //   baseAttack: 1144,
  //   heroSpecific: ['casterMaxHP', casterAttackedStack_5],
  //   dot: [DoT.bleed],
  //   atkUp: () => 1 + casterAttackedStack_5.value()*0.06,
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.85,
  //       pow: () => 0.95,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.04,
  //       flatTip: () => ({ casterMaxHP: 4 }),
  //       enhance: [0.05, 0.05, 0.1, 0.15],
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       rate: () => 0.75,
  //       pow: () => 0.95,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.05,
  //       flatTip: () => ({ casterMaxHP: 5 }),
  //       enhance: [0.05, 0.05, 0.1, 0.15],
  //       isAOE: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1.2,
  //       pow: () => 0.9,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.1,
  //       flatTip: () => ({ casterMaxHP: 10 }),
  //       penetrate: () => document.getElementById(`elem-adv`).checked ? 0.4 : 0,
  //       enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
  //       isSingle: () => true,
  //     }
  //   }
  // },

    // hwayoung_old: {
  //   name: 'Hwayoung (Pre-Balance)',
  //   element: HeroElement.fire,
  //   class: HeroClass.warrior,
  //   baseAttack: 1510,
  //   heroSpecific: ['casterBuffed', casterMaxHP, 'targetMaxHP'],
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAtk()*0.45,
  //   innateAtkUp: () => {
  //     let boost = 0.35;
  //     for (let i = 0; i < Number(document.getElementById(`molagora-s2`).value); i++) {
  //       boost += heroes.hwayoung.skills.s2.enhance[i];
  //     }
  //     return boost;
  //   },
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.6,
  //       pow: () => 1,
  //       afterMath: (hitType: HitType, inputValues: DamageFormData) => inputValues.casterBuffed ? ({ attackPercent: 0.5 }) : null,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       isSingle: () => true,
  //       noCrit: true,
  //     },
  //     s2: new Skill({
  //       enhance: [0.02, 0.03, 0.03, 0.03, 0.04],
  //     },
  //     s3: new Skill({
  //       rate: () => 0.55,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) < inputValues.targetFinalMaxHP()
  //           ? 1 + Math.min((inputValues.targetFinalMaxHP() - inputValues.casterFinalMaxHP(artifact))*0.00015, 1)
  //           : 1,
  //       multTip: () => ({ caster_vs_target_hp_diff: 15 }),
  //       penetrate: () => 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //       noCrit: true,
  //     },
  //   }
  // },

    // ilynav_old: {
  //   name: 'Ilynav (Pre-Balance)',
  //   element: HeroElement.fire,
  //   class: HeroClass.knight,
  //   baseAttack: 957,
  //   heroSpecific: ['casterMaxHP'],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.7,
  //       pow: () => 1,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.08,
  //       flatTip: () => ({ casterMaxHP: 8 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       rate: () => 1,
  //       pow: () => 1,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.18,
  //       flatTip: () => ({ casterMaxHP: 18 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.7,
  //       pow: () => 1,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.12,
  //       flatTip: () => ({ casterMaxHP: 12 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isAOE: () => true,
  //     }
  //   }
  // },

    // jack_o_old: {
  //   name: 'Jack-O\' (Pre-Balance)',
  //   element: HeroElement.fire,
  //   class: HeroClass.warrior,
  //   heroSpecific: ['targetHasDebuff'],
  //   baseAttack: 1228,
  //   baseHP: 5784,
  //   baseDefense: 553,
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.75,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //     s1_extra: {
  //     //       rate: () => 1.1,
  //       pow: () => 1,
  //       enhanceFrom: 's1',
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.95,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasDebuff ? 1.3 : 1,
  //       multTip: () => ({ targetHasDebuff: 30 }),
  //       penetrate: () => 0.5,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     }
  //   }
  // },

    // jena_old: {
  //   name: 'Jena (Pre-Balance)',
  //   element: HeroElement.ice,
  //   class: HeroClass.mage,
  //   baseAttack: 1063,
  //   heroSpecific: ['targetNumberOfDebuffs'],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 1,
  //       pow: () => 0.95,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.targetNumberOfDebuffs*0.1,
  //       multTip: () => ({ per_target_debuff: 10 }),
  //       enhance: [0.05, 0.05, 0.1, 0.15],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.1 : 0.85,
  //       pow: () => 0.95,
  //       enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
  //       isAOE: () => true,
  //     }
  //   }
  // },

    // kise_old: {
  //   name: 'Kise (Pre-Balance)',
  //   element: HeroElement.ice,
  //   class: HeroClass.thief,
  //   baseAttack: 1283,
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAtk() * 0.5,
  //   heroSpecific: [targetHasBuff, casterHasStealth, casterCurrentHPPercent, 'exclusiveEquipment2'],
  //   skills: {
  //     s1: new Skill({
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.4 : 1.1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
  //       mult: (soulburn: boolean) => {
  //         if (!inputValues.targetHasBuff) return 1;

  //         return soulburn ? 2 : 1.7;
  //       },
  //       multTip: (soulburn: boolean) => ({ target_debuff: soulburn ? 100 : 70 }),
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       rate: () => 0.8,
  //       pow: () => 1,
  //       penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterHasStealth ? 0.6 : 0.3,
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isAOE: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1.6,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterCurrentHPPercent*0.0035,
  //       multTip: () => ({ caster_left_hp_pc: 0.35 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     }
  //   }
  // },

    // last_rider_krau_old: {
  //   name: 'Last Rider Krau (Pre-Balance)',
  //   element: HeroElement.light,
  //   class: HeroClass.knight,
  //   baseAttack: 839,
  //   heroSpecific: ['casterMaxHP', 'attackSkillStack'],
  //   heroSpecificMaximums: {'attackSkillStack': 3},
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact)*0.07,
  //   barrierEnhance: 's2',
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.7,
  //       pow: () => 1,
  //       flat: () => 0.1*inputValues.casterFinalMaxHP(artifact),
  //       flatTip: () => ({ casterMaxHP: 10 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
  //     },
  //     s3: new Skill({
  //       noCrit: true,
  //       rate: () => 0.3,
  //       pow: () => 1,
  //       flat: () => 0.06*inputValues.casterFinalMaxHP(artifact),
  //       flatTip: () => ({ casterMaxHP: 6 }),
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.attackSkillStack*0.2,
  //       multTip: () => ({ per_stack: 20 }),
  //       penetrate: () => 1.0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isAOE: () => true,
  //     }
  //   }
  // },

    // lilias_old: {
  //   name: 'Lilias (Pre-Balance)',
  //   element: HeroElement.fire,
  //   class: HeroClass.knight,
  //   baseAttack: 821,
  //   heroSpecific: ['casterMaxHP', highest_ally_attack],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.8,
  //       pow: () => 0.95,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.12,
  //       flatTip: () => ({ casterMaxHP: 12 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.9,
  //       pow: () => 1,
  //       atk: () => inputValues.highestAllyAttack,
  //       noBuff: true,
  //       enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
  //       isAOE: () => true,
  //     }
  //   }
  // },

    // lionheart_cermia_old: new Hero({
  //   element: HeroElement.light,
  //   class: HeroClass.warrior,
  //   baseAttack: 966,
  //   baseDefense: 668,
  //   baseHP: 5663,
  //   heroSpecific: ['casterDefense'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       defenseScaling: true,
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1 : 0.6,
  //       pow: () => 0.9,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * (soulburn ? 1.6 : 1.0),
  //       flatTip: (soulburn: boolean) => ({ casterDefense: (soulburn ? 160 : 100) }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       defenseScaling: true,
  //       rate: () => 0.3,
  //       pow: () => 0.9,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 1.35,
  //       flatTip: () => ({ casterDefense: 135 }),
  //       penetrate: () => 0.5,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       isAOE: () => true,
  //     }),
  //   }
  // }),

    // little_queen_charlotte_old: {
  //   name: 'Little Queen Charlotte (Pre-Balance)',
  //   element: HeroElement.light,
  //   class: HeroClass.warrior,
  //   baseAttack: 1119,
  //   baseHP: 6266,
  //   baseDefense: 627,
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 1.2,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1.5,
  //       pow: () => 1,
  //       mult: () => elementalAdvantage ? 1.3 : 1,
  //       multTip: () => ({ elementalAdvantage: 30 }),
  //       penetrate: () => 0.5,
  //       enhance: [0.05, 0.05, 0, 0.05, 0.15],
  //       isSingle: () => true,
  //     },
  //     s3_splash: {
  //     //       rate: () => 0,
  //       pow: () => 0,
  //       afterMath: () => elementalAdvantage ? { attackPercent: 1.2 } : null,
  //       noCrit: true,
  //       noMiss: true,
  //     }
  //   }
  // },

    // melissa_old: {
  //   name: 'Melissa (Pre-Balance)',
  //   element: HeroElement.fire,
  //   class: HeroClass.mage,
  //   baseAttack: 1412,
  //   heroSpecific: ['casterCurrentHPPercent', 'exclusiveEquipment2'],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 1,
  //       pow: () => 1.1,
  //       mult: () => 1 + (100-inputValues.casterCurrentHPPercent)*0.0035,
  //       multTip: () => ({ caster_lost_hp_pc: 0.35 }),
  //       enhance: [0.05, 0, 0.05, 0, 0.1],
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       rate: () => 1.5,
  //       pow: () => 0.95,
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1.2,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     }
  //   }
  // },

    // mui_old: {
  //   name: 'Mui (Pre-Balance)',
  //   element: HeroElement.earth,
  //   class: HeroClass.warrior,
  //   baseAttack: 1039,
  //   dot: [DoT.bleed],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       rate: () => 1,
  //       pow: () => 0.9,
  //       enhance: [0.05, 0, 0, 0.1, 0.15],
  //       isAOE: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1,
  //       pow: () => 0.95,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.15],
  //       isAOE: () => true,
  //     }
  //   }
  // },

    // sez_old: {
  //   name: 'Sez (Pre-Balance)',
  //   element: HeroElement.ice,
  //   class: HeroClass.thief,
  //   baseAttack: 1228,
  //   heroSpecific: ['targetCurrentHPPercent'],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 1,
  //       pow: () => 0.95,
  //       mult: () => 1 + (100-inputValues.targetCurrentHPPercent)*0.002,
  //       multTip: () => ({ target_lost_hp_pc: 0.2 }),
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       rate: () => 0.5,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isAOE: () => true,
  //     },
  //     s3: new Skill({
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 3.2 : 1.8,
  //       pow: () => 0.95,
  //       mult: (soulburn: boolean) => 1 + (100-inputValues.targetCurrentHPPercent)*(soulburn ? 0.007 : 0.003),
  //       multTip: (soulburn: boolean) => ({ target_lost_hp_pc: soulburn ? 0.7 : 0.3 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.15],
  //       isSingle: () => true,
  //     },
  //     explosion: {
  //     //       rate: () => 0,
  //       pow: () => 0,
  //       afterMath: () => ({ attackPercent: 1.5 }),
  //       noCrit: true,
  //       noMiss: true,
  //     }
  //   }
  // },

    // silk_old: new Hero({
  //   element: HeroElement.earth,
  //   class: HeroClass.ranger,
  //   baseAttack: 1188,
  //   baseHP: 4693,
  //   baseDefense: 518,
  //   heroSpecific: ['casterSpeed', 'casterFocus'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       speedScaling: true,
  //       rate: () => 0.9,
  //       pow: () => 0.9,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
  //       multTip: () => ({ casterSpeed: 0.075 }),
  //       enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s1_bis: new Skill({
  //       id: 's1_bis',
  //       s1Benefits: true,
  //       speedScaling: true,
  //       rate: () => 1.25,
  //       pow: () => 0.9,
  //       penetrate: () => 0.2,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
  //       multTip: () => ({ casterSpeed: 0.075 }),
  //       enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 0.95,
  //       pow: () => 1.05,
  //       enhance: [0.1, 0, 0, 0.15],
  //       isAOE: () => true,
  //     })
  //   }
  // }),

    // summer_break_charlotte_old: {
  //   name: 'Summer Break Charlotte (Pre-Balance)',
  //   element: HeroElement.ice,
  //   class: HeroClass.knight,
  //   baseAttack: 957,
  //   baseHP: 6148,
  //   baseDefense: 634,
  //   heroSpecific: ['targetCurrentHPPercent'],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.9,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1.8,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.0035,
  //       multTip: () => ({target_lost_hp_pc: 35}),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //   }
  // },

    // tenebria_old: new Hero({
  //   element: HeroElement.fire,
  //   class: HeroClass.mage,
  //   baseAttack: 1359,
  //   baseHP: 4895,
  //   baseDefense: 652,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1.2,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       rate: () => 0.8,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.35 : 1.1,
  //       pow: () => 1.05,
  //       enhance: [0.1, 0, 0, 0, 0.15],
  //       isAOE: () => true,
  //     })
  //   }
  // }),

    // tywin_old: {
  //   name: 'Tywin (Pre-Balance)',
  //   element: HeroElement.ice,
  //   class: HeroClass.knight,
  //   baseAttack: 821,
  //   heroSpecific: ['casterMaxHP'],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.8,
  //       pow: () => 0.95,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.04,
  //       flatTip: () => ({ casterMaxHP: 4 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.5,
  //       pow: () => 0.95,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact)*0.1,
  //       flatTip: () => ({ casterMaxHP: 10 }),
  //       enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
  //       isAOE: () => true,
  //     }
  //   }
  // },

    // vildred_old: {
  //   name: 'Vildred (Pre-Balance)',
  //   element: HeroElement.earth,
  //   class: HeroClass.thief,
  //   baseAttack: 1283,
  //   heroSpecific: ['casterSpeed', 'exclusiveEquipment2'],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.85,
  //       pow: () => 0.95,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed()*0.00075,
  //       multTip: () => ({ casterSpeed: 0.075 }),
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
  //     },
  //     s2: new Skill({
  //       rate: () => 0.5,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isAOE: () => true,
  //     },
  //     s3: new Skill({
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.1 : 0.85,
  //       pow: () => 1,
  //       mult: (soulburn: boolean) => 1 + inputValues.casterFinalSpeed()*(soulburn ? 0.0009 : 0.00075),
  //       multTip: (soulburn: boolean) => ({ casterSpeed: soulburn ? 0.09 : 0.075 }),
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isAOE: () => true,
  //     }
  //   }
  // },

    // yufine_old: {
  //   name: 'Yufine (Pre-Balance)',
  //   element: HeroElement.earth,
  //   class: HeroClass.warrior,
  //   baseAttack: 1228,
  //   heroSpecific: [targetHasBuff, 'exclusiveEquipment2'],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 1,
  //       pow: () => 1,
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.3 : 0,
  //       enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       rate: () => 0.9,
  //       pow: () => 1,
  //       isAOE: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 2,
  //       pow: () => 0.95,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasBuff ? 1.5 : 1.0,
  //       multTip: () => ({targetHasBuff: 50}),
  //       enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
  //       isSingle: () => true,
  //     }
  //   }
  // },
  // twisted_eidolon_kayron_old: new Hero({ //TODO: translate when available
  //   element: HeroElement.light,
  //   class: HeroClass.thief,
  //   baseAttack: 1228,
  //   baseHP: 6266,
  //   baseDefense: 473,
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.12,
  //   heroSpecific: ['targetCurrentHPPercent', 'casterEnraged', 'casterMaxHP'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: (soulburn: boolean) => soulburn ? 1.7 : 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (1 - (inputValues.targetCurrentHPPercent / 100)) * 0.3,
  //       multTip: () => ({ target_lost_hp_pc: 30 }),
  //       isSingle: () => true,
  //       soulburn: true
  //     }),
  //     s1_bis: new Skill({
  //       id: 's1_bis',
  //       name: 'ml_kayron_flash_slash',
  //       rate: () => 0.85,
  //       pow: () => 1,
  //       enhanceFrom: 's1',
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 0.9,
  //       pow: () => 1,
  //       fixed: (hitType: HitType, inputValues: DamageFormData) => (hitType !== HitType.miss) ? ((inputValues.casterEnraged) ? 10000 : 2000) : 0,
  //       fixedTip: () => ({ caster_rage_flat: 10000 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isAOE: () => true,
  //     }),
  //   }
  // }),
    // eligos_old: new Hero({
  //   element: HeroElement.fire,
  //   class: HeroClass.ranger,
  //   heroSpecific: ['casterSpeed', 'casterPerception', 'targetSpeed'],
  //   baseAttack: 1283,
  //   baseHP: 4976,
  //   baseDefense: 536,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       speedScaling: true,
  //       rate: () => 0.95,
  //       pow: () => 0.9,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
  //       multTip: () => ({ casterSpeed: 0.075 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       speedScaling: true,
  //       rate: () => 0.7,
  //       pow: () => 1.3,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
  //         const spdDiff = (inputValues.casterFinalSpeed() - inputValues.targetFinalSpeed()) * 0.025;
  //         return 1 + Math.min(Math.max(0, spdDiff), 2);
  //       },
  //       multTip: () => ({ caster_target_spd_diff: 0.25 }),
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 1.5,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     })
  //   }
  // }),
  // inferno_khawazu_old: new Hero({
  //   element: HeroElement.dark,
  //   class: HeroClass.warrior,
  //   baseAttack: 1119,
  //   baseHP: 6091,
  //   baseDefense: 594,
  //   heroSpecific: ['targetBurnDetonate'],
  //   dot: [DoT.burn],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 0.95,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0.05, 0, 0.1,  0.1],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 0.7,
  //       pow: () => 1,
  //       detonate: DoT.burn,
  //       detonation: () => 1.2,
  //       isSingle: () => true,
  //     })
  //   }
  // }),
  // martial_artist_ken_old: new Hero({
  //   element: HeroElement.dark,
  //   class: HeroClass.warrior,
  //   baseAttack: 1359,
  //   baseHP: 5542,
  //   baseDefense: 585,
  //   heroSpecific: ['casterCurrentHPPercent'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 0.95,
  //       enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       onlyCrit: () => true,
  //       rate: () => 1.2,
  //       pow: () => 0.95,
  //       mult: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
  //         let extra = 0;
  //         for (let i = 0; i < inputValues.molagoras1; i++) {
  //           extra += Heroes.martial_artist_ken.skills.s1.enhance[i];
  //         }
  //         return (1 + (100 - inputValues.casterCurrentHPPercent) * 0.004 + extra);
  //       },
  //       multTip: () => ({ caster_lost_hp_pc: 40 }),
  //       enhance: [0.05, 0.1, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.1 : 0.9,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0, 0.1, 0, 0.15],
  //       isAOE: () => true,
  //     })
  //   }
  // }),
    // moon_bunny_dominiel_old: new Hero({
  //   element: HeroElement.light,
  //   class: HeroClass.soul_weaver,
  //   baseAttack: 649,
  //   baseHP: 4572,
  //   baseDefense: 631,
  //   heroSpecific: ['casterMaxHP'],
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.21,
  //   barrierEnhance: 's2',
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 0.9,
  //       enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.1]
  //     }),
  //   }
  // }),
  // lone_crescent_bellona_old: new Hero({
  //   element: HeroElement.dark,
  //   class: HeroClass.warrior,
  //   heroSpecific: ['casterBuffed', 'attackSkillStack'],
  //   heroSpecificMaximums: {'attackSkillStack': 5},
  //   baseAttack: 1208,
  //   baseHP: 6488,
  //   baseDefense: 616,
  //   attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.attackSkillStack * 0.1,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       onlyCrit: () => true,
  //       rate: () => 0.9,
  //       pow: () => 0.95,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       onlyCrit: () => true,
  //       rate: () => 0.6,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isExtra: true,
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       onlyCrit: () => true,
  //       rate: () => 1.5,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.casterBuffed ? 0.3 : 0),
  //       multTip: () => ({ casterBuffed: 30 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     })
  //   }
  // }),
    // serila_old: new Hero({
  //   element: HeroElement.fire,
  //   class: HeroClass.mage,
  //   baseAttack: 1218,
  //   baseHP: 4521,
  //   baseDefense: 683,
  //   dot: [DoT.burn],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 2 : 1.5,
  //       pow: () => 1.05,
  //       enhance: [0.1, 0, 0, 0, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 1.8,
  //       pow: () => 1.05,
  //       enhance: [0.1, 0, 0, 0, 0.15],
  //       isSingle: () => true,
  //     })
  //   }
  // }),
    // death_dealer_ray_old: new Hero({
  //   element: HeroElement.dark,
  //   class: HeroClass.soul_weaver,
  //   baseAttack: 621,
  //   baseHP: 6034,
  //   baseDefense: 775,
  //   heroSpecific: ['targetInjuries'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       //TODO: add venom detonate
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       noCrit: true,
  //       noMiss: true,
  //       rate: () => 0,
  //       pow: () => 0,
  //       afterMath: () => new AftermathSkill({ injuryPercent: 0.8 }), // TODO: check if this still works, does it penetrate correctly?
  //       isAOE: () => true,
  //     })
  //   }
  // }),
  // elvira_old: new Hero({
  //   element: HeroElement.ice,
  //   class: HeroClass.thief,
  //   heroSpecific: ['targetCurrentHP'],
  //   baseAttack: 1057,
  //   baseHP: 5542,
  //   baseDefense: 532,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       isSingle: () => true,
  //       noCrit: true,
  //     }),
  //     s1_extra: new Skill({
  //       id: 's1_extra',
  //       name: 'elviraExterminate',
  //       rate: () => 0.5,
  //       pow: () => 1.3,
  //       isAOE: () => true,
  //       noCrit: true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 0.2,
  //       pow: () => 1,
  //       flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.targetCurrentHP * 0.16,
  //       flatTip: () => ({ targetCurrentHP: 16 }),
  //       penetrate: () => 1,
  //       enhance: [0.05, 0.05, 0, 0.05, 0.15],
  //       isSingle: () => true,
  //       noCrit: true,
  //     })
  //   }
  // }),
    // hwayoung_old: new Hero({
  //   element: HeroElement.fire,
  //   class: HeroClass.warrior,
  //   baseAttack: 1119,
  //   baseHP: 6226,
  //   baseDefense: 627,
  //   heroSpecific: ['casterBuffed', 'casterMaxHP', 'targetMaxHP'],
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.45,
  //   innateAttackIncrease: (inputValues: DamageFormData) => {
  //     let boost = 0.20;
  //     for (let i = 0; i < inputValues.molagoras2; i++) {
  //       boost += Heroes.hwayoung_old.skills.s2.enhance[i];
  //     }
  //     return boost;
  //   },
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 0.8,
  //       pow: () => 1,
  //       afterMath: (hitType: HitType, inputValues: DamageFormData) => inputValues.casterBuffed && hitType !== HitType.miss ? new AftermathSkill({ attackPercent: 0.25 }) : null,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //       noCrit: true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       enhance: [0.01, 0.02, 0.02, 0.02, 0.03],
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       hpScaling: true,
  //       rate: () => 1.25,
  //       pow: () => 1,
  //       penetrate: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
  //         return inputValues.casterFinalMaxHP(artifact) < inputValues.targetFinalMaxHP()
  //                ? Math.min((inputValues.targetFinalMaxHP() - inputValues.casterFinalMaxHP(artifact)) * 0.000091, 1)
  //                : 0;
  //       },
  //       penetrateTip: () => ({ caster_vs_target_hp_diff: 9.1 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //       noCrit: true,
  //     }),
  //   }
  // }),
    // judge_kise_old: new Hero({
  //   element: HeroElement.light,
  //   class: HeroClass.warrior,
  //   baseAttack: 1039,
  //   baseHP: 5340,
  //   baseDefense: 617,
  //   heroSpecific: ['numberOfTargets'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.15, 0, 0, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.1, 0.1],
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 1,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.numberOfTargets - 1) * 0.1,
  //       multTip: () => ({ per_target: 10 }),
  //       enhance: [0.05, 0, 0.05, 0, 0, 0.1, 0.1],
  //       isAOE: () => true,
  //     })
  //   }
  // }),
    // romann_old: new Hero({
  //   element: HeroElement.ice,
  //   class: HeroClass.mage,
  //   baseAttack: 1109,
  //   baseHP: 4329,
  //   baseDefense: 655,
  //   heroSpecific: ['targetHasBuff'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       rate: () => 0.7,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0, 0.1, 0.15],
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 0.9,
  //       pow: () => 0.85,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasBuff ? 1.3 : 1,
  //       multTip: () => ({ targetHasBuff: 30 }),
  //       enhance: [0.05, 0.1, 0, 0.15, 0.15],
  //       isAOE: () => true,
  //     }),
  //   }
  // }),
    // spirit_eye_celine_old: new Hero({
  //   element: HeroElement.light,
  //   class: HeroClass.thief,
  //   baseAttack: 1158,
  //   baseHP: 5016,
  //   baseDefense: 532,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 0.9,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s1_bis: new Skill({
  //       id: 's1_bis',
  //       name: 'ml_celine_nimble_sword',
  //       rate: () => 1.3,
  //       pow: () => 0.9,
  //       penetrate: () => 0.35,
  //       enhanceFrom: 's1',
  //       isSingle: () => true,
  //     }),
  //   }
  // }),
  // clarissa_old: new Hero({
  //   element: HeroElement.ice,
  //   class: HeroClass.warrior,
  //   baseAttack: 1252,
  //   baseHP: 5219,
  //   baseDefense: 564,
  //   heroSpecific: ['exclusiveEquipment3'/*, 'casterEnraged'*/],
  //   dot: [DoT.bleed],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       rate: () => 0.7,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
  //       isExtra: true,
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.05 : 0.8,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterEnraged ? 1.3 : 1,
  //       multTip: () => ({ caster_rage: 30 }),
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isAOE: () => true,
  //     })
  //   }
  // }),
  // requiem_roana_old: new Hero({
  //   element: HeroElement.dark,
  //   class: HeroClass.mage,
  //   heroSpecific: ['attackSkillStack'],
  //   heroSpecificMaximums: {'attackSkillStack': 3},
  //   baseAttack: 1316,
  //   baseHP: 4777,
  //   baseDefense: 715,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       afterMath: (hitType: HitType) => hitType !== HitType.miss ? new AftermathSkill(({ attackPercent: 0.5 })) : null,
  //       noCrit: true,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 0.3,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.attackSkillStack * 0.15,
  //       multTip: () => ({per_stack: 15}),
  //       penetrate: () => 1.0,
  //       noCrit: true,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isAOE: () => true
  //     }),
  //   }
  // }),
  // top_model_luluca_old: new Hero({
  //   element: HeroElement.dark,
  //   class: HeroClass.mage,
  //   baseAttack: 1228,
  //   baseHP: 4370,
  //   baseDefense: 662,
  //   heroSpecific: ['casterSpeed'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       noTrans: true,
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       speedScaling: true,
  //       rate: () => 1.6,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.0015,
  //       multTip: () => ({ casterSpeed: 0.15 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     })
  //   }
  // }),
    // bellona_old: new Hero({
  //   element: HeroElement.earth,
  //   class: HeroClass.ranger,
  //   baseAttack: 1003,
  //   baseHP: 5704,
  //   baseDefense: 585,
  //   heroSpecific: ['targetMaxHP', 'numberOfTargets'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 0.95,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * 0.04,
  //       flatTip: () => ({ targetMaxHP: 4 }),
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       rate: () => 0.8,
  //       pow: () => 0.95,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.numberOfTargets > 1 ? 1 + (inputValues.numberOfTargets - 1) * 0.1 : 1,
  //       multTip: () => ({ per_target: 10 }),
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.2 : 0.95,
  //       pow: () => 1,
  //       enhance: [0.15, 0, 0, 0, 0.15],
  //       isAOE: () => true,
  //     })
  //   }
  // }),

    // blood_moon_haste_old: new Hero({
  //   element: HeroElement.dark,
  //   class: HeroClass.soul_weaver,
  //   baseAttack: 621,
  //   baseHP: 5474,
  //   baseDefense: 802,
  //   heroSpecific: ['casterMaxHP'],
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.4,
  //   barrierEnhance: 's2',
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       hpScaling: true,
  //       rate: () => 1,
  //       pow: () => 1,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
  //       flatTip: () => ({ casterMaxHP: 12 }),
  //       enhance: [0.05, 0.1, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15]
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       hpScaling: true,
  //       noCrit: true,
  //       rate: () => 0.3,
  //       pow: () => 1,
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
  //       flatTip: () => ({ casterMaxHP: 12 }),
  //       penetrate: () => 1.0,
  //       enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     }),
  //   }
  // }),

    // celine_old: new Hero({
  //   element: HeroElement.earth,
  //   class: HeroClass.thief,
  //   heroSpecific: ['exclusiveEquipment2', 'exclusiveEquipment3'],
  //   baseAttack: 1228,
  //   baseHP: 6267,
  //   baseDefense: 473,
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.5,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       critDmgBoost: () => 0.2,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       rate: () => 1.4,
  //       pow: () => 1,
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 2.5 : 1.8,
  //       pow: () => 1,
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       ignoreDamageTransfer: () => true,
  //       isSingle: () => true,
  //     })
  //   }
  // }),
  // kane_old: new Hero({
  //   element: HeroElement.fire,
  //   class: HeroClass.warrior,
  //   baseAtk: 1359,
  //   baseHP: 5542,
  //   baseDef: 585,
  //   heroSpecific: [/*'casterEnraged',*/ 'targetNumberOfDebuffs'],
  //   dot: [DoT.bleed],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 0.9,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
  //       isSingle: () => true,
  //     }),
  //     s1_bis: new Skill({
  //       name: 'kane_rock_smash',
  //       id: 's1_bis',
  //       rate: () => 0.5,
  //       pow: () => 1.3,
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 1.6,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.targetNumberOfDebuffs * 0.2,
  //       multTip: () => ({ per_target_debuff: 20 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
  //       isAOE: () => true,
  //     })
  //   }
  // }),
  // last_piece_karin_old: new Hero({
  //   element: HeroElement.light,
  //   class: HeroClass.thief,
  //   baseAttack: 1029,
  //   baseHP: 5097,
  //   baseDefense: 473,
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.65,
  //   heroSpecific: ['casterSpeed', 'targetMaxHP', 'casterHasNeoPhantomSword'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       speedScaling: true,
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.5 : 0.9,
  //       pow: () => 1,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
  //       multTip: () => ({ casterSpeed: 0.075 }),
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterHasNeoPhantomSword ? inputValues.targetFinalMaxHP() * 0.2 : 0,
  //       flatTip: () => ({ targetMaxHP: 20 }),
  //       enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
  //       isSingle: () => true,
  //       ignoreDamageTransfer: (inputValues: DamageFormData) => inputValues.casterHasNeoPhantomSword ? true : false
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       speedScaling: true,
  //       rate: () => 1.5,
  //       pow: () => 0.9,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.0015,
  //       multTip: () => ({ casterSpeed: 0.15 }),
  //       flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterHasNeoPhantomSword ? inputValues.targetFinalMaxHP() * 0.2 : 0,
  //       flatTip: () => ({ targetMaxHP: 20 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //       ignoreDamageTransfer: (inputValues: DamageFormData) => inputValues.casterHasNeoPhantomSword
  //     })
  //   }
  // }),
  // ravi_old: new Hero({
  //   element: HeroElement.fire,
  //   class: HeroClass.warrior,
  //   baseAttack: 966,
  //   baseHP: 7323,
  //   baseDefense: 657,
  //   heroSpecific: ['attackSkillStack'],
  //   heroSpecificMaximums: {'attackSkillStack': 5},
  //   attackIncrease: (inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.attackSkillStack * 0.15,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 2.5 : 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 0.85,
  //       pow: () => 0.95,
  //       penetrate: () => 0.5,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.15],
  //       isAOE: () => true,
  //     })
  //   }
  // }),
  // sylvan_sage_vivian_old: new Hero({
  //   element: HeroElement.light,
  //   class: HeroClass.mage,
  //   baseAttack: 1359,
  //   baseHP: 4895,
  //   baseDefense: 652,
  //   heroSpecific: ['attackSkillStack'],
  //   heroSpecificMaximums: {'attackSkillStack': 3},
  //   attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.attackSkillStack * 0.15,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     }),
  //     // Separate skill because it goes AOE
  //     s1_soulburn: new Skill({
  //       id: 's1_soulburn',
  //       name: 's1_soulburn',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhanceFrom: 's1',
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 1.1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isAOE: () => true,
  //     }),
  //   }
  // }),
  // yuna_old: new Hero({
  //   element: HeroElement.ice,
  //   class: HeroClass.ranger,
  //   baseAttack: 1158,
  //   baseHP: 6002,
  //   baseDefense: 553,
  //   heroSpecific: ['exclusiveEquipment3', 'casterSpeed', 'numberOfTargets'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       speedScaling: true,
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 0.85 : 0.6,
  //       pow: () => 0.8,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
  //         let mult = 1 + inputValues.casterFinalSpeed() * 0.00075;
  //         switch (inputValues.numberOfTargets) {
  //         case 3: mult += 0.2; break;
  //         case 2: mult += 0.4; break;
  //         case 1: mult += 0.6; break;
  //         }
  //         return mult;
  //       },
  //       multTip: () => ({ casterSpeed: 0.075, per_fewer_target: 20 }),
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       onlyCrit: () => true,
  //       rate: () => 1.5,
  //       pow: () => 0.8,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
  //         switch (inputValues.numberOfTargets) {
  //         case 3: return 1.2;
  //         case 2: return 1.4;
  //         case 1: return 1.6;
  //         default: return 1;
  //         }
  //       },
  //       multTip: () => ({ per_fewer_target: 20 }),
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.3 : 0,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
  //       isAOE: () => true,
  //     })
  //   }
  // }),
  // camilla_old: new Hero({
  //   element: HeroElement.light,
  //   class: HeroClass.warrior,
  //   baseAttack: 885,
  //   baseHP: 4733,
  //   baseDefense: 571,
  //   heroSpecific: ['targetCurrentHPPercent'],
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 1.5,
  //       pow: () => 0.95,
  //       enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.01,
  //       multTip: () => ({ target_lost_hp_pc: 1 }),
  //       isSingle: () => true,
  //     })
  //   }
  // }),
  // free_spirit_tieria_old: new Hero({
  //   element: HeroElement.light,
  //   class: HeroClass.warrior,
  //   baseAttack: 957,
  //   baseHP: 5057,
  //   baseDefense: 592,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       critDmgBoost: () => 0.2,
  //       enhance: [0.05, 0.05, 0.1, 0.1],
  //       isSingle: () => true,
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.1, 0.1],
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 2.5 : 1.8,
  //       pow: () => 0.9,
  //       enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.05, 0.15],
  //       isSingle: () => true,
  //     })
  //   }
  // }),
  // mercedes_old: new Hero({
  //   element: HeroElement.fire,
  //   class: HeroClass.mage,
  //   baseAttack: 1187,
  //   baseHP: 4491,
  //   baseDefense: 627,
  //   heroSpecific: ['numberOfTargets', 'casterHasImmensePower'],
  //   attackIncrease: (inputValues: DamageFormData) => inputValues.casterHasImmensePower ? 1.15 : 1,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 0.9,
  //       pow: () => 0.95,
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
  //     }),
  //     s2: new Skill({
  //       id: 's2',
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 0.9 : 0.7,
  //       pow: () => 0.9,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
  //         switch (inputValues.numberOfTargets) {
  //         case 1: return 1.9;
  //         case 2: return 1.6;
  //         case 3: return 1.3;
  //         default: return 1;
  //         }
  //       },
  //       multTip: () => ({ per_fewer_target: 30 }),
  //       enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
  //       isAOE: () => true,
  //     }),
  //     s2_bis: new Skill({
  //       id: 's2_bis',
  //       name: 's2_wave_2',
  //       isExtra: true,
  //       rate: () => 0.35,
  //       pow: () => 0.9,
  //       mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
  //         switch (inputValues.numberOfTargets) {
  //         case 1: return 1.9;
  //         case 2: return 1.6;
  //         case 3: return 1.3;
  //         default: return 1;
  //         }
  //       },
  //       multTip: () => ({ per_fewer_target: 30 }),
  //       enhanceFrom: 's2',
  //       isAOE: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 1.15,
  //       pow: () => 0.95,
  //       critDmgBoost: () => 0.2,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.15],
  //       isAOE: () => true,
  //     })
  //   }
  // }),
  // remnant_violet_old: new Hero({
  //   element: HeroElement.dark,
  //   class: HeroClass.thief,
  //   baseAttack: 1283,
  //   baseHP: 5138,
  //   baseDefense: 522,
  //   skills: {
  //     s1: new Skill({
  //       id: 's1',
  //       rate: () => 1,
  //       pow: () => 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       isSingle: () => true,
  //     }),
  //     s3: new Skill({
  //       id: 's3',
  //       rate: () => 1.3,
  //       pow: () => 1,
  //       penetrate: () => 0.5,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     })
  //   }
  // }),