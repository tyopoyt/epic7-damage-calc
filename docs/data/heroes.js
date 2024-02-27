/*
 * Notes:
 * aftermath damage is only used when it scales with the caster's attack (hwayoung)
 * fixed damage is used for flat extra damage (rimuru)
 * flat damage is used for damage scaling with stats other than attack (alencia)
 */

const dot = {
  bleed: 'bleed',
  burn: 'burn',
  bomb: 'bomb',
};

const classType = {
  knight: 'knight',
  mage: 'mage',
  ranger: 'ranger',
  soul_weaver: 'soul-weaver',
  thief: 'thief',
  warrior: 'warrior',
};

const element = {
  ice: 'ice',
  fire: 'fire',
  earth: 'earth',
  dark: 'dark',
  light: 'light',
};

const heroes = {
  abigail: {
    name: 'Abigail',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 984,
    baseHP: 6266,
    baseDef: 637,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.8,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({caster_max_hp: 12}),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 1.2,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.2,
        flatTip: () => ({caster_max_hp: 20}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  // TODO: translate Abyssal Yufine stuff
  abyssal_yufine: {
    name: 'Abyssal Yufine',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 830,
    baseHP: 6619,
    baseDef: 713,
    form: [elements.caster_defense, elements.caster_has_trauma],
    atkUp: () => {
      let boost = 1;

      if (elements.caster_has_trauma.value()) {
        boost += 1

        let defenseBeforeTrauma = Number(document.getElementById('caster-defense').value)
                                      * (1 + (elements.caster_defense_up.value() ? battleConstants.defUp : 0)
                                      + (document.getElementById('vigor').checked ? battleConstants.vigor - 1 : 0)
                                      + (document.getElementById('caster-fury')?.checked ? battleConstants['caster-fury'] - 1 : 0));
        if (defenseBeforeTrauma >= 2000) {
          boost += 1;
        }
      }

      return boost;
    },
    skills: {
      s1: {
        defenseScaling: true,
        rate: (soulburn) => soulburn ? 0.9 : 0.7,
        pow: 1,
        flat: (soulburn) => elements.caster_defense.value() * (soulburn ? 1.1 : 0.9),
        flatTip: (soulburn) => ({caster_defense: soulburn ? 110 : 90}),
        enhance: [0.05, 0, 0.05, 0.05, 0, 0.15],
        aoe: true,
        soulburn: true
      },
      s1_bis: {
        name: infoLabel('abyssal_yufine_unbridled_outburst'),
        rate: 0.8,
        pow: 0.9,
        penetrate: () => 0.7,
        enhance_from: 's1',
        single: true,
      },
      s1_bis_soulburn: {
        name: infoLabel('abyssal_yufine_unbridled_outburst', true),
        rate: 1.25,
        pow: 0.9,
        penetrate: () => 0.7,
        enhance_from: 's1',
        single: true,
      },
      s3: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
      }
    }
  },
  achates: {
    name: 'Achates',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 603,
    baseHP: 4945,
    baseDef: 662,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
    }
  },
  adin: {
    name: 'Adin',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1081,
    baseHP: 4572,
    baseDef: 494,
    form: [elements.nb_targets],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 1,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 3: return 1.2;
          case 2: return 1.4;
          case 1: return 1.6;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 20 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.8,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
    }
  },
  adlay: {
    name: 'Adlay',
    element: element.earth,
    classType: classType.mage,
    baseAtk: 1039,
    baseHP: 3925,
    baseDef: 606,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  adventurer_ras: {
    name: 'Adventurer Ras',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 758,
    baseHP: 5826,
    baseDef: 672,
    form: [elements.caster_max_hp, elements.skill_tree_completed],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.9,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        mult: () => 1 + (elements.skill_tree_completed.value() ? 0.1 : 0),
        multTip: () => ({ skill_tree: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.9,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
    }
  },
  ae_giselle: {
    name: 'ae-GISELLE',
    element: element.earth,
    classType: classType.mage,
    form: [elements.target_hp_pc],
    baseAtk: 1286,
    baseHP: 4733,
    baseDef: 652,
    skills: {
      s1: {
        mult: () => 1 + elements.target_hp_pc.value() * 0.002,
        multTip: () => ({ target_current_hp: 0.2 }),
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.7 : 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 2,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
        noTrans: true,
      }
    }
  },
  ae_karina: {
    name: 'ae-KARINA',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 821,
    baseDef: 648,
    baseHP: 6751,
    form: [elements.caster_defense],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () =>  elements.caster_defense.value() * 1.0,
        flatTip: () => ({ caster_defense: 100 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.5,
        flatTip: () => ({ caster_defense: 50 }),
        afterMath: (hitType) => (hitType !== hitTypes.miss) ? { defPercent: 1.4, penetrate: 0.7 } : null,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  ae_ningning: {
    name: 'ae-NINGNING',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 785,
    baseHP: 5077,
    baseDef: 634,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  ae_winter: {
    name: 'ae-WINTER',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 1057,
    baseHP: 5542,
    baseDef: 532,
    form: [elements.attack_skill_stack_3],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 0.8,
        pow: 0.95,
        fixed: (hitType) => (hitType === hitTypes.crit) ? 5000 * (elements.attack_skill_stack_3.value() + 1)  : 0,
        fixedTip: () => ({fixed: 5000, per_stack: 5000 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
    }
  },
  ainos: {
    name: 'Ainos',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 804,
    baseHP: 3925,
    baseDef: 599,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        aoe: true,
      }
    }
  },
  ainos_2_0: {
    name: 'Ainos 2.0',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 804,
    baseHP: 3925,
    baseDef: 599,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        aoe: true,
      }
    }
  },
  ains: {
    name: 'Ains',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 951,
    baseHP: 5517,
    baseDef: 583,
    skills: {
      s1: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_crit: {
        onlyCrit: true,
        name: 'S1 Satisfying Strike',
        rate: 1,
        pow: 1,
        enhance_from: 's1',
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.8 : 1.5,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  aither: {
    name: 'Aither',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 705,
    baseHP: 4592,
    baseDef: 672,
    barrier: (hero) => hero.getAtk(),
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  alencia: {
    name: 'Alencia',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 975,
    baseHP: 7054,
    baseDef: 652,
    form: [elements.caster_max_hp, elements.exclusive_equipment_2],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.08,
        flatTip: () => ({caster_max_hp: 8}),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        name: infoLabel('alencia_trample'),
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.11,
        flatTip: () => ({caster_max_hp: 11}),
        exEq: () => elements.exclusive_equipment_2.value() ? 0.2 : 0,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isExtra: true,
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.15,
        flatTip: () => ({ caster_max_hp: 15 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        aoe: true,
      }
    }
  },
  alexa: {
    name: 'Alexa',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1081,
    baseHP: 4572,
    baseDef: 494,
    form: [elements.target_nb_debuff],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0.15],
        single: true,
      },
      s1_extra: {
        name: infoLabel('s1_extra_attack'),
        rate: 0.75,
        pow: 1,
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.9,
        mult: () => 1 + elements.target_nb_debuff.value() * 0.15,
        multTip: ()=> ({ per_target_debuff: 15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  all_rounder_wanda: {
    name: 'All-Rounder Wanda',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 1005,
    baseHP: 4693,
    baseDef: 532,
    skills: {
      s1: {
        rate: 0.9,
        pow: 0.95,
        mult: () => elements.target_has_target.value() ? 1.35 : 1,
        multTip: () => elements.target_has_target.value() ? { target_debuff: 35 } : null,
        enhance: [0.05, 0, 0, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0, 0.15, 0.15],
        single: true,
      }
    }
  },
  ambitious_tywin: {
    name: 'Ambitious Tywin',
    element: element.light,
    classType: classType.knight,
    baseAtk: 894,
    baseHP: 6840,
    baseDef: 694,
    form: [elements.caster_max_hp, elements.caster_enrage],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.6,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0, 0.1, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.05, 0.15],
        aoe: true,
      },
    }
  },
  amid: {
    name: 'Amid',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 694,
    baseHP: 4855,
    baseDef: 655,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        single: true,
      },
    }
  },
  amiki: {
    name: 'Amiki',
    element: element.ice,
    classType: classType.warrior,
    baseAttack: 1019,
    baseHP: 5738,
    baseDefense: 571,
    form: [elements.caster_below_30_percent_hp],
    skills: {
      s1: {
        id: 's1',
        rate: () => 0.6,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        noCrit: true,
        single: true,
        penetrate: () => 0.3,
        canExtra: true
      },
      s3: {
        id: 's3',
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.5 : 1.1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1],
        noCrit: true,
        single: true,
        penetrate: () => elements.caster_below_30_percent_hp.value() ? 0.7 : 0.3
      }
    }
  },
  angel_of_light_angelica: {
    name: 'Angel of Light Angelica',
    element: element.light,
    classType: classType.mage,
    baseAtk: 957,
    baseHP: 5016,
    baseDef: 645,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.1, 0, 0.1, 0, 0.1],
        single: true,
      }
    }
  },
  angelic_montmorancy: {
    name: 'Angelic Montmorancy',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 540,
    baseHP: 4900,
    baseDef: 729,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  angelica: {
    name: 'Angelica',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 576,
    baseHP: 5700,
    baseDef: 743,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.15,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  apocalypse_ravi: {
    name: 'Apocalypse Ravi',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 975,
    baseHP: 7054,
    baseDef: 652,
    form: [elements.caster_max_hp, elements.dead_people],
    skills: {
      s1: {
        hpScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1,
        pow: 0.95,
        flat: (soulburn) => elements.caster_max_hp.value() * (soulburn ? 0.2 : 0.12),
        flatTip: (soulburn) => ({ caster_max_hp: soulburn ? 20 : 12 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 1.3,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.2,
        flatTip: () => ({ caster_max_hp: 20 }),
        mult: () => 1 + Math.min(elements.dead_people.value(), 3) * 0.25,
        multTip: () => ({ dead_people: 25 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  aramintha: {
    name: 'Aramintha',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1197,
    baseHP: 4572,
    baseDef: 683,
    form: [elements.target_burn_detonate],
    dot: [dot.burn],
    barrier: (hero) => hero.getAtk() * 1.2,
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        detonate: [dot.burn],
        detonation: () => 1,
        enhance: [0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  arbiter_vildred: {
    name: 'Arbiter Vildred',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 1283,
    baseHP: 5138,
    baseDef: 522,
    form: [elements.caster_full_focus],
    skills: {
      s1: {
        rate: 0.975,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1]
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => {
          if (elements.caster_full_focus.value()) {
            return soulburn ? 1.55 : 1.23;
          } else {
            return soulburn ? 1.29 : 1.04;
          }
        },
        pow: 0.85,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  archdemon_shadow: {
    name: 'Archdemon\'s Shadow',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1316,
    baseHP: 4777,
    baseDef: 715,
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.6,
        pow: 1.3,
        aoe: true,
        isExtra: true
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  architect_laika: {
    name: 'Architect Laika',
    element: element.light,
    classType: classType.mage,
    baseAtk: 1306,
    baseHP: 4248,
    baseDef: 652,
    form: [elements.caster_speed],
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.15],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 0.95,
        pow: 0.9,
        penetrate: () => elements.target_has_target.value() ? 0.8 : 0,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.15],
        noTrans: true,
        aoe: true,
      }
    }
  },
  // architect_laika_old: {
  //   name: 'Architect Laika (Pre-Balance)',
  //   element: element.light,
  //   classType: classType.mage,
  //   baseAtk: 1306,
  //   form: [elements.caster_speed],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 0.9,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 0.9,
  //       pow: 0.9,
  //       penetrate: () => elements.target_has_target.value() ? 0.8 : 0,
  //       mult: () => 1 + elements.caster_speed.value() * 0.001125,
  //       multTip: () => ({ caster_speed: 0.1125 }),
  //       enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.15],
  //       noTrans: true,
  //       aoe: true,
  //     }
  //   }
  // },
  aria: {
    name: 'Aria',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1039,
    baseDef: 673,
    baseHP: 5299,
    form: [elements.caster_defense],
    barrier: () => elements.caster_defense.value() * 1.0,
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.85,
        flatTip: () => ({ caster_defense: 85 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
      },
      s2: {
        defenseScaling: true,
        rate: 0.7,
        pow: 1.3,
        flat: () => elements.caster_defense.value() * 1.4,
        flatTip: () => ({ caster_defense: 140 }),
        aoe: true,
      }
    }
  },
  armin: {
    name: 'Armin',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 721,
    baseDef: 785,
    baseHP: 6189,
    form: [elements.caster_defense],
    barrier: () => elements.caster_defense.value() * 0.7,
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.8,
        pow: 0.9,
        flat: () => elements.caster_defense.value() * 0.6,
        flatTip: () => ({ caster_defense: 60 }),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  arowell: {
    name: 'Arowell',
    element: element.light,
    classType: classType.knight,
    baseAtk: 758,
    baseHP: 5826,
    baseDef: 672,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({caster_max_hp: 5}),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.75,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.15,
        flatTip: () => ({caster_max_hp: 15}),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  arunka: {
    name: 'Arunka',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1570,
    baseHP: 6488,
    baseDef: 616,
    form: [elements.target_has_barrier, elements.exclusive_equipment_2],
    dot: [dot.bleed],
    innateAtkUp: () => 0.30,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
        noCrit: true,
      },
      s1_bis: {
        name: infoLabel('arunka_expose'),
        rate: 1.3,
        pow: 1.3,
        // enhance_from: 's1', Presumed not to inherit from s1 mola since the pow is so high already
        single: true,
        isExtra: true,
        noCrit: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        penetrate: () => 0.7,
        mult: () => elements.target_has_barrier.value() ? 3.4 : 1,
        multTip: () => ({ target_has_barrier: 240 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
        single: true,
        noCrit: true,
      },
    }
  },
  // arunka_old: {
  //   name: 'Arunka (Pre-Balance)',
  //   element: element.earth,
  //   classType: classType.warrior,
  //   baseAtk: 1570,
  //   baseHP: 6488,
  //   baseDef: 616,
  //   form: [elements.target_has_barrier],
  //   dot: [dot.bleed],
  //   innateAtkUp: () => 0.30,
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //       noCrit: true,
  //     },
  //     s1_bis: {
  //       name: infoLabel('arunka_expose'),
  //       rate: 1.3,
  //       pow: 1.3,
  //       // enhance_from: 's1', Presumed not to inherit from s1 mola since the pow is so high already
  //       single: true,
  //       noCrit: true,
  //     },
  //     s3: {
  //       rate: 0.9,
  //       pow: 1,
  //       penetrate: () => 0.7,
  //       mult: () => elements.target_has_barrier.value() ? 2.2 : 1,
  //       multTip: () => ({ target_has_barrier: 120 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //       noCrit: true,
  //     },
  //   }
  // },
  assassin_cartuja: {
    name: 'Assassin Cartuja',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6019,
    baseDef: 594,
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  assassin_cidd: {
    name: 'Assassin Cidd',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 930,
    baseHP: 4774,
    baseDef: 497,
    form: [elements.caster_speed, elements.target_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1.5,
        pow: 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.001 + elements.target_speed.value() * 0.003,
        multTip: () => ({ caster_speed: 0.1, target_speed: 0.3 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  assassin_coli: {
    name: 'Assassin Coli',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 1027,
    baseHP: 5299,
    baseDef: 469,
    form: [elements.caster_speed, elements.caster_stealth, elements.exclusive_equipment_1],
    skills: {
      s1: {
        spdScaling: true,
        rate: () => elements.caster_stealth.value() ? 1.2 : 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        exEq: () => elements.exclusive_equipment_1.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 3 : 1.5,
        pow: 0.8,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.15],
        single: true,
      }
    }
  },
  astromancer_elena: {
    name: 'Astromancer Elena',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 1079,
    baseHP: 5502,
    baseDef: 564,
    form: [elements.target_has_debuff, elements.caster_has_stars_blessing],
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        mult: () => elements.target_has_debuff.value() ? 1.2 : 1,
        multTip: () => ({ target_has_debuff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1.1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  auxiliary_lots: {
    name: 'Auxiliary Lots',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1021,
    baseHP: 4855,
    baseDef: 610,
    skills: {
      s1: {
        rate: 1,
        pow: 0.8,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1 : 0.8,
        pow: 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  azalea: {
    name: 'Azalea',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1019,
    baseHP: 5738,
    baseDef: 571,
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0, 0.1, 0, 0.15, 0],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      },
    }
  },
  baal_and_sezan: {
    name: 'Baal & Sezan',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1197,
    baseHP: 4572,
    baseDef: 683,
    form: [elements.target_nb_debuff],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.15, 0, 0.15]
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.35 : 1.1,
        pow: 0.9,
        mult: () => 1 + (elements.target_nb_debuff.value() * 0.15),
        multTip: () => ({ per_target_debuff: 15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  bad_cat_armin: {
    name: 'Bad Cat Armin',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 912,
    baseHP: 5871,
    baseDef: 614,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.15,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.9,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        hpScaling: true,
        rate: 1.3,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.16,
        flatTip: () => ({ caster_max_hp: 16 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  // bad_cat_armin_old: {
  //   name: 'Bad Cat Armin (Pre-Balance)',
  //   element: element.dark,
  //   classType: classType.warrior,
  //   baseAtk: 912,
  //   form: [elements.caster_max_hp],
  //   barrier: () => elements.caster_max_hp.value()*0.15,
  //   skills: {
  //     s1: {
  //       rate: 0.9,
  //       pow: 1,
  //       flat: () => elements.caster_max_hp.value()*0.06,
  //       flatTip: () => ({ caster_max_hp: 6 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       aoe: true,
  //     },
  //     s3: {
  //       rate: 1.3,
  //       pow: 1,
  //       flat: () => elements.caster_max_hp.value()*0.2,
  //       flatTip: () => ({ caster_max_hp: 20 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     },
  //   }
  // },
  baiken: {
    name: 'Baiken',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1228,
    baseHP: 6266,
    baseDef: 473,
    form: [elements.target_bleed_detonate],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.85 : 1.6,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        detonate: dot.bleed,
        detonation: () => 1.3,
        single: true,
      }
    }
  },
  basar: {
    name: 'Basar',
    element: element.earth,
    baseAtk: 1316,
    baseHP: 4777,
    baseDef: 715,
    classType: classType.mage,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        rate: 0.9,
        pow: 0.9,
        enhance: [0.05, 0.1, 0, 0.1, 0.15],
        aoe: true,
      },
    }
  },
  bask: {
    name: 'Bask',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 842,
    baseHP: 6463,
    baseDef: 617,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0.1, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  batisse: {
    name: 'Batisse',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1039,
    baseHP: 5097,
    baseDef: 518,
    skills: {
      s1: {
        rate: 0.8,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s1_rock_smash: {
        name: 'S1 Rock Smash',
        rate: 0.5,
        pow: 0.95,
        enhance_from: 's1',
        isExtra: true,
        aoe: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  beehoo: {
    name: 'Beehoo',
    element: element.fire,
    classType: classType.ranger,
    form: [elements.target_burn_detonate, elements.exclusive_equipment_3],
    baseAtk: 1203,
    baseHP: 5704,
    baseDef: 702,
    innateAtkUp: () => {
      let boost = 0.20;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.beehoo.skills.s2.enhance[i];
      }
      return boost + (elements.exclusive_equipment_3.value() ? 0.05 : 0);
    },
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        noCrit: true,
        single: true,
      },
      s1_bis: {
        name: infoLabel('beehoo_incinerate'),
        rate: 1.2,
        pow: 0.9,
        enhance_from: 's1',
        detonate: dot.burn,
        detonation: () => 1.3,
        noCrit: true,
        single: true,
      },
      s2: {
        enhance: [0.01, 0.01, 0.01, 0.01, 0.02, 0.02, 0.02],
      },
    }
  },
  belian: {
    name: 'Belian',
    element: element.light,
    classType: classType.knight,
    form: [elements.caster_max_hp],
    baseAtk: 821,
    baseHP: 6751,
    baseDef: 648,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.6,
        pow: 1.05,
        flat: () => elements.caster_max_hp.value() * 0.09,
        flatTip: () => ({ caster_max_hp: 9 }),
        enhance: [0.05, 0, 0.05, 0, 0.05, 0, 0.1],
        aoe: true,
      },
      s1_extra: {
        hpScaling: true,
        name: 'S1 Incursion',
        rate: 0.6,
        pow: 1.3,
        flat: () => elements.caster_max_hp.value() * 0.045,
        flatTip: () => ({ caster_max_hp: 4.5 }),
        aoe: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.6,
        pow: 1.3,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        aoe: true,
      }
    }
  },
  bellona: {
    name: 'Bellona',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 1003,
    baseHP: 5704,
    baseDef: 585,
    form: [elements.target_max_hp, elements.nb_targets],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        flat: () => elements.target_max_hp.value() * 0.04,
        flatTip: () => ({ target_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 0.95,
        mult: () => elements.nb_targets.value() > 1 ? 1 + (elements.nb_targets.value() - 1) * 0.1 : 1,
        multTip: () => ({ per_target: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.2 : 0.95,
        pow: 1,
        enhance: [0.15, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  benevolent_romann: {
    name: 'Benevolent Romann',
    element: element.light,
    classType: classType.mage,
    baseAtk: 957,
    baseHP: 5016,
    baseDef: 645,
    skills: {
      s1: {
        rate: 0.8,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      mana_burst: {
        name: 'Mana Burst',
        rate: 0.5,
        pow: 1,
        aoe: true,
      },
      s3: {
        rate: 0.9,
        pow: 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  benimaru: {
    name: 'Benimaru',
    element: element.fire,
    classType: classType.warrior,
    form: [elements.caster_has_multilayer_barrier],
    baseAtk: 1177,
    baseHP: 5542,
    baseDef: 553,
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.7 : 1,
        pow: 1,
        mult: () => 1 + (elements.caster_has_multilayer_barrier.value() ? 0.3 : 0),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.2,
        pow: 1,
        penetrate: () => elements.caster_has_multilayer_barrier.value() ? 0.6 : 0.3,
        isExtra: true,
        aoe: true,
      },
      s3: {
        rate: 2,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  blaze_dingo: {
    name: 'Blaze Dingo',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 880,
    baseHP: 4167,
    baseDef: 627,
    skills: {
      s1: {
        rate: 1.5,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1.2,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  blood_blade_karin: {
    name: 'Blood Blade Karin',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 1138,
    baseHP: 5871,
    baseDef: 462,
    form: [elements.caster_hp_pc],
    atkUp: () => {
      let boost = 0.0051;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += 0.0051 * heroes.blood_blade_karin.skills.s2.enhance[i];
      }
      return 1 + (100 - elements.caster_hp_pc.value()) * boost;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.45 : 1.2,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      },
    }
  },
  blood_moon_haste: {
    name: 'Blood Moon Haste',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 621,
    baseHP: 5474,
    baseDef: 802,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.4,
    barrierEnhance: 's2',
    skills: {
      s1: {
        hpScaling: true,
        rate: 1,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.1, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15]
      },
      s3: {
        hpScaling: true,
        noCrit: true,
        rate: 0.3,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        single: true,
      },
    }
  },
  blooming_lidica: {
    name: 'Blooming Lidica',
    element: element.earth,
    classType: classType.thief,
    form: [elements.caster_max_hp, elements.caster_speed, elements.target_speed, elements.enemy_number_of_debuffs],
    baseAttack: 1057,
    baseHP: 5542,
    baseDefense: 532,
    spdUp: () => {
      return 1 + Math.min(elements.enemy_number_of_debuffs.value(), 10) * 0.07;
    },
    skills: {
      s1: {
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        isExtra: true,
        aoe: true,
      },
      s3: {
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        flat: () => elements.caster_max_hp.value() * 0.3,
        flatTip: () => ({ caster_max_hp: 30 }),
        penetrate: () => {
          const penDiff = (elements.caster_speed.value() - elements.target_speed.value()) * 0.0059;

          return Math.min(Math.max(0, penDiff), 1);
        },
        penetrateTip: () => ({caster_target_spd_diff: 0.0059}),
        single: true,
        noCrit: true,
      }
    }
  },
  briar_witch_iseria: {
    name: 'Briar Witch Iseria',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 1182,
    baseHP: 5299,
    baseDef: 571,
    skills: {
      s1: {
        rate: 0.85,
        pow: 1,
        afterMath: (hitType) => (hitType !== hitTypes.miss) ? { atkPercent: 0.3, penetrate: 0.7 } : null,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 0.95,
        pow: 1.1,
        afterMath: (hitType) => (hitType !== hitTypes.miss) ? { atkPercent: 0.3, penetrate: 0.7 } : null,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  // briar_witch_iseria_old: {
  //   name: 'Briar Witch Iseria (Pre-Balance)',
  //   element: element.dark,
  //   classType: classType.ranger,
  //   baseAtk: 1182,
  //   skills: {
  //     s1: {
  //       rate: 0.85,
  //       pow: 1,
  //       afterMath: (hitType) => (hitType !== hitTypes.miss) ? { atkPercent: 0.3, penetrate: 0.7 } : null,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.2 : 0.95,
  //       pow: 1.1,
  //       afterMath: (hitType) => (hitType !== hitTypes.miss) ? { atkPercent: 0.3, penetrate: 0.7 } : null,
  //       enhance: [0.05, 0, 0, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  brieg: {
    name: 'Brieg',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 821,
    baseHP: 6751,
    baseDef: 648,
    barrierSkills: ['S2', 'S2 Soulburn'],
    barrier: () => {
      let boost = 1.0;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes['brieg'].skills.s2.enhance[i];
      }

      return elements.caster_max_hp.value() * 0.185 * boost;
    },
    barrier2: () => {
      let boost = 1.0;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes['brieg'].skills.s2.enhance[i];
      }

      return elements.caster_max_hp.value() * 0.24 * boost;
    },
    form: [elements.caster_max_hp, elements.caster_perception],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
      },
      s3: {
        hpScaling: true,
        canExtra: true,
        rate: 1,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.22,
        flatTip: () => ({ caster_max_hp: 22 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  butcher_corps_inquisitor: {
    name: 'Butcher Corps Inquisitor',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 963,
    baseHP: 5138,
    baseDef: 606,
    form: [elements.caster_hp_pc],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.5,
        pow: 0.85,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.005,
        multTip: () => ({ caster_lost_hp_pc: 50 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.15],
        single: true,
      },
    }
  },
  byblis: {
    name: 'Byblis',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 993,
    baseHP: 6002,
    baseDef: 611,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 1.3,
        isExtra: true,
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        aoe: true,
      },
    }
  },
  camilla: {
    name: 'Camilla',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 885,
    baseHP: 4733,
    baseDef: 571,
    form: [elements.target_hp_pc],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.01,
        multTip: () => ({ target_lost_hp_pc: 1 }),
        single: true,
      }
    }
  },
  captain_rikoris: {
    name: 'Captain Rikoris',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 951,
    baseHP: 5517,
    baseDef: 583,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        aoe: true,
      }
    }
  },
  carmainerose: {
    name: 'Carmainerose',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1168,
    baseHP: 3877,
    baseDef: 666,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  carrot: {
    name: 'Carrot',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1039,
    baseHP: 3925,
    baseDef: 606,
    form: [elements.target_burn_detonate],
    dot: [dot.burn],
    barrier: (hero) => hero.getAtk() * 0.6,
    barrierEnhance: 's2',
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        detonate: dot.burn,
        detonation: () => 1.1,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.15, 0.15]
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  cartuja: {
    name: 'Cartuja',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 903,
    baseHP: 6635,
    baseDef: 630,
    form: [elements.caster_max_hp, elements.caster_hp_pc],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        soulburn: true,
        rate: (soulburn) => (elements.caster_hp_pc.value() < 75 ? 1 : 0.6) + (soulburn ? 0.2 : 0),
        pow: 1,
        flat: (soulburn) => {
          if (soulburn) {
            return elements.caster_max_hp.value() * (elements.caster_hp_pc.value() < 75 ? 0.1 : 0.08);
          } else {
            return elements.caster_max_hp.value() * (elements.caster_hp_pc.value() < 75 ? 0.0625 : 0.05);
          }
        },
        flatTip: (soulburn) => (elements.caster_hp_pc.value() < 75)
          ? { caster_hp_pc_under_hp_threshold: soulburn ? 10 : 6.25 }
          : { caster_hp_pc_over_hp_threshold: soulburn ? 8 : 5 },
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  cecilia: {
    name: 'Cecilia',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 821,
    baseHP: 6751,
    baseDef: 648,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.4,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.6,
        pow: 1.05,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  celeste: {
    name: 'Celeste',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 929,
    baseHP: 4733,
    baseDef: 494,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.25 : 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        aoe: true,
      },
    }
  },
  celestial_mercedes: {
    name: 'Celestial Mercedes',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1187,
    baseHP: 4491,
    baseDef: 627,
    form: [elements.target_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 0.9,
        flat: () => elements.target_max_hp.value() * 0.04,
        flatTip: () => ({ target_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.2,
        pow: 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        aoe: true,
      }
    }
  },
  celine: {
    name: 'Celine',
    element: element.earth,
    classType: classType.thief,
    form: [elements.exclusive_equipment_2, elements.exclusive_equipment_3],
    baseAtk: 1228,
    baseHP: 6267,
    baseDef: 473,
    barrier: (hero) => hero.getAtk() * 0.5,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.4,
        pow: 1,
        exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.5 : 1.8,
        pow: 1,
        exEq: () => elements.exclusive_equipment_3.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        single: true,
      }
    }
  },
  // celine_old: {
  //   name: 'Celine (Pre-Balance)',
  //   element: element.earth,
  //   classType: classType.thief,
  //   form: [elements.exclusive_equipment_2, elements.exclusive_equipment_3],
  //   baseAtk: 1228,
  //   barrier: (hero) => hero.getAtk()*0.5,
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 1,
  //       critDmgBoost: () => 0.2,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 1.4,
  //       pow: 1,
  //       exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       noTrans: true,
  //       single: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 2.3 : 1.8,
  //       pow: 1,
  //       exEq: () => elements.exclusive_equipment_3.value() ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     }
  //   }
  // },
  cerise: {
    name: 'Cerise',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 970,
    baseHP: 5299,
    baseDef: 603,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        elemAdv: () => true,
        aoe: true,
      },
    }
  },
  cermia: {
    name: 'Cermia',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1359,
    baseHP: 5542,
    baseDef: 585,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        canExtra: true,
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.65 : 1.15,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        penetrate: () => 0.5,
        single: true,
      },
    }
  },
  challenger_dominiel: {
    name: 'Challenger Dominiel',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1187,
    baseHP: 4491,
    baseDef: 627,
    form: [elements.critical_hit_stack],
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.5 : 1,
        pow: (soulburn) => soulburn ? 1 : 0.9,
        critDmgBoost: () => 0.2,
        mult: () => {
          let mult = 0;
          for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
            mult += heroes.challenger_dominiel.skills.s2.enhance[i];
          }

          return 1 + (elements.critical_hit_stack.value() * (0.054 + (0.054 * mult)));
        },
        multTip: () => {
          let mult = 0;
          for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
            mult += heroes.challenger_dominiel.skills.s2.enhance[i];
          }
          return { per_crit_hit: (5.4 + (5.4 * mult)).toFixed(2) };
        },
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
      }
    }
  },
  champion_zerato: {
    name: 'Champion Zerato',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1159,
    baseHP: 4733,
    baseDef: 627,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1]
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  chaos_inquisitor: {
    name: 'Chaos Inquisitor',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 963,
    baseHP: 5138,
    baseDef: 606,
    form: [elements.caster_hp_pc, elements.skill_tree_completed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (elements.skill_tree_completed.value() ? 0.05 : 0),
        multTip: () => ({ skill_tree: 5 }),
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.5,
        pow: 0.85,
        mult: () => 1 + (1 - (elements.caster_hp_pc.value() / 100)) / 2 + (elements.skill_tree_completed.value() ? 0.12 : 0),
        multTip: () => ({ caster_lost_hp_pc: 50, skill_tree: 12 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.15],
        single: true,
      }
    }
  },
  chaos_sect_axe: {
    name: 'Chaos Sect Axe',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1144,
    baseHP: 4895,
    baseDef: 543,
    form: [elements.caster_max_hp, elements.skill_tree_completed],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.7,
        pow: 0.95,
        mult: () => elements.skill_tree_completed.value() ? 1.1 : 1,
        multTip: () => (elements.skill_tree_completed.value() ? { skill_tree: 10 } : null),
        flat: () => elements.caster_max_hp.value() * 0.08,
        flatTip: () => ({ caster_max_hp: 8 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        hpScaling: true,
        rate: 1,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.2,
        flatTip: () => ({ caster_max_hp: 20 }),
        penetrate: () => document.getElementById('elem-adv').checked ? 0.4 : 0,
        enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  // chaos_sect_axe_old: {
  //   name: 'Chaos Sect Axe (Pre-Balance)',
  //   element: element.dark,
  //   classType: classType.warrior,
  //   baseAtk: 1144,
  //   form: [elements.caster_max_hp, elements.caster_attacked_stack_5],
  //   dot: [dot.bleed],
  //   atkUp: () => 1 + elements.caster_attacked_stack_5.value()*0.06,
  //   skills: {
  //     s1: {
  //       rate: 0.85,
  //       pow: 0.95,
  //       flat: () => elements.caster_max_hp.value()*0.04,
  //       flatTip: () => ({ caster_max_hp: 4 }),
  //       enhance: [0.05, 0.05, 0.1, 0.15],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 0.75,
  //       pow: 0.95,
  //       flat: () => elements.caster_max_hp.value()*0.05,
  //       flatTip: () => ({ caster_max_hp: 5 }),
  //       enhance: [0.05, 0.05, 0.1, 0.15],
  //       aoe: true,
  //     },
  //     s3: {
  //       rate: 1.2,
  //       pow: 0.9,
  //       flat: () => elements.caster_max_hp.value()*0.1,
  //       flatTip: () => ({ caster_max_hp: 10 }),
  //       penetrate: () => document.getElementById(`elem-adv`).checked ? 0.4 : 0,
  //       enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
  //       single: true,
  //     }
  //   }
  // },
  charles: {
    name: 'Charles',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 957,
    baseHP: 6148,
    baseDef: 634,
    form: [elements.caster_nb_buff, elements.nb_targets, elements.exclusive_equipment_2],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: () => 1.5 + elements.caster_nb_buff.value() * 0.07,
        pow: 1,
        enhance: [0.1, 0, 0.1, 0, 0.1],
        single: true,
      },
      s3: {
        rate: 1.2,
        pow: 1,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 3: return 1.267;
          case 2: return 1.534;
          case 1: return 1.801;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 26.7 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  charlotte: {
    name: 'Charlotte',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 1134,
    baseHP: 5825,
    baseDef: 662,
    skills: {
      s1: {
        onlyCrit: true,
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        onlyCrit: true,
        rate: 1.4,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  chloe: {
    name: 'Chloe',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 1177,
    baseHP: 5542,
    baseDef: 553,
    form: [elements.target_magic_nailed],
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        mult: () => elements.target_magic_nailed.value() ? 1.3 : 1,
        multTip: () => ({ target_magic_nail: 30 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1.2,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 3 : 1.7,
        pow: 0.8,
        mult: () => elements.target_magic_nailed.value() ? 1.35 : 1,
        multTip: () => ({ target_magic_nail: 35 }),
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        single: true,
      }
    }
  },
  choux: {
    name: 'Choux',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 966,
    baseHP: 7323,
    baseDef: 657,
    form: [elements.caster_max_hp, elements.caster_full_focus],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * (elements.caster_full_focus.value() ? 0.15 : 0.11),
        flatTip: () => ({ caster_max_hp: (elements.caster_full_focus.value() ? 15 : 11) }),
        penetrate: () => 0.7,
        enhance: [0.05, 0.1, 0.15],
        canExtra: true,
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.15,
        flatTip: () => ({ caster_max_hp: 15 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
      }
    }
  },
  christy: {
    name: 'Christy',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 667,
    baseHP: 5784,
    baseDef: 749,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 1.1,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0, 0.1, 0, 0.1, 0],
        single: true
      }
    }
  },
  church_of_ilryos_axe: {
    name: 'Church of Ilryos Axe',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1144,
    baseHP: 4895,
    baseDef: 543,
    form: [elements.caster_max_hp],
    dot: [dot.bleed],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.85,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.75,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        hpScaling: true,
        rate: 1.2,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  cidd: {
    name: 'Cidd',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1029,
    baseHP: 5097,
    baseDef: 473,
    form: [elements.caster_speed, elements.exclusive_equipment_3],
    skills: {
      s1: {
        spdScaling: true,
        rate: () => elements.caster_speed_up.value() ? 1.5 : 0.9,
        pow: () => elements.caster_speed_up.value() ? 0.9 : 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.6,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.0021,
        multTip: () => ({ caster_speed: 0.21 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        elemAdv: () => elements.caster_speed_up.value() || elements.exclusive_equipment_3.value(),
        single: true,
      }
    }
  },
  clarissa: {
    name: 'Clarissa',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 1252,
    baseHP: 5219,
    baseDef: 564,
    form: [elements.caster_enrage, elements.exclusive_equipment_3],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isExtra: true,
        aoe: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.05 : 0.8,
        pow: 1,
        mult: () => elements.caster_enrage.value() ? 1.3 : 1,
        multTip: () => ({ caster_rage: 30 }),
        exEq: () => elements.exclusive_equipment_3.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  claudia: {
    name: "Claudia",
    element: element.fire,
    classType: classType.knight,
    baseAttack: 703,
    baseHP: 5914,
    baseDefense: 596,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        single: () => true,
      },
      s2: {
        rate: () => 1,
        pow: () => 1.3,
        single: () => true,
      }
    }
  },
  closer_charles: {
    name:  'Closer Charles',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 1228,
    baseHP: 6266,
    baseDef: 473,
    form: [elements.target_hp_pc, elements.caster_perception],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_alt: {
        rate: 1.2,
        pow: 1,
        name: 'S1 Demolition',
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.004,
        multTip: () => ({ target_lost_hp_pc: 0.4 }),
        enhance_from: 's1',
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.25 : 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  coli: {
    name: 'Coli',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1138,
    baseHP: 5871,
    baseDef: 462,
    form: [elements.target_bleed_detonate, elements.target_bomb_detonate],
    dot: [dot.bleed, dot.bomb],
    skills: {
      s1: {
        rate: 0.8,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 0.9,
        detonate: [dot.bleed, dot.bomb],
        detonation: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 0.3,
        pow: 0.9,
        enhance: [0.05, 0.1, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  commander_lorina: {
    name: 'Commander Lorina',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1144,
    baseHP: 4895,
    baseDef: 543,
    form: [elements.target_max_hp, elements.target_hp_pc, elements.attack_skill_stack_5],
    atkUp: () => {
      let boost = 0.1;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.commander_lorina.skills.s2.enhance[i];
      }

      return 1 + elements.attack_skill_stack_5.value() * boost;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        flat: () => elements.target_max_hp.value() * 0.02,
        flatTip: () => ({ target_max_hp: 2 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.005, 0.005, 0.01, 0.01, 0.02]
      },
      s3: {
        rate: 1.5,
        pow: 0.95,
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.005,
        multTip: () => ({ target_lost_hp_pc: 50 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  command_model_laika: {
    name: 'Command Model Laika',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 1182,
    baseHP: 5299,
    baseDef: 571,
    form: [elements.exclusive_equipment_3],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1.1,
        pow: 1,
        exEq: () => elements.exclusive_equipment_3.value() ? 0.1 : 0,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  commander_pavel: {
    name: 'Commander Pavel',
    element: element.light,
    classType: classType.ranger,
    form: [elements.target_attack],
    baseAtk: 1327,
    baseHP: 5138,
    baseDef: 582,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.75,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 0.75,
        pow: 1,
        penetrate: () => {
          const targetAtk = elements.target_attack.value();
          const casterAtk = currentHero.getAtk('s3');

          const penDiff = (casterAtk - targetAtk) * 0.000117;

          return Math.min(Math.max(0, penDiff), 0.7);
        },
        penetrateTip: () => ({caster_target_atk_diff: 0.0117}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        single: true,
      }
    }
  },
  conqueror_lilias: {
    name: 'Conqueror Lilias',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 885,
    baseHP: 6149,
    baseDef: 613,
    skills: {
      s1: {
        rate: 1.2,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  corvus: {
    name: 'Corvus',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 903,
    baseDef: 630,
    baseHP: 6635,
    form: [elements.caster_defense, elements.caster_enrage],
    skills: {
      s1: {
        defenseScaling: true,
        rate: () => elements.caster_enrage.value() ? 0.9 : 0.7,
        pow: 1,
        flat: () => (elements.caster_enrage.value() ? 1.2 : 0.9) * elements.caster_defense.value(),
        flatTip: () => ({ caster_defense: elements.caster_enrage.value() ? 120 : 90 }),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        defenseScaling: true,
        rate: 0.3,
        pow: 0.9,
        flat: () => elements.caster_defense.value() * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.05, 0, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  crescent_moon_rin: {
    name:  'Crescent Moon Rin',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 1027,
    baseHP: 5299,
    baseDef: 469,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1.6,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  crimson_armin: {
    name: 'Crimson Armin',
    element: element.light,
    classType: classType.knight,
    baseAtk: 821,
    baseDef: 703,
    baseHP: 6266,
    form: [elements.caster_defense],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.6,
        flatTip: () => ({ caster_defense: 60 }),
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  crozet: {
    name: 'Crozet',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 739,
    baseDef: 733,
    baseHP: 6868,
    form: [elements.caster_max_hp, elements.caster_defense],
    barrier: () => elements.caster_max_hp.value() * 0.15,
    barrierEnhance: 's2',
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.6,
        pow: 1.05,
        flat: () => elements.caster_defense.value() * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0.1, 0.1]
      },
      s3: {
        defenseScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 0.75 : 0.5,
        pow: 0.95,
        flat: () => elements.caster_defense.value() * 0.6,
        flatTip: () => ({ caster_defense: 60 }),
        enhance: [0.1, 0, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  dark_corvus: {
    name: 'Dark Corvus',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 966,
    baseHP: 7323,
    baseDef: 657,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        noCrit: true,
        soulburn: true,
        rate: 0,
        pow: 0.95,
        flat: (soulburn) => elements.caster_max_hp.value() * (soulburn ? 0.375 : 0.25),
        flatTip: (soulburn) => ({ caster_max_hp: soulburn ? 37.5 : 25 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  death_dealer_ray: {
    name: 'Death Dealer Ray',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 621,
    baseHP: 6034,
    baseDef: 775,
    form: [elements.target_injuries], 
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        afterMath: () => ({ injuryPercent: 0.4, penetrate: 0.7 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  // death_dealer_ray_old: {
  //   name: 'Death Dealer Ray (Pre-Balance)',
  //   element: element.dark,
  //   classType: classType.soul_weaver,
  //   baseAtk: 621,
  //   baseHP: 6034,
  //   baseDef: 775,
  //   form: [elements.target_injuries],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     },
  //     s3: {
  //       noCrit: true,
  //       noMiss: true,
  //       rate: 0,
  //       pow: 0,
  //       afterMath: () => ({ injuryPercent: 0.8, penetrate: 0.7 }),
  //       single: true,
  //     }
  //   }
  // },
  desert_jewel_basar: {
    name: 'Desert Jewel Basar',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 948,
    baseHP: 4370,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  designer_lilibet: {
    name: 'Designer Lilibet',
    element: element.dark,
    classType: classType.warrior,
    form: [elements.caster_defense],
    baseAtk: 975,
    baseDef: 652,
    baseHP: 7054,
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.6,
        pow: 1,
        flat: () => elements.caster_defense.value() * 1.0,
        flatTip: () => ({ caster_defense: 100 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 0.6,
        pow: 1,
        flat: () => elements.caster_defense.value() * 1.15,
        flatTip: () => ({ caster_defense: 115 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        aoe: true,
      }
    }
  },
  destina: {
    name: 'Destina',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 621,
    baseHP: 6034,
    baseDef: 775,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        single: true,
      }
    }
  },
  diene: {
    name: 'Diene',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 649,
    baseHP: 5254,
    baseDef: 694,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0, 0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  dingo: {
    name: 'Dingo',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 957,
    baseHP: 5057,
    baseDef: 592,
    dot: [dot.bleed, dot.burn],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  dizzy: {
    name: 'Dizzy',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1039,
    baseHP: 5299,
    baseDef: 673,
    form: [elements.target_has_debuff],
    skills: {
      s1: {
        rate: 0.7,
        pow: 1,
        mult: () => elements.target_has_debuff.value() ? 1.3 : 1.0,
        multTip: () => ({ target_debuff: 30 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        onlyMiss: true,
        rate: 2.5,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  doll_maker_pearlhorizon: {
    name: 'Doll Maker Pearlhorizon',
    element: element.earth,
    classType: classType.mage,
    baseAtk: 921,
    baseHP: 4855,
    baseDef: 631,
    form: [elements.target_max_hp, elements.target_has_sleep],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.6,
        pow: 1,
        aoe: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.9,
        extraDmg: () => elements.target_has_sleep.value() ? elements.target_max_hp.value() * 0.3 : 0,
        extraDmgTip: () => ({ target_max_hp: elements.target_has_sleep.value() ? 30 : 0 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      },
    }
  },
  dominiel: {
    name: 'Dominiel',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 957,
    baseHP: 5016,
    baseDef: 645,
    barrier: (hero) => hero.getAtk(),
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 0.75,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  doris: {
    name: 'Doris',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 540,
    baseHP: 5319,
    baseDef: 705,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  dragon_king_sharun: {
    name: 'Dragon King Sharun',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 640,
    baseHP: 5340,
    baseDef: 720,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  eaton: {
    name: 'Eaton',
    element: element.light,
    classType: classType.knight,
    baseAtk: 685,
    baseHP: 7043,
    baseDef: 703,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.25,
    barrierEnhance: 's3',
    skills: {
      s1: {
        hpScaling: true,
        rate: 1.2,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        enhance: [0.05, 0.1, 0, 0.1, 0.15]
      }
    }
  },
  eda: {
    name: 'Eda',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1255,
    baseHP: 5016,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true
      },
      s3: {
        rate: 1.05,
        pow: 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true
      }
    }
  },
  edward_elric: {
    name: 'Edward Elric',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 984,
    baseHP: 6266,
    baseDef: 637,
    form: [elements.caster_max_hp, elements.attack_skill_stack_3],
    barrier: () => {
      const scale = [0, 0.1, 0, 0.15, 0];
      let boost = 1.0;
      for (let i = 0; i < Number(document.getElementById('molagora-s1').value); i++) {
        boost += scale[i];
      }

      return elements.caster_max_hp.value() * 0.08 * boost;
    },
    skills: {
      s1: {
        hpScaling: true,
        rate: 1,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({caster_max_hp: 10}),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.08,
        flatTip: () => ({caster_max_hp: 8}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        aoe: true
      },
      s3: {
        hpScaling: true,
        rate: 1.2,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.25,
        flatTip: () => ({caster_max_hp: 25}),
        mult: () => 1 + elements.attack_skill_stack_3.value() * 0.2,
        multTip: () => ({per_stack: 20}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        single: true
      }
    }
  },
  elena: {
    name: 'Elena',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 649,
    baseHP: 5254,
    baseDef: 694,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  eligos: {
    name: 'Eligos',
    element: element.fire,
    classType: classType.ranger,
    form: [elements.caster_speed, elements.caster_perception, elements.target_speed],
    baseAtk: 1283,
    baseHP: 4976,
    baseDef: 536,
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.95,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 0.75,
        pow: 1.3,
        mult: () => {
          const spdDiff = (elements.caster_speed.value() - elements.target_speed.value()) * 0.025;
          return 1 + Math.min(Math.max(0, spdDiff), 2);
        },
        multTip: () => ({ caster_target_spd_diff: 0.25 }),
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  // eligos_old: {
  //   name: 'Eligos (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.ranger,
  //   form: [elements.caster_speed, elements.caster_perception, elements.target_speed],
  //   baseAtk: 1283,
  //   baseHP: 4976,
  //   baseDef: 536,
  //   skills: {
  //     s1: {
  //       spdScaling: true,
  //       rate: 0.95,
  //       pow: 0.9,
  //       mult: () => 1 + elements.caster_speed.value() * 0.00075,
  //       multTip: () => ({ caster_speed: 0.075 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       spdScaling: true,
  //       rate: 0.7,
  //       pow: 1.3,
  //       mult: () => {
  //         const spdDiff = (elements.caster_speed.value() - elements.target_speed.value()) * 0.025;
  //         return 1 + Math.min(Math.max(0, spdDiff), 2);
  //       },
  //       multTip: () => ({ caster_target_spd_diff: 0.25 }),
  //       single: true,
  //     },
  //     s3: {
  //       rate: 1.5,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
  //       single: true,
  //     }
  //   }
  // },
  elphelt_valentine: {
    name: 'Elphelt Valentine',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 1003,
    baseHP: 5704,
    baseDef: 585,
    form: [elements.target_nb_debuff],
    skills: {
      s1: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (elements.target_nb_debuff.value() * 0.2),
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1.1,
        pow: 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        single: true,
      }
    }
  },
  elson: {
    name: 'Elson',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 540,
    baseHP: 4900,
    baseDef: 729,
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  elvira: {
    name: 'Elvira',
    element: element.ice,
    classType: classType.thief,
    form: [elements.target_current_hp],
    baseAtk: 1057,
    baseHP: 5542,
    baseDef: 532,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
        noCrit: true,
      },
      s1_extra: {
        name: 'Exterminate',
        rate: 1,
        pow: 1.3,
        aoe: true,
        noCrit: true,
      },
      s3: {
        rate: 0.2,
        pow: 1,
        flat: () => elements.target_current_hp.value() * 0.16,
        flatTip: () => ({ targetCurrentHP: 16 }),
        penetrate: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        single: true,
        noCrit: true,
      }
    }
  },
  elvira_old: {
    name: 'Elvira (Pre-Balance)',
    element: element.ice,
    classType: classType.thief,
    form: [elements.target_current_hp],
    baseAtk: 1057,
    baseHP: 5542,
    baseDef: 532,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
        noCrit: true,
      },
      s1_extra: {
        name: 'Exterminate',
        rate: 0.5,
        pow: 1.3,
        aoe: true,
        noCrit: true,
      },
      s3: {
        rate: 0.2,
        pow: 1,
        flat: () => elements.target_current_hp.value() * 0.16,
        flatTip: () => ({ targetCurrentHP: 16 }),
        penetrate: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        single: true,
        noCrit: true,
      }
    }
  },
  emilia: {
    name: 'Emilia',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 649,
    baseHP: 5254,
    baseDef: 694,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.15,
    skills: {
      s1: {
        rate: 0.95,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0.05, 0, 0.1, 0.1],
        single: true
      }
    }
  },
  enott: {
    name: 'Enott',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 1019,
    baseHP: 5738,
    baseDef: 571,
    form: [elements.target_hp_pc],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.005,
        multTip: () => ({ target_lost_hp_pc: 0.5 }),
        enhance: [0.05, 0, 0, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      }
    }
  },
  ervalen: {
    name: 'Ervalen',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1228,
    baseHP: 6266,
    baseDef: 473,
    form: [elements.caster_max_hp, elements.target_max_hp],
    barrier: (hero) => hero.getAtk() * 1.2,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1.4,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 1.6,
        pow: 1,
        mult: () => elements.caster_max_hp.value() < elements.target_max_hp.value() ? 1 + Math.min((elements.target_max_hp.value() - elements.caster_max_hp.value()) * 0.0001, 0.7) : 1,
        multTip: () => ({caster_vs_target_hp_diff: 10}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  eternal_wanderer_ludwig: {
    name: 'Eternal Wanderer Ludwig',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1412,
    baseHP: 4248,
    baseDef: 645,
    form: [elements.soulburn_stack],
    info: infoLabel('unreleased_hero'),
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.6,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        penetrate: () => 0.3 * (Math.min(elements.soulburn_stack.value(), 2)),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }
    }
  },
  ezra: {
    name: 'Ezra',
    element: element.earth,
    classType: classType.thief,
    baseAttack: 921,
    baseHP: 4945,
    baseDefense: 462,
    form: [elements.target_nb_debuff],
    skills: {
      s1: {
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        fixed: (hitType) => (hitType !== hitTypes.miss) ? elements.target_nb_debuff.value() * 1000 : 0,
        fixedTip: () => ({ per_target_debuff: 1000 }),
        single: true,
      },
      s2: {
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        fixed: (hitType) => (hitType !== hitTypes.miss) ? elements.target_nb_debuff.value() * 1500 : 0,
        fixedTip: () => ({ per_target_debuff: 1500 }),
        aoe: true,
      }
    }
  },
  fairytale_tenebria: {
    name: 'Fairytale Tenebria',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1039,
    baseHP: 5299,
    baseDef: 673,
    form: [elements.target_has_provoke, elements.target_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        isExtra: true,
        rate: 0.8,
        pow: 1,
        extraDmg: (hitType) => hitType !== hitTypes.miss && elements.target_has_provoke.value() ? elements.target_max_hp.value() * 0.1 : 0,
        extraDmgTip: () => ({ target_max_hp: elements.target_has_provoke.value() ? 10 : 0 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.10],
        aoe: true,
      },
    }
  },
  faithless_lidica: {
    name: 'Faithless Lidica',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 1182,
    baseHP: 5299,
    baseDef: 571,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1.4,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      },
    }
  },
  falconer_kluri: {
    name: 'Falconer Kluri',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 703,
    baseDef: 596,
    baseHP: 5914,
    form: [elements.caster_defense],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 0.9,
        flat: () => elements.caster_defense.value() * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.15],
        single: true,
      }
    }
  },
  fallen_cecilia: {
    name: 'Fallen Cecilia',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 894,
    baseHP: 6840,
    baseDef: 694,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.1,
    barrierEnhance: 's2',
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
      },
      s3: {
        hpScaling: true,
        rate: 0.65,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  fighter_maya: {
    name: 'Fighter Maya',
    element: element.light,
    classType: classType.knight,
    baseAtk: 821,
    baseDef: 703,
    baseHP: 6266,
    form: [elements.caster_defense, elements.target_hp_pc],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.75,
        flatTip: () => ({ caster_defense: 75 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 1.7,
        pow: 1,
        flat: () => elements.caster_defense.value() * 1.5,
        flatTip: () => ({ caster_defense: 150 }),
        mult: () => elements.target_hp_pc.value() < 30 ? 4 : 1,
        multTip: () => ({ under_threshold: 400 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  flan: {
    name: 'Flan',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 1003,
    baseHP: 5704,
    baseDef: 585,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
    }
  },
  free_spirit_tieria: {
    name: 'Free Spirit Tieria',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 957,
    baseHP: 5057,
    baseDef: 592,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.5 : 1.8,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.05, 0.15],
        single: true,
      }
    }
  },
  fumyr: {
    name: 'Fumyr',
    element: element.ice,
    classType: classType.mage,
    baseAttack: 1039,
    baseHP: 5299,
    baseDefense: 673,
    form: [elements.caster_elemental_wisdom_stack],
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0.0, 0.05, 0.15],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        fixed: () => elements.caster_elemental_wisdom_stack.value() * 3000,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  furious: {
    name: 'Furious',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 1068,
    baseHP: 5650,
    baseDef: 536,
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0, 0.1],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.95 : 1.65,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.1],
        single: true,
      }
    }
  },
  general_purrgis: {
    name: 'General Purrgis',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 903,
    baseHP: 6635,
    baseDef: 630,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 1,
        pow: 1,
        flat: () => 0.06 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => 0.08 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 8 }),
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  glenn: {
    name: 'Glenn',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 920,
    baseHP: 4855,
    baseDef: 525,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.5,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  gloomyrain: {
    name: 'Gloomyrain',
    element: element.light,
    classType: classType.mage,
    form: [elements.caster_has_debuff],
    baseAtk: 1199,
    baseHP: 4491,
    baseDef: 613,
    atkUp: () => {
      if (!elements.caster_has_debuff.value()) return 1;

      let boost = 0.2;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.gloomyrain.skills.s2.enhance[i];
      }

      return 1 + boost;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0.1],
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 0.95 : 0.7,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15, 0],
        aoe: true,
      }
    }
  },
  godmother: {
    name: 'Godmother',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 1005,
    baseHP: 4693,
    baseDef: 523,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
      s2: {
        rate: 1.65,
        pow: 0.95,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  great_chief_khawana: {
    name: 'Great Chief Khawana',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1138,
    baseHP: 5421,
    baseDef: 536,
    form: [elements.dual_attack_stack_5, elements.exclusive_equipment_1],
    barrier: (hero) => hero.getAtk() * 0.5,
    atkUp: () => 1 + elements.dual_attack_stack_5.value() * 0.15,
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.8 : 1.1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        exEq: () => elements.exclusive_equipment_1.value() ? 0.1 : 0,
        single: true,
      }
    }
  },
  guider_aither: {
    name: 'Guider Aither',
    element: element.light,
    classType: classType.mage,
    baseAtk: 1252,
    baseHP: 4612,
    baseDef: 627,
    barrier: (hero) => hero.getAtk() * 0.6,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  gunther: {
    name: 'Gunther',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 1426,
    baseHP: 5517,
    baseDef: 583,
    dot: [dot.bleed],
    innateAtkUp: () => {
      let boost = 0.5;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.gunther.skills.s2.enhance[i];
      }

      return boost;
    },
    skills: {
      s1: {
        noCrit: true,
        rate: 1,
        pow: 0.85,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05],
      },
      s3: {
        noCrit: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.9 : 2.2,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  hataan: {
    name: 'Hataan',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 1081,
    baseHP: 4572,
    baseDef: 494,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.95,
        pow: 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 1.3,
        pow: 0.85,
        mult: () => 1 + elements.caster_speed.value() * 0.00125,
        multTip: () => ({ caster_speed: 0.125 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  hasol: {
    name: 'Hasol',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 758,
    baseHP: 6002,
    baseDef: 639,
    form: [elements.caster_max_hp, elements.enemy_counters],
    barrier: () => {
      return elements.caster_max_hp.value() * 0.2;
    },
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        fixed: () => 500 + elements.enemy_counters.value() * 1000,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        fixed: () => 500 + elements.enemy_counters.value() * 1000,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  haste: {
    name: 'Haste',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 1089,
    baseHP: 5380,
    baseDef: 511,
    form: [elements.nb_targets, elements.target_bleed_detonate],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1.5,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.2,
        pow: 1,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 1: return 2.5;
          case 2: return 2.0;
          case 3: return 1.5;
          default: return 1.0;
          }
        },
        multTip: () => ({ per_fewer_target: 50 }),
        enhance: [0.15, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  hazel: {
    name: 'Hazel',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 762,
    baseHP: 4450,
    baseDef: 662,
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  helen: {
    name: 'Helen',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 685,
    baseDef: 703,
    baseHP: 6403,
    form: [elements.caster_defense],
    barrier: () => elements.caster_defense.value() * 0.8,
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.8,
        flatTip: () => ({ caster_defense: 80 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        single: true
      },
      s2: {
        defenseScaling: true,
        rate: 1.2,
        pow: 1,
        flat: () => elements.caster_defense.value(),
        flatTip: () => ({ caster_defense: 100 }),
        enhance: [0.1, 0.1, 0.1, 0, 0, 0, 0],
        single: true
      }
    }
  },
  helga: {
    name: 'Helga',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1000,
    baseHP: 4895,
    baseDef: 518,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
      s2: {
        rate: 1.55,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  holiday_yufine: {
    name: 'Holiday Yufine',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6266,
    baseDef: 627,
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        aoe: true,
      }
    }
  },
  holy_flame_adin: {
    name: 'Holy Flame Adin',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 1081,
    baseHP: 4572,
    baseDef: 494,
    form: [elements.skill_tree_completed],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        mult: () => elements.skill_tree_completed.value() ? 1.1 : 1,
        multTip: () => (elements.skill_tree_completed.value() ? { skill_tree: 10 } : null),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 1,
        aoe: true,
      },
      s3: {
        rate: 1.8,
        pow: 1.05,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        single: true,
      },
    }
  },
  hurado: {
    name: 'Hurado',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 930,
    baseHP: 4572,
    baseDef: 585,
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  hwayoung: {
    name: 'Hwayoung',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6226,
    baseDef: 627,
    form: [elements.target_attack],
    barrier: (hero) => hero.getAtk() * 0.8,
    skills: {
      s1: {
        rate: (soulburn) => soulburn ? 1.2 : 0.8,
        pow: 1,
        afterMath: (hitType, soulburn) => hitType !== hitTypes.miss ? (soulburn ? ({ atkPercent: 0.70, penetrate: 0.7 }) : ({ atkPercent: 0.35, penetrate: 0.7 })) : null,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
        noCrit: true,
        soulburn: true
      },
      s3: {
        rate: 1.1,
        pow: 1,
        penetrate: () => {
          const targetAtk = elements.target_attack.value();
          const casterAtk = currentHero.getAtk('s3');

          const penDiff = (casterAtk - targetAtk) * 0.000196;

          return Math.min(Math.max(0, penDiff), 1);
        },
        penetrateTip: () => ({caster_target_atk_diff: 0.0196}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
        noCrit: true,
      },
    }
  },
  // from 01/2024 balance patch
  hwayoung_old: {
    name: 'Hwayoung (Pre-Balance)',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6226,
    baseDef: 627,
    form: [elements.caster_has_buff, elements.caster_max_hp, elements.target_max_hp],
    barrier: (hero) => hero.getAtk() * 0.45,
    innateAtkUp: () => {
      let boost = 0.20;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.hwayoung_old.skills.s2.enhance[i];
      }
      return boost;
    },
    skills: {
      s1: {
        rate: 0.8,
        pow: 1,
        afterMath: (hitType) => elements.caster_has_buff.value() && hitType !== hitTypes.miss ? ({ atkPercent: 0.25, penetrate: 0.7 }) : null,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
        noCrit: true,
      },
      s2: {
        enhance: [0.01, 0.02, 0.02, 0.02, 0.03],
      },
      s3: {
        hpScaling: true,
        rate: 1.25,
        pow: 1,
        penetrate:() => elements.caster_max_hp.value() < elements.target_max_hp.value()
          ? Math.min((elements.target_max_hp.value() - elements.caster_max_hp.value()) * 0.000091, 1)
          : 0,
        penetrateTip: () => ({ caster_vs_target_hp_diff: 9.1 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
        noCrit: true,
      },
    }
  },
  // hwayoung_old: {
  //   name: 'Hwayoung (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.warrior,
  //   baseAtk: 1510,
  //   form: [elements.caster_has_buff, elements.caster_max_hp, elements.target_max_hp],
  //   barrier: (hero) => hero.getAtk()*0.45,
  //   innateAtkUp: () => {
  //     let boost = 0.35;
  //     for (let i = 0; i < Number(document.getElementById(`molagora-s2`).value); i++) {
  //       boost += heroes.hwayoung.skills.s2.enhance[i];
  //     }
  //     return boost;
  //   },
  //   skills: {
  //     s1: {
  //       rate: 0.6,
  //       pow: 1,
  //       afterMath: () => elements.caster_has_buff.value() ? ({ atkPercent: 0.5, penetrate: 0.7 }) : null,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       single: true,
  //       noCrit: true,
  //     },
  //     s2: {
  //       enhance: [0.02, 0.03, 0.03, 0.03, 0.04],
  //     },
  //     s3: {
  //       rate: 0.55,
  //       pow: 1,
  //       mult: () => elements.caster_max_hp.value() < elements.target_max_hp.value()
  //           ? 1 + Math.min((elements.target_max_hp.value() - elements.caster_max_hp.value())*0.00015, 1)
  //           : 1,
  //       multTip: () => ({ caster_vs_target_hp_diff: 15 }),
  //       penetrate: () => 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //       noCrit: true,
  //     },
  //   }
  // },
  ian: {
    name: 'Ian',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 1081,
    baseHP: 4450,
    baseDef: 504,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.15 : 0.9,
        pow: 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  ilynav: {
    name: 'Ilynav',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 957,
    baseHP: 6148,
    baseDef: 634,
    form: [elements.caster_max_hp, elements.target_injuries],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        hpScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.4 : 1,
        pow: 1,
        flat: (soulburn) => elements.caster_max_hp.value() * (soulburn ? 0.28 : 0.18),
        flatTip: (soulburn) => ({ caster_max_hp: (soulburn ? 28 : 18) }),
        afterMath: () => ({ injuryPercent: 0.5, penetrate: 0.7 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.15,
        flatTip: () => ({ caster_max_hp: 15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  // ilynav_old: {
  //   name: 'Ilynav (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.knight,
  //   baseAtk: 957,
  //   form: [elements.caster_max_hp],
  //   skills: {
  //     s1: {
  //       rate: 0.7,
  //       pow: 1,
  //       flat: () => elements.caster_max_hp.value()*0.08,
  //       flatTip: () => ({ caster_max_hp: 8 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 1,
  //       pow: 1,
  //       flat: () => elements.caster_max_hp.value()*0.18,
  //       flatTip: () => ({ caster_max_hp: 18 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 0.7,
  //       pow: 1,
  //       flat: () => elements.caster_max_hp.value()*0.12,
  //       flatTip: () => ({ caster_max_hp: 12 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     }
  //   }
  // },
  inferno_khawazu: {
    name: 'Inferno Khawazu',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6091,
    baseDef: 594,
    form: [elements.target_burn_detonate],
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 0.95,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1,  0.1],
        single: true,
      },
      s3: {
        rate: 0.7,
        pow: 1,
        detonate: dot.burn,
        detonation: () => 1.3,
        single: true,
      }
    }
  },
  // inferno_khawazu_old: {
  //   name: 'Inferno Khawazu (Pre-Balance)',
  //   element: element.dark,
  //   classType: classType.warrior,
  //   baseAtk: 1119,
  //   baseHP: 6091,
  //   baseDef: 594,
  //   form: [elements.target_burn_detonate],
  //   dot: [dot.burn],
  //   skills: {
  //     s1: {
  //       rate: 0.95,
  //       pow: 1,
  //       enhance: [0.05, 0, 0.05, 0, 0.1,  0.1],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 0.7,
  //       pow: 1,
  //       detonate: dot.burn,
  //       detonation: () => 1.2,
  //       single: true,
  //     }
  //   }
  // },
  infinite_horizon_achates: {
    name: 'Infinite Horizon Achates',
    element: element.light,
    classType: classType.soul_weaver,
    form: [elements.caster_max_hp],
    baseAtk: 576,
    baseHP: 5165,
    baseDef: 767,
    barrierSkills: ['S2', 'S3'],
    barrier: () => {
      const scale = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1];
      let boost = 1.0;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += scale[i];
      }

      return elements.caster_max_hp.value() * 0.18 * boost;
    },
    barrier2: () => {
      return elements.caster_max_hp.value() * 0.2;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1]
      },
    }
  },
  iseria: {
    name: 'Iseria',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 1158,
    baseHP: 6002,
    baseDef: 553,
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 2,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  jack_o: {
    name: 'Jack-O\'',
    element: element.fire,
    classType: classType.warrior,
    form: [elements.target_has_debuff],
    baseAtk: 1228,
    baseHP: 5784,
    baseDef: 553,
    skills: {
      s1: {
        rate: 0.75,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s1_extra: {
        name: infoLabel('s1_extra_attack'),
        rate: 1.1,
        pow: 1,
        isExtra: true,
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        mult: () => elements.target_has_debuff.value() ? 1.5 : 1,
        multTip: () => ({ target_has_debuff: 50 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  // jack_o_old: {
  //   name: 'Jack-O\' (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.warrior,
  //   form: [elements.target_has_debuff],
  //   baseAtk: 1228,
  //   baseHP: 5784,
  //   baseDef: 553,
  //   skills: {
  //     s1: {
  //       rate: 0.75,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     },
  //     s1_extra: {
  //       name: infoLabel('s1_extra_attack'),
  //       rate: 1.1,
  //       pow: 1,
  //       enhance_from: 's1',
  //       single: true,
  //     },
  //     s3: {
  //       rate: 0.95,
  //       pow: 1,
  //       mult: () => elements.target_has_debuff.value() ? 1.3 : 1,
  //       multTip: () => ({ target_has_debuff: 30 }),
  //       penetrate: () => 0.5,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     }
  //   }
  // },
  januta: {
    name: 'Januta',
    element: element.fire,
    classType: classType.warrior,
    form: [elements.caster_enrage],
    baseAtk: 1144,
    baseHP: 4895,
    baseDef: 543,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => elements.caster_enrage.value() ? 1.3 : 1,
        multTip: () => ({ caster_rage: 30 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  jecht: {
    name: 'Jecht',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 804,
    baseHP: 3925,
    baseDef: 599,
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  jena: {
    name: 'Jena',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1063,
    baseHP: 4491,
    baseDef: 599,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 0.85,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  // jena_old: {
  //   name: 'Jena (Pre-Balance)',
  //   element: element.ice,
  //   classType: classType.mage,
  //   baseAtk: 1063,
  //   form: [elements.target_nb_debuff],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 0.95,
  //       mult: () => 1 + elements.target_nb_debuff.value()*0.1,
  //       multTip: () => ({ per_target_debuff: 10 }),
  //       enhance: [0.05, 0.05, 0.1, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.1 : 0.85,
  //       pow: 0.95,
  //       enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  judge_kise: {
    name: 'Judge Kise',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 1039,
    baseHP: 5340,
    baseDef: 617,
    form: [elements.nb_targets],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        penetrate: () => 0.2,
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        enhance: [0.15, 0, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1.1,
        pow: 0.95,
        mult: () => 1 + (elements.nb_targets.value() - 1) * 0.1,
        multTip: () => ({ per_target: 10 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
      }
    }
  },
  judge_kise_old: {
    name: 'Judge Kise (Pre-Balance)',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 1039,
    baseHP: 5340,
    baseDef: 617,
    form: [elements.nb_targets],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.15, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (elements.nb_targets.value() - 1) * 0.1,
        multTip: () => ({ per_target: 10 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  judith: {
    name: 'Judith',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 848,
    baseHP: 4289,
    baseDef: 494,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  juni: {
    name: 'Juni',
    element: element.fire,
    classType: classType.warrior,
    form: [elements.caster_perception],
    baseAtk: 1000,
    baseHP: 4895,
    baseDef: 518,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1.1,
        enhance: [0.05, 0, 0.05, 0, 0.1],
        aoe: true,
      }
    }
  },
  kane: {
    name: 'Kane',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1359,
    baseHP: 5542,
    baseDef: 585,
    form: [elements.caster_enrage, elements.target_nb_debuff],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
        single: true,
      },
      s1_bis: {
        name: infoLabel('kane_rock_smash'),
        rate: 0.5,
        pow: 1.3,
        aoe: true,
      },
      s3: {
        rate: 1.6,
        pow: 1,
        mult: () => 1 + elements.target_nb_debuff.value() * 0.2,
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
        aoe: true,
      }
    }
  },
  kanna: {
    name: 'Kanna',
    element: element.fire,
    classType: classType.ranger,
    form: [elements.caster_speed],
    baseAtk: 1182,
    baseHP: 5299,
    baseDef: 571,
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.75,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  karin: {
    name: 'Karin',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1188,
    baseHP: 4855,
    baseDef: 508,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.3 : 1.6,
        pow: 0.85,
        critDmgBoost: () => 0.5,
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  kawerik: {
    name: 'Kawerik',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1306,
    baseHP: 4248,
    baseDef: 652,
    form: [elements.target_speed, elements.caster_speed, elements.exclusive_equipment_3],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.4,
        pow: 1,
        mult: () => 1 + elements.target_speed.value() * 0.003,
        multTip: () => ({ target_speed: 0.3 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 0.8,
        pow: 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        penetrate: () => 0.3,
        exEq: () => elements.exclusive_equipment_3.value() ? 0.2 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  kayron: {
    name: 'Kayron',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 1119,
    baseHP: 5340,
    baseDef: 483,
    form: [elements.caster_hp_pc, elements.exclusive_equipment_1, elements.exclusive_equipment_2],
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.35 : 0.85,
        pow: 1,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.0015,
        multTip: () => ({ caster_lost_hp_pc: 0.15 }),
        exEq: () => elements.exclusive_equipment_1.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1.7,
        pow: 0.9,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.003,
        multTip: () => ({ caster_lost_hp_pc: 0.3 }),
        exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  ken: {
    name: 'Ken',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 966,
    baseHP: 7323,
    baseDef: 657,
    form: [elements.caster_max_hp],
    dot: [dot.burn],
    skills: {
      s1: {
        hpScaling: true,
        rate: 1,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 1.2,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 1.5,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.3,
        flatTip: () => ({ caster_max_hp: 30 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.15],
        single: true,
      }
    }
  },
  khawana: {
    name: 'Khawana',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 957,
    baseHP: 4653,
    baseDef: 515,
    form: [elements.target_has_debuff, elements.caster_speed],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        afterMath: () => elements.target_has_debuff.value() ? { atkPercent: 0.6, penetrate: 0.7 } : null,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        spdScaling: true,
        rate: 1.5,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  khawazu: {
    name: 'Khawazu',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 4653,
    baseDef: 515,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  kikirat_v2: {
    name: 'Kikirat v2',
    element: element.light,
    classType: classType.knight,
    baseAtk: 667,
    baseDef: 749,
    baseHP: 5704,
    form: [elements.caster_defense],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        defenseScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 0.5 : 0.4,
        pow: 1,
        flat: (soulburn) => elements.caster_defense.value() * (soulburn ? 0.6 : 0.5),
        flatTip: (soulburn) => ({ caster_defense: soulburn ? 60 : 50 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  kiris: {
    name: 'Kiris',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 857,
    baseHP: 5057,
    baseDef: 543,
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.05, 0.05],
        aoe: true,
      }
    }
  },
  kise: {
    name: 'Kise',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1283,
    baseHP: 5138,
    baseDef: 522,
    barrier: (hero) => hero.getAtk() * 0.65,
    form: [elements.target_has_buff, elements.caster_stealth, elements.caster_hp_pc, elements.exclusive_equipment_2],
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.4 : 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        mult: (soulburn) => {
          if (!elements.target_has_buff.value()) return 1;

          return soulburn ? 2 : 1.7;
        },
        multTip: (soulburn) => ({ target_debuff: soulburn ? 100 : 70 }),
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        penetrate: () => elements.caster_stealth.value() ? 0.6 : 0.3,
        exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.6,
        pow: 1,
        mult: () => 1 + elements.caster_hp_pc.value() * 0.0035,
        multTip: () => ({ caster_left_hp_pc: 0.35 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  // kise_old: {
  //   name: 'Kise (Pre-Balance)',
  //   element: element.ice,
  //   classType: classType.thief,
  //   baseAtk: 1283,
  //   barrier: (hero) => hero.getAtk() * 0.5,
  //   form: [elements.target_has_buff, elements.caster_stealth, elements.caster_hp_pc, elements.exclusive_equipment_2],
  //   skills: {
  //     s1: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.4 : 1.1,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
  //       mult: (soulburn) => {
  //         if (!elements.target_has_buff.value()) return 1;

  //         return soulburn ? 2 : 1.7;
  //       },
  //       multTip: (soulburn) => ({ target_debuff: soulburn ? 100 : 70 }),
  //       single: true,
  //     },
  //     s2: {
  //       rate: 0.8,
  //       pow: 1,
  //       penetrate: () => elements.caster_stealth.value() ? 0.6 : 0.3,
  //       exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     },
  //     s3: {
  //       rate: 1.6,
  //       pow: 1,
  //       mult: () => 1 + elements.caster_hp_pc.value()*0.0035,
  //       multTip: () => ({ caster_left_hp_pc: 0.35 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     }
  //   }
  // },
  kitty_clarissa: {
    name: 'Kitty Clarissa',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 957,
    baseHP: 5057,
    baseDef: 592,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.9,
        pow: 0.8,
        flat: () => elements.caster_max_hp.value() * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,

      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.05 : 0.8,
        pow: 0.95,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  kizuna_ai: {
    name: 'Kizuna AI',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 576,
    baseHP: 5700,
    baseDef: 743,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.14,
    barrierEnhance: 's3',
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.5,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        enhance: [0.05, 0.1, 0.15]
      },
    }
  },
  kluri: {
    name: 'Kluri',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 703,
    baseDef: 596,
    baseHP: 5914,
    form: [elements.caster_defense],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 0.9,
        flat: () => elements.caster_defense.value() * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.15],
        single: true,
      }
    }
  },
  krau: {
    name: 'Krau',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 839,
    baseHP: 6405,
    baseDef: 752,
    form: [elements.caster_max_hp, elements.caster_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => 0.085 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 8.5 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => 0.13 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 13 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        noCrit: true,
        rate: 0.3,
        pow: 1,
        flat: () => 0.53571 * Math.max(elements.caster_max_hp.value() - elements.caster_hp.value(), 0),
        flatTip: () => ({ caster_lost_hp: 53.571 }),
        penetrate: () => 1.0,
        single: true,
      }
    }
  },
  laia: {
    name: 'Laia',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 984,
    baseHP: 6266,
    baseDef: 637,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => 0.01 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      },
      s3: {
        soulburn: true,
        hpScaling: true,
        noCrit: true,
        rate: 0.3,
        pow: 1,
        flat: (soulburn) => (soulburn ? 0.32 : 0.2) * elements.caster_max_hp.value(),
        flatTip: (soulburn) => ({ caster_max_hp: soulburn ? 32 : 20 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        penetrate: () => 1.0,
        isSingle: () => true,
      }
    }
  },
  landy: {
    name: 'Landy',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 1158,
    baseHP: 6002,
    baseDef: 553,
    form: [elements.caster_full_fighting_spirit, elements.attack_skill_stack_3],
    atkUp: () => {
      let boost = 0.15;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.landy.skills.s2.enhance[i];
      }

      return 1 + elements.attack_skill_stack_3.value() * boost;
    },
    skills: {
      s1: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.005, 0.005, 0.01, 0.01, 0.02]
      },
      s3: {
        aoe: true,
        rate: 0.9,
        pow: 1,
        penetrate: () => elements.caster_full_fighting_spirit.value() ? 0.5 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1]
      }
    }
  },
  last_piece_karin: {
    name: 'Last Piece Karin',
    element: element.light,
    classType: classType.thief,
    baseAtk: 1029,
    baseHP: 5097,
    baseDef: 473,
    barrier: (hero) => hero.getAtk() * 0.65,
    form: [elements.caster_speed, elements.target_max_hp, elements.caster_has_neo_phantom_sword],
    skills: {
      s1: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.5 : 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        flat: () => elements.caster_has_neo_phantom_sword.value() ? elements.target_max_hp.value() * 0.2 : 0,
        flatTip: () => ({ target_max_hp: 20 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
        noTrans: elements.caster_has_neo_phantom_sword.value() ? true : false
      },
      s2: {
        spdScaling: true,
        rate: 1.5,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.0015,
        multTip: () => ({ caster_speed: 0.15 }),
        flat: () => elements.caster_has_neo_phantom_sword.value() ? elements.target_max_hp.value() * 0.2 : 0,
        flatTip: () => ({ target_max_hp: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
        noTrans: elements.caster_has_neo_phantom_sword.value()
      }
    }
  },
  last_rider_krau: {
    name: 'Last Rider Krau',
    element: element.light,
    classType: classType.knight,
    baseAtk: 839,
    baseHP: 6405,
    baseDef: 752,
    form: [elements.caster_max_hp, elements.attack_skill_stack_3, elements.caster_speed],
    barrier: () => elements.caster_max_hp.value() * 0.1,
    barrierEnhance: 's2',
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => 0.1 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
      },
      s3: {
        hpScaling: true,
        spdScaling: true,
        noCrit: true,
        rate: 0.3,
        pow: 1,
        flat: () => 0.06 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 6 }),
        mult: () => 1 + (elements.attack_skill_stack_3.value() * 0.2) + (elements.caster_speed.value() * 0.001125),
        multTip: () => ({ per_stack: 20, caster_speed: 0.1125 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  // last_rider_krau_old: {
  //   name: 'Last Rider Krau (Pre-Balance)',
  //   element: element.light,
  //   classType: classType.knight,
  //   baseAtk: 839,
  //   form: [elements.caster_max_hp, elements.attack_skill_stack_3],
  //   barrier: () => elements.caster_max_hp.value()*0.07,
  //   barrierEnhance: 's2',
  //   skills: {
  //     s1: {
  //       rate: 0.7,
  //       pow: 1,
  //       flat: () => 0.1*elements.caster_max_hp.value(),
  //       flatTip: () => ({ caster_max_hp: 10 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
  //     },
  //     s3: {
  //       noCrit: true,
  //       rate: 0.3,
  //       pow: 1,
  //       flat: () => 0.06*elements.caster_max_hp.value(),
  //       flatTip: () => ({ caster_max_hp: 6 }),
  //       mult: () => 1 + elements.attack_skill_stack_3.value()*0.2,
  //       multTip: () => ({ per_stack: 20 }),
  //       penetrate: () => 1.0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     }
  //   }
  // },
  leah: {
    name: 'Leah',
    element: element.earth,
    classType: classType.ranger,
    form: [elements.caster_speed],
    baseAtk: 1081,
    baseHP: 4450,
    baseDef: 504,
    skills: {
      s1:{
        rate: 0.9,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        name: 'Explosive Fire',
        spdScaling: true,
        rate: 1.2,
        pow: 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.001,
        multTip: () => ({ casterSpeed: 0.1 }),
        enhance_from: 's1',
        single: true,
      },
    }
  },
  lena: {
    name: 'Lena',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 951,
    baseHP: 5517,
    baseDef: 583,
    form: [elements.target_hp_pc],
    skills: {
      s1: {
        rate: 1.15,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.2 : 1,
        pow: 1,
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.002,
        multTip: () => ({ target_lost_hp_pc: 0.2 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
      },
    }
  },
  leo: {
    name: 'Leo',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 930,
    baseHP: 5380,
    baseDef: 564,
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 1.35,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.8,
        pow: 0.8,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  lethe: {
    name: 'Lethe',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 885,
    baseHP: 6149,
    baseDef: 613,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        hpScaling: true,
        name: infoLabel('lethe_call_of_the_abyss'),
        rate: 0.3,
        pow: 1.3,
        flat: () => elements.caster_max_hp.value() * 0.22,
        flatTip: () => ({caster_max_hp: 22}),
        penetrate: () => 1,
        noCrit: true,
        isExtra: true,
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1.05,
        enhance: [0.0, 0.1, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  lidica: {
    name: 'Lidica',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 1283,
    baseHP: 4976,
    baseDef: 536,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1.6,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  lilias: {
    name: 'Lilias',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 821,
    baseHP: 6751,
    baseDef: 648,
    barrier: () => elements.caster_max_hp.value() * 0.2,
    barrierEnhance: 's2',
    form: [elements.caster_max_hp, elements.highest_ally_attack, elements.exclusive_equipment_3],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.8,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.1, 0.15]
      },
      s3: {
        rate: 1,
        pow: 1,
        atk: () =>  elements.highest_ally_attack.value(),
        noBuff: true,
        exEq: () => elements.exclusive_equipment_3.value() ? 0.2 : 0,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
      }
    }
  },
  // lilias_old: {
  //   name: 'Lilias (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.knight,
  //   baseAtk: 821,
  //   form: [elements.caster_max_hp, elements.highest_ally_attack],
  //   skills: {
  //     s1: {
  //       rate: 0.8,
  //       pow: 0.95,
  //       flat: () => elements.caster_max_hp.value()*0.12,
  //       flatTip: () => ({ caster_max_hp: 12 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 0.9,
  //       pow: 1,
  //       atk: () =>  elements.highest_ally_attack.value(),
  //       noBuff: true,
  //       enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
  //       aoe: true,
  //     }
  //   }
  // },
  lilibet: {
    name: 'Lilibet',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6266,
    baseDef: 627,
    form: [elements.exclusive_equipment_1, elements.exclusive_equipment_3],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        exEq: () => elements.exclusive_equipment_1.value() ? 0.2 : 0,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.6 : 2,
        pow: 0.95,
        exEq: () => elements.exclusive_equipment_3.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  lilka: {
    name: 'Lilka',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 1005,
    baseHP: 4693,
    baseDef: 532,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1,],
        single: true,
      },
      s3: {
        rate: 1.9,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  lionheart_cermia: {
    name: 'Lionheart Cermia',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 966,
    baseDef: 668,
    baseHP: 5663,
    form: [elements.caster_defense],
    skills: {
      s1: {
        defenseScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 1 : 0.6,
        pow: 0.9,
        flat: (soulburn) => elements.caster_defense.value() * (soulburn ? 1.6 : 1.0),
        flatTip: (soulburn) => ({ caster_defense: (soulburn ? 160 : 100) }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 0.5,
        pow: 0.9,
        flat: () => elements.caster_defense.value() * 1.35,
        flatTip: () => ({ caster_defense: 135 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
    }
  },
  // lionheart_cermia_old: {
  //   name: 'Lionheart Cermia (Pre-Balance)',
  //   element: element.light,
  //   classType: classType.warrior,
  //   baseAtk: 966,
  //   baseDef: 668,
  //   baseHP: 5663,
  //   form: [elements.caster_defense],
  //   skills: {
  //     s1: {
  //       defenseScaling: true,
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1 : 0.6,
  //       pow: 0.9,
  //       flat: (soulburn) => elements.caster_defense.value() * (soulburn ? 1.6 : 1.0),
  //       flatTip: (soulburn) => ({ caster_defense: (soulburn ? 160 : 100) }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     },
  //     s3: {
  //       defenseScaling: true,
  //       rate: 0.3,
  //       pow: 0.9,
  //       flat: () => elements.caster_defense.value() * 1.35,
  //       flatTip: () => ({ caster_defense: 135 }),
  //       penetrate: () => 0.5,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       aoe: true,
  //     },
  //   }
  // },
  little_queen_charlotte: {
    name: 'Little Queen Charlotte',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6266,
    baseDef: 627,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        mult: () => document.getElementById('elem-adv').checked ? 1.5 : 1,
        multTip: () => ({ elemental_advantage: 50 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        single: true,
      },
      s3_splash: {
        name: infoLabel('lqc_s3_splash'),
        rate: 0,
        pow: 0,
        afterMath: () => document.getElementById('elem-adv').checked ? { atkPercent: 1.2, penetrate: 0.7 } : null,
        noCrit: true,
        noMiss: true,
      }
    }
  },
  // little_queen_charlotte_old: {
  //   name: 'Little Queen Charlotte (Pre-Balance)',
  //   element: element.light,
  //   classType: classType.warrior,
  //   baseAtk: 1119,
  //   baseHP: 6266,
  //   baseDef: 627,
  //   skills: {
  //     s1: {
  //       rate: 1.2,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 1.5,
  //       pow: 1,
  //       mult: () => document.getElementById('elem-adv').checked ? 1.3 : 1,
  //       multTip: () => ({ elemental_advantage: 30 }),
  //       penetrate: () => 0.5,
  //       enhance: [0.05, 0.05, 0, 0.05, 0.15],
  //       single: true,
  //     },
  //     s3_splash: {
  //       name: infoLabel('lqc_s3_splash'),
  //       rate: 0,
  //       pow: 0,
  //       afterMath: () => document.getElementById('elem-adv').checked ? { atkPercent: 1.2, penetrate: 0.7 } : null,
  //       noCrit: true,
  //       noMiss: true,
  //     }
  //   }
  // },
  lone_crescent_bellona: {
    name: 'Lone Crescent Bellona',
    element: element.dark,
    classType: classType.warrior,
    form: [elements.caster_has_buff, elements.attack_skill_stack_5],
    baseAtk: 1208,
    baseHP: 6488,
    baseDef: 616,
    atkUp: () => 1 + elements.attack_skill_stack_5.value() * 0.1,
    skills: {
      s1: {
        onlyCrit: true,
        rate: (soulburn) => soulburn ? 1.6 : 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
        soulburn: true
      },
      s2: {
        onlyCrit: true,
        rate: 0.6,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        aoe: true,
      },
      s3: {
        onlyCrit: true,
        rate: 1.7,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  // lone_crescent_bellona_old: {
  //   name: 'Lone Crescent Bellona (Pre-Balance)',
  //   element: element.dark,
  //   classType: classType.warrior,
  //   form: [elements.caster_has_buff, elements.attack_skill_stack_5],
  //   baseAtk: 1208,
  //   baseHP: 6488,
  //   baseDef: 616,
  //   atkUp: () => 1 + elements.attack_skill_stack_5.value() * 0.1,
  //   skills: {
  //     s1: {
  //       onlyCrit: true,
  //       rate: 0.9,
  //       pow: 0.95,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       onlyCrit: true,
  //       rate: 0.6,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isExtra: true,
  //       aoe: true,
  //     },
  //     s3: {
  //       onlyCrit: true,
  //       rate: 1.5,
  //       pow: 1,
  //       mult: () => 1 + (elements.caster_has_buff.value() ? 0.3 : 0),
  //       multTip: () => ({ caster_has_buff: 30 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     }
  //   }
  // },
  lorina: {
    name: 'Lorina',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1144,
    baseHP: 4895,
    baseDef: 543,
    form: [elements.target_max_hp, elements.target_hp_pc, elements.attack_skill_stack_5],
    atkUp: () => {
      let boost = 0.1;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.lorina.skills.s2.enhance[i];
      }

      return 1 + elements.attack_skill_stack_5.value() * boost;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        flat: () => elements.target_max_hp.value() * 0.02,
        flatTip: () => ({ target_max_hp: 2 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.005, 0.005, 0.01, 0.01, 0.02]
      },
      s3: {
        rate: 1.5,
        pow: 0.95,
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.005,
        multTip: () => ({ target_lost_hp_pc: 0.5 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  lots: {
    name: 'Lots',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 603,
    baseHP: 4945,
    baseDef: 662,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  lua: {
    name: 'Lua',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 993,
    baseHP: 6002,
    baseDef: 611,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  lucy: {
    name: 'Lucy',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 558,
    baseHP: 4733,
    baseDef: 661,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  ludwig: {
    name: 'Ludwig',
    element: element.earth,
    classType: classType.mage,
    baseAtk: 1412,
    baseHP: 4248,
    baseDef: 645,
    form: [elements.caster_invincible, elements.exclusive_equipment_1, elements.exclusive_equipment_3],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.65,
        pow: 1.05,
        exEq: () => elements.exclusive_equipment_1.value() ? 0.1 : 0,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 0.95,
        penetrate: () => elements.caster_invincible.value() ? 0.6 : 0.3,
        exEq: () => elements.exclusive_equipment_3.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  luluca: {
    name: 'Luluca',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1316,
    baseHP: 4777,
    baseDef: 715,
    form: [elements.target_hp_pc, elements.s3_stack],
    barrier: (hero) => hero.getAtk() * (1 + elements.s3_stack.value() * 0.2) * 0.375,
    barrierEnhance: 's2',
    atkUp: () => 1 + elements.s3_stack.value() * 0.2,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (1 - (elements.target_hp_pc.value() / 100)) * 0.2,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0, 0.05, 0.1]
      },
      s3: {
        rate: 0.9,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  luna: {
    name: 'Luna',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6266,
    baseDef: 627,
    form: [elements.caster_hp_above_50pc, elements.nb_hits],
    atkUp: () => {
      if (!elements.caster_hp_above_50pc.value()) {
        return 1;
      }

      let mult = 1.2;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        mult += heroes.luna.skills.s2.enhance[i];
      }

      return mult;
    },
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => (soulburn ? 3 : elements.nb_hits.value()) * 0.7,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.01, 0.02, 0.02, 0.02, 0.03]
      },
      s3: {
        rate: 1.1,
        pow: 1.05,
        penetrate: () => 0.5,
        enhance: [0.05, 0, 0.1, 0, 0.1],
        elemAdv: () => true,
        single: true,
      }
    }
  },
  magic_scholar_doris: {
    name: 'Magic Scholar Doris',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 540,
    baseHP: 5319,
    baseDef: 705,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  maid_chloe: {
    name: 'Maid Chloe',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 640,
    baseHP: 5340,
    baseDef: 720,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      }
    }
  },
  martial_artist_ken: {
    name: 'Martial Artist Ken',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1359,
    baseHP: 5542,
    baseDef: 585,
    form: [elements.caster_hp_pc],
    skills: {
      s1: {
        rate: (soulburn) => soulburn ? 1.3 : 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
        soulburn: true,
        onlyCrit: (soulburn) => soulburn
      },
      s2: {
        onlyCrit: true,
        rate: 0.95,
        pow: 1,
        mult: () => {
          return (1 + (100 - elements.caster_hp_pc.value()) * 0.004);
        },
        multTip: () => ({ caster_lost_hp_pc: 40 }),
        penetrate: () => 0.4,
        enhance: [0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  // martial_artist_ken_old: {
  //   name: 'Martial Artist Ken (Pre-Balance)',
  //   element: element.dark,
  //   classType: classType.warrior,
  //   baseAtk: 1359,
  //   baseHP: 5542,
  //   baseDef: 585,
  //   form: [elements.caster_hp_pc],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 0.95,
  //       enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
  //       single: true,
  //     },
  //     s2: {
  //       onlyCrit: true,
  //       rate: 1.2,
  //       pow: 0.95,
  //       mult: () => {
  //         let extra = 0;
  //         for (let i = 0; i < Number(document.getElementById('molagora-s1').value); i++) {
  //           extra += heroes.martial_artist_ken.skills.s1.enhance[i];
  //         }
  //         return (1 + (100 - elements.caster_hp_pc.value()) * 0.004 + extra);
  //       },
  //       multTip: () => ({ caster_lost_hp_pc: 40 }),
  //       enhance: [0.05, 0.1, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.1 : 0.9,
  //       pow: 1,
  //       enhance: [0.05, 0, 0, 0.1, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  mascot_hazel: {
    name: 'Mascot Hazel',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 762,
    baseHP: 4450,
    baseDef: 662,
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  maya: {
    name: 'Maya',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 821,
    baseDef: 648,
    baseHP: 6796,
    form: [elements.caster_defense],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 0.95,
        flat: () => elements.caster_defense.value() * 0.75,
        flatTip: () => ({ caster_defense: 75 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        defenseScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.8,
        flatTip: () => ({ caster_defense: 80 }),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  mediator_kawerik: {
    name: 'Mediator Kawerik',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 966,
    baseHP: 7323,
    baseDef: 657,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 1,
        pow: 1,
        flat: () => 0.04 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 1.5,
        pow: 1,
        flat: () => 0.09 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 9 }),
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  melany: {
    name: 'Melany',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 951,
    baseHP: 5517,
    baseDef: 583,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.1, 0, 0.1, 0, 0.1],
        single: true
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true
      }
    }
  },
  melissa: {
    name: 'Melissa',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1412,
    baseHP: 4248,
    baseDef: 645,
    form: [elements.caster_hp_pc, elements.exclusive_equipment_2],
    skills: {
      s1: {
        rate: 1,
        pow: 1.1,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.0035,
        multTip: () => ({ caster_lost_hp_pc: 0.35 }),
        enhance: [0.05, 0, 0.05, 0, 0.1],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 0.95,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.003,
        multTip: () => ({ caster_lost_hp_pc: 0.3 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
        single: true,
      },
      s3: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  // melissa_old: {
  //   name: 'Melissa (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.mage,
  //   baseAtk: 1412,
  //   form: [elements.caster_hp_pc, elements.exclusive_equipment_2],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 1.1,
  //       mult: () => 1 + (100-elements.caster_hp_pc.value())*0.0035,
  //       multTip: () => ({ caster_lost_hp_pc: 0.35 }),
  //       enhance: [0.05, 0, 0.05, 0, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 1.5,
  //       pow: 0.95,
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
  //       exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
  //       single: true,
  //     },
  //     s3: {
  //       rate: 1.2,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     }
  //   }
  // },
  mercedes: {
    name: 'Mercedes',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1187,
    baseHP: 4491,
    baseDef: 627,
    form: [elements.nb_targets, elements.target_hp_pc, elements.caster_immense_power],
    atkUp: () => elements.caster_immense_power.value() ? 1.15 : 1,
    skills: {
      s1: {
        rate: 0.8,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 0.9 : 0.7,
        pow: 0.9,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 1: return 1.9;
          case 2: return 1.6;
          case 3: return 1.3;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 30 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      },
      s2_bis: {
        name: infoLabel('s2_wave_2'),
        rate: 0.35,
        pow: 0.9,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 1: return 1.9;
          case 2: return 1.6;
          case 3: return 1.3;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 30 }),
        enhance_from: 's2',
        aoe: true,
      },
      s3: {
        rate: 1.15,
        pow: 0.95,
        critDmgBoost: () => 0.2,
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.003,
        multTip: () => ({ caster_lost_hp_pc: 0.3 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  mercenary_helga: {
    name: 'Mercenary Helga',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1000,
    baseHP: 4895,
    baseDef: 518,
    form: [elements.skill_tree_completed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (elements.skill_tree_completed.value() ? 0.1 : 0),
        multTip: () => ({ skill_tree: 10 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
      s2: {
        rate: 1.55,
        pow: 0.95,
        mult: () => 1 + (elements.skill_tree_completed.value() ? 0.05 : 0),
        multTip: () => ({ skill_tree: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  midnight_gala_lilias: {
    name: 'Midnight Gala Lilias',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1208,
    baseHP: 5178,
    baseDef: 508,
    form: [elements.caster_max_hp, elements.target_max_hp],
    skills: {
      s1: {
        onlyCrit: true,
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        onlyCrit: true,
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        penetrate:() => elements.caster_max_hp.value() < elements.target_max_hp.value()
          ? Math.min((elements.target_max_hp.value() - elements.caster_max_hp.value()) * 0.0000625, 1)
          : 0,
        penetrateTip: () => ({ caster_vs_target_hp_diff: 6.25 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  mighty_scout: {
    name: 'Mighty Scout (Mouse)',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 919,
    baseHP: 5259,
    baseDef: 525,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.35,
        pow: 1,
        penetrate: () => 0.7,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  milim: {
    name: 'Milim',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1359,
    baseHP: 4895,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1.3,
        aoe: true,
      },
      s3: {
        rate: 1.7,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        single: true,
      },
    }
  },
  mirsa: {
    name: 'Mirsa',
    element: element.light,
    classType: classType.thief,
    baseAtk: 885,
    baseHP: 4410,
    baseDef: 501,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        single: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.5 : 1.8,
        pow: 0.85,
        mult: () => 1 + elements.caster_speed.value() * 0.0015,
        multTip: () => ({ caster_speed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.15],
        single: true,
      }
    }
  },
  mistychain: {
    name: 'Mistychain',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1244,
    baseHP: 3925,
    baseDef: 606,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.3,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.5,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  montmorancy: {
    name: 'Montmorancy',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 540,
    baseHP: 4900,
    baseDef: 729,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  moon_bunny_dominiel: {
    name: 'Moon Bunny Dominiel',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 649,
    baseHP: 4572,
    baseDef: 631,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.20,
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  // moon_bunny_dominiel_old: {
  //   name: 'Moon Bunny Dominiel (Pre-Balance)',
  //   element: element.light,
  //   classType: classType.soul_weaver,
  //   baseAtk: 649,
  //   baseHP: 4572,
  //   baseDef: 631,
  //   form: [elements.caster_max_hp],
  //   barrier: () => elements.caster_max_hp.value() * 0.21,
  //   barrierEnhance: 's2',
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 0.9,
  //       enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.1]
  //     },
  //   }
  // },
  mort: {
    name: 'Mort',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 957,
    baseHP: 6148,
    baseDef: 634,
    form: [elements.caster_max_hp, elements.caster_enrage, elements.exclusive_equipment_3],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.08,
        flatTip: () => ({ caster_max_hp: 8 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.15,
        flatTip: () => ({ caster_max_hp: 15 }),
        exEq: () => elements.exclusive_equipment_3.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  mucacha: {
    name: 'Mucacha',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1000,
    baseHP: 4895,
    baseDef: 518,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 1.5,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  mui: {
    name: 'Mui',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1039,
    baseHP: 5340,
    baseDef: 617,
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  // mui_old: {
  //   name: 'Mui (Pre-Balance)',
  //   element: element.earth,
  //   classType: classType.warrior,
  //   baseAtk: 1039,
  //   dot: [dot.bleed],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 1,
  //       pow: 0.9,
  //       enhance: [0.05, 0, 0, 0.1, 0.15],
  //       aoe: true,
  //     },
  //     s3: {
  //       rate: 1,
  //       pow: 0.95,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  muse_rima: {
    name: 'Muse Rima',
    element: element.ice,
    classType: classType.ranger,
    form: [elements.skill_tree_completed],
    baseAtk: 822,
    baseHP: 4693,
    baseDef: 561,
    skills: {
      s1: {
        rate: 1,
        pow: 0.8,
        mult: () => 1 + (elements.skill_tree_completed.value() ? 0.05 : 0),
        multTip: () => ({ skill_tree: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 1.3,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  muwi: {
    name: 'Muwi',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1039,
    baseHP: 5517,
    baseDef: 452,
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.25 : 1,
        pow: 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  nahkwol: {
    name: 'Nahkwol',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 1003,
    baseHP: 5704,
    baseDef: 585,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  navy_captain_landy: {
    name: 'Navy Captain Landy',
    element: element.light,
    classType: classType.knight,
    baseAtk: 1134,
    baseDef: 662,
    baseHP: 5825,
    form: [elements.attack_skill_stack_5],
    atkUp: () => {
      return 1 + elements.attack_skill_stack_5.value() * 0.1;
    },
    skills: {
      s1: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        name: infoLabel('navy_captain_landy_salvo_fire'),
        rate: 0.8,
        pow: 1.3,
        isExtra: true,
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1.05,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        penetrate: () => 0.6,
        aoe: true,
      }
    }
  },
  nemunas: {
    name: 'Nemunas',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 920,
    baseHP: 4855,
    baseDef: 525,
    form: [elements.target_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.15],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.7 : 1,
        pow: 0.8,
        flat: (soulburn) => elements.target_max_hp.value() * (soulburn ? 0.085 : 0.05),
        flatTip: (soulburn) => ({ target_max_hp: soulburn ? 8.5 : 5 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.15],
        single: true,
      }
    }
  },
  ocean_breeze_luluca: {
    name: 'Ocean Breeze Luluca',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 649,
    baseHP: 5254,
    baseDef: 694,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        aoe: true,
      }
    }
  },
  operator_sigret: {
    name: 'Operator Sigret',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 1079,
    baseHP: 5502,
    baseDef: 564,
    form: [elements.target_has_barrier, elements.caster_speed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 0.75,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        penetrate: () => elements.target_has_barrier.value() ? 1.0 : 0.5,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 1,
        pow: 1.1,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  orte: {
    name: 'Orte',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 857,
    baseHP: 4531,
    baseDef: 483,
    form: [elements.caster_perception, elements.caster_speed, elements.target_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.65,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 0.7,
        pow: 0.95,
        penetrate: () => {
          const casterSpd = elements.caster_speed.value();
          const targetSpd = elements.target_speed.value();

          const penDiff = (casterSpd - targetSpd) * 0.003;
          return Math.min(Math.max(0, penDiff) + 0.3, 0.7);
        },
        penetrateTip: () => ({ caster_target_spd_diff: 0.3 }),
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  otillie: {
    name: 'Otillie',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 885,
    baseHP: 4693,
    baseDef: 617,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 1,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      }
    }
  },
  pavel: {
    name: 'Pavel',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 1283,
    baseHP: 4976,
    baseDef: 536,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1.1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.05, 0, 0.1],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 0.8,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        spdScaling: true,
        rate: 1.6,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.0015,
        multTip: () => ({ caster_speed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        single: true,
      }
    }
  },
  peacemaker_furious: {
    name: 'Peacemaker Furious',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 970,
    baseDef: 557,
    baseHP: 5935,
    form: [elements.caster_defense, elements.caster_fury],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 0.9,
        flat: () => elements.caster_defense.value() * 0.8,
        flatTip: () => ({ caster_defense: 80 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 0.5,
        pow: 0.9,
        flat: () => elements.caster_defense.value() * 1.3,
        flatTip: () => ({ caster_defense: 130 }),
        penetrate: () => {
          const targetDef = elements.target_defense.value();
          const casterDef = elements.caster_defense.value();

          const penDiffMult = (casterDef - targetDef) * 0.00032;

          return Math.min(Math.max(0, penDiffMult), 0.6);
        },
        penetrateTip: () => ({caster_target_def_diff: 0.032}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
    }
  },
  pearlhorizon: {
    name: 'Pearlhorizon',
    element: element.earth,
    classType: classType.mage,
    baseAtk: 921,
    baseHP: 4855,
    baseDef: 631,
    form: [elements.target_max_hp, elements.target_has_sleep],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.6,
        pow: 1,
        aoe: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.9,
        extraDmg: () => elements.target_has_sleep.value() ? elements.target_max_hp.value() * 0.2 : 0,
        extraDmgTip: () => ({ target_max_hp: elements.target_has_sleep.value() ? 20 : 0 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      },
    }
  },
  peira: {
    name: 'Peira',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1075,
    baseHP: 5562,
    baseDef: 487,
    barrier: () => {
      let boost = 1.0;
      for (let i = 0; i < Number(document.getElementById('molagora-s3').value); i++) {
        boost += heroes.peira.skills.s3.enhance[i];
      }
      return 180 * boost * 60;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
      }
    }
  },
  penelope: {
    name: 'Penelope',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 1039,
    baseHP: 5517,
    baseDef: 452,
    form: [elements.attack_skill_stack_3],
    atkUp: () => 1 + elements.attack_skill_stack_3.value() * 0.15,
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.6 : 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 1.2,
        enhance: [0, 0.1, 0, 0, 0],
        single: true,
      },
    }
  },
  pirate_captain_flan: {
    name: 'Pirate Captain Flan',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 1182,
    baseHP: 5299,
    baseDef: 571,
    form: [elements.target_burn_detonate, elements.target_bomb_detonate],
    dot: [dot.burn, dot.bomb],
    skills: {
      s1: {
        rate: 0.7,
        pow: 0.95,
        detonate: [dot.burn, dot.bomb],
        detonation: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
        noCrit: true,
      },
      s3: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
        noCrit: true,
      },
    }
  },
  politis: {
    name: 'Politis',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1197,
    baseHP: 4572,
    baseDef: 683,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      },
    }
  },
  purrgis: {
    name: 'Purrgis',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6091,
    baseDef: 594,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 1,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        name: infoLabel('s2_counter'),
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance_from: 's1',
        aoe: true,
      },
      s3: {
        hpScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.05 : 0.8,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  pyllis: {
    name: 'Pyllis',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 685,
    baseDef: 703,
    baseHP: 6403,
    form: [elements.caster_defense, elements.caster_attacked_stack_3],
    barrier: () => elements.caster_defense.value() * (1 + elements.caster_attacked_stack_3.value() * 0.1) * 0.6,
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_defense.value() * (1 + elements.caster_attacked_stack_3.value() * 0.1) * 0.5,
        flatTip: () => ({ caster_defense: 50, per_stack: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 1.3,
        pow: 0.95,
        flat: () => elements.caster_defense.value() * (1 + elements.caster_attacked_stack_3.value() * 0.1) * 0.7,
        flatTip: () => ({ caster_defense: 70, per_stack: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  ram: {
    name: 'Ram',
    element: element.earth,
    classType: classType.mage,
    baseAtk: 1556,
    baseHP: 4572,
    baseDef: 683,
    innateAtkUp: () => 0.3,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true
      },
      s1_soulburn: {
        name: infoLabel('s1_soulburn'),
        rate: 1,
        pow: 1,
        enhance_from: 's1',
        aoe: true,
      },
      s3: {
        rate: 1.8, 
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true
      }
    }
  },
  ran: {
    name: 'Ran',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1119,
    baseHP: 5380,
    baseDef: 483,
    form: [elements.caster_speed, elements.target_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        penetrate: () => 0.2,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 0.8,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075 + elements.target_speed.value() * 0.0015,
        multTip: () => ({ caster_speed: 0.075, target_speed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  ras: {
    name: 'Ras',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 758,
    baseHP: 5826,
    baseDef: 672,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.9,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.9,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
    }
  },
  ravi: {
    name: 'Ravi',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 966,
    baseHP: 7323,
    baseDef: 657,
    form: [elements.attack_skill_stack_5],
    atkUp: () => 1 + elements.attack_skill_stack_5.value() * 0.15,
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.5 : 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.85,
        pow: 0.95,
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  ray: {
    name: 'Ray',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 694,
    baseHP: 4855,
    baseDef: 655,
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.1, 0.15],
        single: true,
      }
    }
  },
  rem:{
    name: 'Rem',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 1208,
    baseHP: 6488,
    baseDef: 616,
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        canExtra: true,
        single: true
      },
      s2: {
        rate: 0.8, 
        pow: 1.3,
        aoe: true
      },
      s3: {
        rate: 1, 
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true
      }
    }
  },
  remnant_violet: {
    name: 'Remnant Violet',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 1283,
    baseHP: 5138,
    baseDef: 522,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.3,
        pow: 1,
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  requiem_roana: {
    name: 'Requiem Roana',
    element: element.dark,
    classType: classType.mage,
    form: [elements.attack_skill_stack_3],
    baseAtk: 1316,
    baseHP: 4777,
    baseDef: 715,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        afterMath: (hitType) => hitType !== hitTypes.miss ? ({ atkPercent: 0.5, penetrate: 0.7 }) : null,
        noCrit: true,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 0.3,
        pow: 1,
        mult: () => 1 + elements.attack_skill_stack_3.value() * 0.15,
        multTip: () => ({per_stack: 15}),
        penetrate: () => 1.0,
        noCrit: true,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true
      },
    }
  },
  requiemroar: {
    name: 'Requiemroar',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 842,
    baseHP: 4046,
    baseDef: 613,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.7 : 1.8,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
    }
  },
  researcher_carrot: {
    name: 'Researcher Carrot',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1039,
    baseHP: 3925,
    baseDef: 606,
    form: [elements.target_burn_detonate],
    dot: [dot.burn],
    barrier: (hero) => hero.getAtk() * 0.6,
    barrierEnhance: 's2',
    skills: {
      s1: {
        pow: 0.95,
        rate: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        detonate: dot.burn,
        detonation: () => 1.1,
        single: true,
      },
      s2: {
        enhance: [0.15, 0.15]
      },
      s3: {
        pow: 1,
        rate: 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  righteous_thief_roozid: {
    name: 'Righteous Thief Roozid',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 812,
    baseHP: 4370,
    baseDef: 462,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.8,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 1.2,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  rikoris: {
    name: 'Rikoris',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 951,
    baseHP: 5517,
    baseDef: 583,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        aoe: true,
      }
    }
  },
  rima: {
    name: 'Rima',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 822,
    baseHP: 4693,
    baseDef: 561,
    skills: {
      s1: {
        rate: 1,
        pow: 0.8,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 1.3,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  rimuru: {
    name: 'Rimuru',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6266,
    baseDef: 627,
    form: [elements.allies_nb_buff],
    skills: {
      s1: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.65,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 1,
        fixed: (hitType) => (hitType !== hitTypes.miss) ? Math.min(5000 + (elements.allies_nb_buff.value() * 625), 10000) : 0,
        fixedTip: () => ({ allies_buff: 625 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  rin: {
    name: 'Rin',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 594,
    baseHP: 5057,
    baseDef: 691,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({caster_max_hp: 7}),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  riza_hawkeye: {
    name: 'Riza Hawkeye',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 1003,
    baseHP: 5704,
    baseDef: 585,
    skills: {
      s1: {
        rate: 1.15,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 2,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  roaming_warrior_leo: {
    name: 'Roaming Warrior Leo',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 1088,
    baseHP: 5016,
    baseDef: 553,
    form: [elements.target_has_debuff],
    dot: [dot.bomb],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => elements.target_has_debuff.value() ? 1.1 : 1,
        multTip: () => ({ target_has_debuff: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.8,
        pow: 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  roana: {
    name: 'Roana',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 621,
    baseHP: 5474,
    baseDef: 802,
    form: [elements.caster_max_hp],
    barrierSkills: ['S1', 'S3'],
    barrier: () => {
      const scale = [0, 0.05, 0, 0.1, 0, 0.1, 0];
      let boost = 1.0;
      for (let i = 0; i < Number(document.getElementById('molagora-s1').value); i++) {
        boost += scale[i];
      }

      return elements.caster_max_hp.value() * 0.1 * boost;
    },
    barrier2: () => {
      return elements.caster_max_hp.value() * 0.15;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      }
    }
  },
  romann: {
    name: 'Romann',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1109,
    baseHP: 4329,
    baseDef: 655,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        rate: 0.9,
        pow: 0.85,
        enhance: [0.05, 0.1, 0, 0.15, 0.15],
        aoe: true,
      },
    }
  },
  romann_old: {
    name: 'Romann (Pre-Balance)',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1109,
    baseHP: 4329,
    baseDef: 655,
    form: [elements.target_has_buff],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        rate: 0.9,
        pow: 0.85,
        mult: () => elements.target_has_buff.value() ? 1.3 : 1,
        multTip: () => ({ target_has_buff: 30 }),
        enhance: [0.05, 0.1, 0, 0.15, 0.15],
        aoe: true,
      },
    }
  },
  roozid: {
    name: 'Roozid',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 812,
    baseHP: 4370,
    baseDef: 462,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.8,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 1.2,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  rose: {
    name: 'Rose',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 821,
    baseDef: 703,
    baseHP: 6266,
    form: [elements.caster_defense],
    barrier: () => elements.caster_defense.value(),
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.7,
        flatTip: () => ({caster_defense: 70}),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  roy_mustang: {
    name: 'Roy Mustang',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1412,
    baseHP: 4248,
    baseDef: 645,
    form: [elements.caster_has_flame_alchemist, elements.nb_targets],
    atkUp: () => elements.caster_has_flame_alchemist.value() ? 1.2 : 1,
    skills: {
      s1: {
        rate: 0.8,
        pow: 1,
        penetrate: () => elements.caster_has_flame_alchemist.value() ? 0.5 : 0,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1.2,
        pow: 0.9,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 3:
            return 1.2;
          case 2:
            return 1.4;
          case 1:
            return 1.6;
          default:
            return 1;
          }
        },
        multTip: () => ({per_fewer_target: 20}),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  ruele_of_light: {
    name: 'Ruele of Light',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 621,
    baseHP: 5474,
    baseDef: 802,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.81,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({caster_max_hp: 7}),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  sage_baal_and_sezan: {
    name: 'Sage Baal & Sezan',
    element: element.light,
    classType: classType.mage,
    baseAtk: 1039,
    baseHP: 5299,
    baseDef: 673,
    form: [elements.caster_max_hp, elements.caster_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1.1,
        enhance: [0.05, 0, 0.05, 0, 0.1],
        single: true,
      },
      s2: {
        rate: 0.85,
        pow: 1.3,
        aoe: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        penetrate: () => 1.0,
        flat: () => 0.25 * Math.max(elements.caster_max_hp.value() - elements.caster_hp.value(), 0),
        flatTip: () => ({ caster_lost_hp: 25 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noCrit: true,
        single: true,
      }
    }
  },
  savior_adin: {
    name: 'Savior Adin',
    element: element.light,
    classType: classType.thief,
    baseAtk: 1081,
    baseHP: 4572,
    baseDef: 494,
    form: [elements.skill_tree_completed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1.3,
        aoe: true,
      },
      s3: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        penetrate: () => 0.5,
        mult: () => elements.skill_tree_completed.value() && document.getElementById('elem-adv').checked ? 1.2 : 1,
        multTip: () => ({ skill_tree_elemental: 20 }),
        single: true,
      },
    }
  },
  schuri: {
    name: 'Schuri',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 1068,
    baseHP: 5650,
    baseDef: 536,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  senya: {
    name: 'Senya',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 1445,
    baseDef: 645,
    baseHP: 6321,
    innateAtkUp: () => 0.3,
    barrier: (hero) => hero.getAtk() * 0.25,
    skills: {
      s1: {
        rate: 0.95,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noCrit: true,
        single: true,
      },
      s2: {
        rate: 0,
        pow: 0,
        afterMath: () => ({ atkPercent: 0.45, penetrate: 0.7 }),
        noCrit: true,
        noMiss: true,
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        noCrit: true,
        aoe: true,
      }
    }
  },
  shadow_knight_pyllis: {
    name: 'Shadow Knight Pyllis',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 685,
    baseDef: 703,
    baseHP: 6403,
    form: [elements.caster_defense, elements.caster_attacked_stack_3],
    barrier: () => elements.caster_defense.value() * (1 + elements.caster_attacked_stack_3.value() * 0.1) * 0.6,
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_defense.value() * (1 + elements.caster_attacked_stack_3.value() * 0.1) * 0.5,
        flatTip: () => ({ caster_defense: 50, per_stack: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 1.3,
        pow: 0.95,
        flat: () => elements.caster_defense.value() * (1 + elements.caster_attacked_stack_3.value() * 0.1) * 0.7,
        flatTip: () => ({ caster_defense: 70, per_stack: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  shepherd_jena: {
    name: 'Shepherd Jena',
    element: element.ice,
    classType: classType.mage,
    form: [elements.skill_tree_completed],
    baseAtk: 1063,
    baseHP: 4491,
    baseDef: 599,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 0.85,
        pow: 0.95,
        mult: () => elements.skill_tree_completed.value() ? 1.05 : 1,
        multTip: () => (elements.skill_tree_completed.value() ? {skill_tree: 5} : null),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  shooting_star_achates: {
    name: 'Shooting Star Achates',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 576,
    baseHP: 5700,
    baseDef: 743,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.1, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  shuna: {
    name: 'Shuna',
    element: element.fire,
    classType: classType.soul_weaver,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.18,
    barrierEnhance: 's2',
    baseAtk: 649,
    baseHP: 5254,
    baseDef: 694,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.75,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.025,
        flatTip: () => ({ caster_max_hp: 2.5 }),
        enhance: [0.1, 0, 0.1, 0, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.1, 0.1, 0, 0.1, 0.1]
      },
    }
  },
  seaside_bellona: {
    name: 'Seaside Bellona',
    element: element.ice,
    classType: classType.ranger,
    form: [elements.exclusive_equipment_2],
    baseAtk: 1182,
    baseHP: 5299,
    baseDef: 571,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
        enhance: [0.05, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  serene_purity_adin: {
    name: 'Serene Purity Adin',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1081,
    baseHP: 4572,
    baseDef: 494,
    form: [elements.skill_tree_completed],
    skills: {
      s1: {
        rate: 0.85,
        pow: 1.05,
        mult: () => elements.skill_tree_completed.value() ? 1.1 : 1,
        multTip: () => (elements.skill_tree_completed.value() ? {skill_tree: 10} : null),
        enhance: [0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
      s2: {
        rate: 0.6,
        pow: 1,
        mult: () => elements.skill_tree_completed.value() ? 1.1 : 1,
        multTip: () => (elements.skill_tree_completed.value() ? {skill_tree: 10} : null),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.3,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
    }
  },
  serila: {
    name: 'Serila',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1218,
    baseHP: 4521,
    baseDef: 683,
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.7,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      }
    }
  },
  // serila_old: {
  //   name: 'Serila (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.mage,
  //   baseAtk: 1218,
  //   baseHP: 4521,
  //   baseDef: 683,
  //   dot: [dot.burn],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       single: true,
  //     },
  //     s2: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 2 : 1.5,
  //       pow: 1.05,
  //       enhance: [0.1, 0, 0, 0, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 1.8,
  //       pow: 1.05,
  //       enhance: [0.1, 0, 0, 0, 0.15],
  //       single: true,
  //     }
  //   }
  // },
  sez: {
    name: 'Sez',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1228,
    baseHP: 6266,
    baseDef: 473,
    form: [elements.target_hp_pc],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s1_bis: {
        name: infoLabel('sez_encroach'),
        rate: 0.5,
        pow: 1,
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.003,
        multTip: () => ({ target_lost_hp_pc: 0.3 }),
        enhance_from: 's1',
        aoe: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 3.2 : 2.0,
        pow: 0.95,
        mult: (soulburn) => 1 + (100 - elements.target_hp_pc.value()) * (soulburn ? 0.007 : 0.003),
        multTip: (soulburn) => ({ target_lost_hp_pc: soulburn ? 0.7 : 0.3 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      },
      explosion: { // TODO: change this to be aftermath on s3 with an input for enemy killed?
        name: infoLabel('sez_explosion'),
        rate: 0,
        pow: 0,
        afterMath: () => ({ atkPercent: 1.5, penetrate: 0.7 }),
        noCrit: true,
        noMiss: true,
      }
    }
  },
  // sez_old: {
  //   name: 'Sez (Pre-Balance)',
  //   element: element.ice,
  //   classType: classType.thief,
  //   baseAtk: 1228,
  //   form: [elements.target_hp_pc],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 0.95,
  //       mult: () => 1 + (100-elements.target_hp_pc.value())*0.002,
  //       multTip: () => ({ target_lost_hp_pc: 0.2 }),
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 0.5,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       aoe: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 3.2 : 1.8,
  //       pow: 0.95,
  //       mult: (soulburn) => 1 + (100-elements.target_hp_pc.value())*(soulburn ? 0.007 : 0.003),
  //       multTip: (soulburn) => ({ target_lost_hp_pc: soulburn ? 0.7 : 0.3 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.15],
  //       single: true,
  //     },
  //     explosion: {
  //       name: infoLabel('sez_explosion'),
  //       rate: 0,
  //       pow: 0,
  //       afterMath: () => ({ atkPercent: 1.5, penetrate: 0.7 }),
  //       noCrit: true,
  //       noMiss: true,
  //     }
  //   }
  // },
  shadow_rose: {
    name: 'Shadow Rose',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 889,
    baseHP: 5784,
    baseDef: 610,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1.05,
        pow: 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        aoe: true,
      },
    }
  },
  sharun: {
    name: 'Sharun',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 640,
    baseHP: 5340,
    baseDef: 720,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.1,
    barrierEnhance: 's2',
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
    }
  },
  sigret: {
    name: 'Sigret',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 1228,
    baseHP: 5784,
    baseDef: 553,
    form: [elements.target_nb_debuff, elements.exclusive_equipment_1],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        exEq: () => elements.exclusive_equipment_1.value() ? 0.2 : 0,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        canExtra: true,
        single: true,
      },
      s2: {
        rate: 1.25,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.7,
        pow: 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        penetrate: () => Math.min(0.3 + elements.target_nb_debuff.value() * 0.1, 1.0),
        single: true,
      },
    }
  },
  silk: {
    name: 'Silk',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 1188,
    baseHP: 4693,
    baseDef: 518,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_bis: {
        s1_benefits: true,
        name: infoLabel('silk_automatic_fire'),
        spdScaling: true,
        rate: 1.2,
        pow: 0.9,
        penetrate: () =>  0.2,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 0.95,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  // silk_old: {
  //   name: 'Silk (Pre-Balance)',
  //   element: element.earth,
  //   classType: classType.ranger,
  //   baseAtk: 1188,
  //   baseHP: 4693,
  //   baseDef: 518,
  //   form: [elements.caster_speed, elements.caster_nb_focus],
  //   skills: {
  //     s1: {
  //       spdScaling: true,
  //       rate: 0.9,
  //       pow: 0.9,
  //       mult: () => 1 + elements.caster_speed.value() * 0.00075,
  //       multTip: () => ({ caster_speed: 0.075 }),
  //       enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
  //       single: true,
  //     },
  //     s1_bis: {
  //       s1_benefits: true,
  //       name: infoLabel('silk_automatic_fire'),
  //       spdScaling: true,
  //       rate: 1.25,
  //       pow: 0.9,
  //       penetrate: () => 0.2,
  //       mult: () => 1 + elements.caster_speed.value() * 0.00075,
  //       multTip: () => ({ caster_speed: 0.075 }),
  //       enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 0.95,
  //       pow: 1.05,
  //       enhance: [0.1, 0, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  silver_blade_aramintha: {
    name: 'Silver Blade Aramintha',
    element: element.light,
    classType: classType.mage,
    baseAtk: 1197,
    baseHP: 4572,
    baseDef: 683,
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s1_extra: {
        name: infoLabel('s1_extra_attack'),
        rate: 0.5,
        pow: 1.3,
        enhance_from: 's1',
        aoe: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
    }
  },
  sinful_angelica: {
    name: 'Sinful Angelica',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 649,
    baseHP: 4572,
    baseDef: 631,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  sol: {
    name: 'Sol Badguy',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1177,
    baseHP: 5542,
    baseDef: 553,
    form: [elements.target_has_buff, elements.target_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => elements.target_has_buff.value() ? 1 : 1.2,
        multTip: () => ({ target_has_no_buff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        flat: () => elements.target_max_hp.value() * 0.04,
        flatTip: () => ({ target_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        single: true,
      },
      s3: {
        rate: 1.6,
        pow: 1,
        flat: () => elements.target_max_hp.value() * 0.05,
        flatTip: () => ({ target_max_hp: 5 }),
        afterMath: () => ({ atkPercent: 0.4, penetrate: 0.7 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  solitaria_of_the_snow: {
    name: 'Solitaria of the Snow',
    element: element.light,
    classType: classType.mage,
    baseAtk: 1039,
    baseHP: 5299,
    baseDef: 673,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.25,
    skills: {
      s1: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_extra: {
        name: infoLabel('s1_extra_attack'),
        rate: 0.8,
        pow: 1.3,
        aoe: true,
      },
      s3: {
        rate: 1.8,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  sonia: {
    name: 'Sonia',
    element: element.light,
    classType: classType.soul_weaver,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.08,
    baseAtk: 540,
    baseHP: 4900,
    baseDef: 729,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  specimen_sez: {
    name: 'Specimen Sez',
    element: element.light,
    classType: classType.thief,
    baseAtk: 1228,
    baseHP: 6266,
    baseDef: 473,
    form: [elements.target_is_stunned],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.15 : 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        penetrate: () => elements.target_is_stunned.value() ? 1.0 : 0.3,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  specter_tenebria: {
    name: 'Specter Tenebria',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1197,
    baseHP: 4572,
    baseDef: 683,
    form: [elements.target_nb_debuff, elements.dead_people, elements.s3_on_cooldown],
    atkUp: () => {
      let buff = 0.07;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        buff += heroes.specter_tenebria.skills.s2.enhance[i];
      }
      return 1 + Math.min(elements.dead_people.value(), 5) * buff;
    },
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.15],
        single: () => !elements.s3_on_cooldown.value(),
      },
      s2: {
        enhance: [0.005, 0.01, 0.015],
      },
      s3: {
        rate: 1.8,
        pow: 0.95,
        mult: () => 1 + elements.target_nb_debuff.value() * 0.2,
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  spirit_eye_celine: {
    name: 'Spirit Eye Celine',
    element: element.light,
    classType: classType.thief,
    form: [elements.caster_possession],
    baseAtk: 1158,
    baseHP: 5016,
    baseDef: 532,
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_bis: {
        name: infoLabel('ml_celine_nimble_sword'),
        rate: 1,
        pow: 0.9,
        penetrate: () => 0.5,
        enhance_from: 's1',
        single: true,
      },
    }
  },
  spirit_eye_celine_old: {
    name: 'Spirit Eye Celine (Pre-Balance)',
    element: element.light,
    classType: classType.thief,
    baseAtk: 1158,
    baseHP: 5016,
    baseDef: 532,
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_bis: {
        name: infoLabel('ml_celine_nimble_sword'),
        rate: 1.3,
        pow: 0.9,
        penetrate: () => 0.35,
        enhance_from: 's1',
        single: true,
      },
    }
  },
  straze: {
    name: 'Straze',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1228,
    baseHP: 5784,
    baseDef: 553,
    form: [elements.nb_targets, elements.target_is_highest_max_hp, elements.target_attack],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 1: return 1.6;
          case 2: return 1.4;
          case 3: return 1.2;
          default: return 1;
          }
        },
        multTip: () => ({per_fewer_target: 20}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 0.95,
        pow: 1,
        penetrate: () => {
          if (!elements.target_is_highest_max_hp.value()) return 0;

          const targetAtk = elements.target_attack.value();
          const casterAtk = currentHero.getAtk('s3');

          const penDiff = (casterAtk - targetAtk) * 0.00035;

          return Math.min(Math.max(0, penDiff) + 0.3, 1);
        },
        penetrateTip: () => ({caster_target_atk_diff: 0.035}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
    }
  },
  summer_break_charlotte: {
    name: 'Summer Break Charlotte',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 957,
    baseHP: 6148,
    baseDef: 634,
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  // summer_break_charlotte_old: {
  //   name: 'Summer Break Charlotte (Pre-Balance)',
  //   element: element.ice,
  //   classType: classType.knight,
  //   baseAtk: 957,
  //   baseHP: 6148,
  //   baseDef: 634,
  //   form: [elements.target_hp_pc],
  //   skills: {
  //     s1: {
  //       rate: 0.9,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 1.8,
  //       pow: 1,
  //       mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.0035,
  //       multTip: () => ({target_lost_hp_pc: 35}),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     },
  //   }
  // },
  summer_disciple_alexa: {
    name: 'Summer\'s Disciple Alexa',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1081,
    baseHP: 4572,
    baseDef: 494,
    form: [elements.skill_tree_completed, elements.target_nb_debuff, elements.target_max_hp],
    atkUp: () => elements.skill_tree_completed.value() ? 1.03 : 1,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0.15],
        single: true,
      },
      s1_extra: {
        name: infoLabel('s1_extra_attack'),
        rate: 0.75,
        pow: 1,
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (elements.skill_tree_completed.value() ? 0.1 : 0),
        multTip: () => ({skill_tree: 10}),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.9,
        mult: () => 1 + elements.target_nb_debuff.value() * 0.15,
        multTip: () => ({per_target_debuff: 15}),
        flat2: () => elements.skill_tree_completed.value() ? (elements.target_max_hp.value() * 0.05) : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  summertime_iseria: {
    name: 'Summertime Iseria',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 1203,
    baseHP: 5704,
    baseDef: 585,
    form: [elements.target_bomb_detonate],
    dot: [dot.bomb],
    innateAtkUp: () => {
      let boost = 0.35;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.summertime_iseria.skills.s2.enhance[i];
      }

      return boost;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
        noCrit: true,
      },
      s2: {
        enhance: [0.02, 0.02, 0.03, 0.03, 0.05],
      },
      s3: {
        rate: 1.2,
        pow: 1,
        detonate: dot.bomb,
        detonation: () => 1.1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
        noCrit: true,
      },
    }
  },
  surin: {
    name: 'Surin',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 1010,
    baseHP: 5097,
    baseDef: 497,
    form: [elements.target_nb_bleed],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1.4,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 0.8,
        mult: () => elements.target_nb_bleed.value() > 0 ? 1.25 + (Math.min(elements.target_nb_bleed.value(), 5) - 1) * 0.25 : 1,
        multTip: () => ({ per_bleed: 25 }),
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        single: true,
      },
    }
  },
  suthan: {
    name: 'Suthan',
    element: element.dark,
    classType: classType.mage,
    form: [elements.attack_skill_stack_10],
    atkUp: () => {
      let boost = 0.025;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.suthan.skills.s2.enhance[i];
      }
      return 1 + (boost * elements.attack_skill_stack_10.value());
    },
    dot: [dot.burn],
    baseAtk: 1144,
    baseHP: 4263,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.005, 0.005, 0.005, 0.005, 0.005],
      },
      s3: {
        rate: 1.5,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  sven: {
    name: 'Sven',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 1039,
    baseHP: 5517,
    baseDef: 452,
    form: [elements.caster_hp_pc, elements.target_hp_pc],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s1_extra: {
        name: infoLabel('s1_extra_attack'),
        rate: 0.7,
        pow: 1,
        enhance_from: 's1',
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.003,
        multTip: () => ({ caster_speed: 0.3 }),
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1 : 0.8,
        pow: 0.8,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.005 + (100 - elements.target_hp_pc.value()) * 0.0015,
        multTip: () => ({caster_lost_hp_pc: 50, target_lost_hp_pc: 15}),
        enhance: [0.05, 0.05, 0.1, 0, 0.1, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  sylvan_sage_vivian: {
    name: 'Sylvan Sage Vivian',
    element: element.light,
    classType: classType.mage,
    baseAtk: 1359,
    baseHP: 4895,
    baseDef: 652,
    form: [elements.attack_skill_stack_3],
    atkUp: () => 1 + elements.attack_skill_stack_3.value() * 0.15,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_soulburn: {
        name: infoLabel('s1_soulburn'),
        rate: 1,
        pow: 1,
        enhance_from: 's1',
        aoe: true,
      },
      s3: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
    }
  },
  taeyou: {
    name: 'Taeyou',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 1039,
    baseHP: 5340,
    baseDef: 617,
    form: [elements.caster_speed, elements.caster_enrage],
    skills: {
      s1: {
        spdScaling: true,
        soulburn: true,
        rate: (sb) => sb ? 1.65 : 0.98,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_extra: {
        spdScaling: true,
        name: infoLabel('s1_extra_attack'),
        rate: 1.2,
        pow: 1.3,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        isExtra: true,
        single: true,
      },
      s3: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        aoe: true,
      },
    }
  },
  talaz: {
    name: 'Talaz',
    element: element.ice,
    classType: classType.warrior,
    form: [elements.target_has_provoke],
    baseAtk: 1144,
    baseHP: 4895,
    baseDef: 543,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.8 : 1.5,
        pow: 0.9,
        mult: () => 1 + (elements.target_has_provoke.value() ? 0.5 : 0),
        multTip: () => ({ target_has_provoke: 50 }), // TODO: translate target_has_provoke
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        single: true,
      }
    }
  },
  talia: {
    name: 'Talia',
    element: element.light,
    classType: classType.thief,
    barrier: (hero) => hero.getAtk() * 0.7,
    baseAtk: 903,
    baseHP: 4895,
    baseDef: 501,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1,],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0, 0, 0, 0.05, 0.1, 0.15],
        single: true,
      }
    }
  },
  tamarinne: {
    name: 'Tamarinne',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 948,
    baseHP: 4370,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1,
        pow: 0.75,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.15]
      }
    }
  },
  taranor_guard: {
    name: 'Taranor Guard',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 951,
    baseHP: 5517,
    baseDef: 583,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  taranor_royal_guard: {
    name: 'Taranor Royal Guard',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 842,
    baseHP: 6463,
    baseDef: 617,
    form: [elements.caster_max_hp],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.025,
        flatTip: () => ({ caster_max_hp: 2.5 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.3 : 1.5,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  tempest_surin: {
    name: 'Tempest Surin',
    element: element.light,
    classType: classType.thief,
    baseAtk: 1010,
    baseHP: 5097,
    baseDef: 497,
    form: [elements.caster_hp_pc],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.0015,
        multTip: () => ({ caster_lost_hp_pc: 15 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.25 : 1,
        pow: 1.05,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.002,
        multTip: () => ({ caster_lost_hp_pc: 20 }),
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  tenebria: {
    name: 'Tenebria',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1359,
    baseHP: 4895,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.05 : 0.8,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1.1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  // tenebria_old: {
  //   name: 'Tenebria (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.mage,
  //   baseAtk: 1359,
  //   baseHP: 4895,
  //   baseDef: 652,
  //   skills: {
  //     s1: {
  //       rate: 1.2,
  //       pow: 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 0.8,
  //       pow: 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       aoe: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.35 : 1.1,
  //       pow: 1.05,
  //       enhance: [0.1, 0, 0, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  tieria: {
    name: 'Tieria',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 839,
    baseHP: 5517,
    baseDef: 591,
    form: [elements.target_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0.15, 0],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.8 : 1.2,
        pow: 0.9,
        flat: (soulburn) => elements.target_max_hp.value() * (soulburn ? 0.06 : 0.04),
        flatTip: (soulburn) => ({ target_max_hp: soulburn ? 6 : 4 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      },
    }
  },
  top_model_luluca: {
    name: 'Top Model Luluca',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1228,
    baseHP: 4370,
    baseDef: 662,
    form: [elements.caster_speed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        noTrans: true,
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 1.6,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.0015,
        multTip: () => ({ caster_speed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  troublemaker_crozet: {
    name: 'Troublemaker Crozet',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 776,
    baseHP: 6021,
    baseDef: 718,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        hpScaling: true,
        rate: 1,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0, 0.05, 0, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }

  },
  twisted_eidolon_kayron: { //TODO: translate when available
    name: 'Twisted Eidolon Kayron',
    element: element.light,
    classType: classType.thief,
    baseAtk: 1228,
    baseHP: 6266,
    baseDef: 473,
    barrier: () => elements.caster_max_hp.value() * 0.12,
    form: [elements.target_hp_pc, elements.caster_max_hp, elements.caster_fighting_spirit],
    skills: {
      s1: {
        rate: (soulburn) => soulburn ? 1.7 : 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        mult: () => 1 + (1 - (elements.target_hp_pc.value() / 100)) * 0.3,
        multTip: () => ({ target_lost_hp_pc: 30 }),
        single: true,
        soulburn: true
      },
      s1_bis: {
        name: infoLabel('ml_kayron_flash_slash'),
        rate: 0.85,
        pow: 1,
        enhance_from: 's1',
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        fixed: (hitType) => (2000 + ((hitType !== hitTypes.miss) ? Math.min(80 * elements.caster_fighting_spirit.value(), 8000) : 0)),
        fixedTip: (fixedDamage) => ({ fixed: fixedDamage }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
    }
  },
  // twisted_eidolon_kayron_old: {
  //   name: 'Twisted Eidolon Kayron (Pre-Balance)',
  //   element: element.light,
  //   classType: classType.thief,
  //   baseAtk: 1228,
  //   baseHP: 6266,
  //   baseDef: 473,
  //   barrier: () => elements.caster_max_hp.value() * 0.12,
  //   form: [elements.target_hp_pc, elements.caster_enrage, elements.caster_max_hp],
  //   skills: {
  //     s1: {
  //       rate: (soulburn) => soulburn ? 1.7 : 1,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       mult: () => 1 + (1 - (elements.target_hp_pc.value() / 100)) * 0.3,
  //       multTip: () => ({ target_lost_hp_pc: 30 }),
  //       single: true,
  //       soulburn: true
  //     },
  //     s1_bis: {
  //       name: infoLabel('ml_kayron_flash_slash'),
  //       rate: 0.85,
  //       pow: 1,
  //       enhance_from: 's1',
  //       aoe: true,
  //     },
  //     s3: {
  //       rate: 0.9,
  //       pow: 1,
  //       fixed: (hitType) => (hitType !== hitTypes.miss) ? ((elements.caster_enrage.value()) ? 10000 : 2000) : 0,
  //       fixedTip: () => ({ caster_rage_flat: 10000 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     },
  //   }
  // },
  tywin: {
    name: 'Tywin',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 821,
    baseHP: 6751,
    baseDef: 648,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.8,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.5,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  // tywin_old: {
  //   name: 'Tywin (Pre-Balance)',
  //   element: element.ice,
  //   classType: classType.knight,
  //   baseAtk: 821,
  //   form: [elements.caster_max_hp],
  //   skills: {
  //     s1: {
  //       rate: 0.8,
  //       pow: 0.95,
  //       flat: () => elements.caster_max_hp.value()*0.04,
  //       flatTip: () => ({ caster_max_hp: 4 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 0.5,
  //       pow: 0.95,
  //       flat: () => elements.caster_max_hp.value()*0.1,
  //       flatTip: () => ({ caster_max_hp: 10 }),
  //       enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  unbound_knight_arowell: {
    name: 'Unbound Knight Arowell',
    element: element.light,
    classType: classType.knight,
    baseAtk: 758,
    baseHP: 5826,
    baseDef: 672,
    form: [elements.caster_max_hp, elements.skill_tree_completed],
    barrierSkills: ['Passive', 'S3'],
    barrier: () => elements.caster_max_hp.value() * 0.15,
    barrier2: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({caster_max_hp: 5}),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        // rate: 0.75, // This looks like it was just updated on the sheet as well
        hpScaling: true,
        rate: 0.7,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.15,
        flatTip: () => ({caster_max_hp: 15}),
        mult: () => elements.skill_tree_completed.value() ? 1.1 : 1,
        multTip: () => ({ skill_tree: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  urban_shadow_choux: {
    name: 'Urban Shadow Choux', // TODO: translate when available
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 984,
    baseHP: 6266,
    baseDef: 637,
    form: [elements.caster_max_hp, elements.caster_has_bzzt, elements.target_injuries],
    skills: {
      s1: {
        hpScaling: true,
        soulburn: true,
        rate: (soulburn) => (soulburn ? 0.8 : 0.5),
        pow: 1,
        fixed: () => elements.caster_has_bzzt.value() ? 2000 : 0,
        fixedTip: () => ({ caster_has_bzzt: 2000 }),
        flat: (soulburn) => elements.caster_max_hp.value() * (soulburn ? 0.16 : 0.1),
        flatTip: (soulburn) => ({ caster_max_hp: soulburn ? 16 : 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        fixed: () => elements.caster_has_bzzt.value() ? 2000 : 0,
        fixedTip: () => ({ caster_has_bzzt: 2000 }),
        afterMath: () => ({ injuryPercent: 0.6, penetrate: 0.7 }),
        flat: () => elements.caster_max_hp.value() * 0.25,
        flatTip: () => ({ caster_max_hp: 25 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  verdant_adin: {
    name: 'Verdant Adin',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1081,
    baseHP: 4572,
    baseDef: 494,
    form: [elements.nb_targets, elements.skill_tree_completed],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        mult: () => elements.skill_tree_completed.value() ? 1.1 : 1,
        multTip: () => (elements.skill_tree_completed.value() ? { skill_tree: 10 } : null),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 1,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 3: return 1.2;
          case 2: return 1.4;
          case 1: return 1.6;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 20 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.8,
        pow: 1.05,
        mult: () => elements.skill_tree_completed.value() ? 1.1 : 1,
        multTip: () => (elements.skill_tree_completed.value() ? { skill_tree: 10 } : null),
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
    }
  },
  veronica: {
    name: 'Veronica',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 1188,
    baseHP: 4693,
    baseDef: 518,
    form: [elements.target_bomb_detonate],
    dot: [dot.bomb],
    skills: {
      s1: {
        rate: 0.7,
        pow: 1,
        detonate: [dot.bomb],
        detonation: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },  
  vigilante_leader_glenn: {
    name: 'Vigilante Leader Glenn',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 920,
    baseHP: 4855,
    baseDef: 525,
    form: [elements.skill_tree_completed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => elements.skill_tree_completed.value() ? (1.1 + (document.getElementById('elem-adv').checked ? 0.25 : 0)) : 1,
        multTip: () => (elements.skill_tree_completed.value() ? ({
          skill_tree: 10,
          ...(document.getElementById('elem-adv').checked ? { elemental_advantage: 25 } : {}),
        }) : null),
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.5,
        mult: () => elements.skill_tree_completed.value() && document.getElementById('elem-adv').checked ? 1.25 : 1,
        multTip: () => ({ elemental_advantage: 25 }),
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  vildred: {
    name: 'Vildred',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1283,
    baseHP: 5138,
    baseDef: 522,
    form: [elements.caster_speed, elements.exclusive_equipment_2],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.1 : 0.85,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  // vildred_old: {
  //   name: 'Vildred (Pre-Balance)',
  //   element: element.earth,
  //   classType: classType.thief,
  //   baseAtk: 1283,
  //   form: [elements.caster_speed, elements.exclusive_equipment_2],
  //   skills: {
  //     s1: {
  //       rate: 0.85,
  //       pow: 0.95,
  //       mult: () => 1 + elements.caster_speed.value()*0.00075,
  //       multTip: () => ({ caster_speed: 0.075 }),
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
  //     },
  //     s2: {
  //       rate: 0.5,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       aoe: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.1 : 0.85,
  //       pow: 1,
  //       mult: (soulburn) => 1 + elements.caster_speed.value()*(soulburn ? 0.0009 : 0.00075),
  //       multTip: (soulburn) => ({ caster_speed: soulburn ? 0.09 : 0.075 }),
  //       exEq: () => elements.exclusive_equipment_2.value() ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     }
  //   }
  // },
  violet: {
    name: 'Violet',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1228,
    baseHP: 6266,
    baseDef: 473,
    form: [elements.caster_nb_focus, elements.caster_perception],
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.9,
        mult: () => 1 + elements.caster_nb_focus.value() * 0.15,
        multTip: () => ({ per_focus: 15 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  vivian: {
    name: 'Vivian',
    element: element.earth,
    classType: classType.mage,
    baseAtk: 1228,
    baseHP: 4378,
    baseDef: 662,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.3 : 1.05,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s2_wave_2: {
        name: infoLabel('s2_wave_2'),
        rate: 0.55,
        pow: 0.9,
        enhance_from: 's2',
        aoe: true,
      },
      s2_wave_3: {
        name: infoLabel('s2_wave_3'),
        rate: 0.3,
        pow: 0.9,
        enhance_from: 's2',
        aoe: true,
      }
    }
  },
  wanda: {
    name: 'Wanda',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 1005,
    baseHP: 4693,
    baseDef: 532,
    skills: {
      s1: {
        rate: 0.9,
        pow: 0.95,
        mult: () => elements.target_has_target.value() ? 1.35 : 1,
        multTip: () => ({ target_debuff: 35 }),
        enhance: [0.05, 0, 0, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0, 0.15, 0.15],
        single: true,
      }
    }
  },
  wanderer_silk: {
    name: 'Wanderer Silk',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 930,
    baseHP: 5380,
    baseDef: 564,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.3,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 2,
        pow: 0.8,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  watcher_schuri: {
    name: 'Watcher Schuri',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 970,
    baseHP: 5935,
    baseDef: 557,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 0.8,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        penetrate: () => 1.0,
        single: true,
      }
    }
  },
  yoonryoung: {
    name: 'Yoonryoung',
    element: element.light,
    classType: classType.knight,
    baseAtk: 703,
    baseHP: 5914,
    baseDef: 596,
    skills: {
      s1: {
        rate: 0.8,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s1_bis: {
        name: infoLabel('yoonryoung_slash'),
        rate: 0.5,
        pow: 1,
        enhance_from: 's1',
        single: true,
      }
    }
  },
  yufine: {
    name: 'Yufine',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1228,
    baseHP: 5784,
    baseDef: 553,
    form: [elements.exclusive_equipment_2, elements.target_silenced],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        exEq: () => elements.exclusive_equipment_2.value() ? 0.3 : 0,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        aoe: true,
      },
      s3: {
        rate: 2,
        pow: 0.95,
        penetrate: () => document.getElementById('target-silenced').checked ? 0.7 : 0,
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  // yufine_old: {
  //   name: 'Yufine (Pre-Balance)',
  //   element: element.earth,
  //   classType: classType.warrior,
  //   baseAtk: 1228,
  //   form: [elements.target_has_buff, elements.exclusive_equipment_2],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 1,
  //       exEq: () => elements.exclusive_equipment_2.value() ? 0.3 : 0,
  //       enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 0.9,
  //       pow: 1,
  //       aoe: true,
  //     },
  //     s3: {
  //       rate: 2,
  //       pow: 0.95,
  //       mult: () => elements.target_has_buff.value() ? 1.5 : 1.0,
  //       multTip: () => ({target_has_buff: 50}),
  //       enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
  //       single: true,
  //     }
  //   }
  // },
  yulha: {
    name: 'Yulha',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 894,
    baseHP: 6840,
    baseDef: 694,
    form: [elements.caster_max_hp, elements.caster_hp],
    barrier: () => elements.caster_max_hp.value() * 0.35,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({caster_max_hp: 10}),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => 0.31 * Math.max(elements.caster_max_hp.value() - elements.caster_hp.value(), 0),
        flatTip: () => ({caster_lost_hp: 31}),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noCrit: true,
        noTrans: true,
        single: true,
      }
    }
  },
  yuna: {
    name: 'Yuna',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 1158,
    baseHP: 6002,
    baseDef: 553,
    form: [elements.caster_speed, elements.nb_targets, elements.exclusive_equipment_3],
    skills: {
      s1: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 0.85 : 0.6,
        pow: 0.8,
        mult: () => {
          let mult = 1 + elements.caster_speed.value() * 0.00075;
          switch (elements.nb_targets.value()) {
          case 3: mult += 0.2; break;
          case 2: mult += 0.4; break;
          case 1: mult += 0.6; break;
          }
          return mult;
        },
        multTip: () => ({ caster_speed: 0.075, per_fewer_target: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        onlyCrit: true,
        rate: 1.5,
        pow: 0.8,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 3: return 1.2;
          case 2: return 1.4;
          case 1: return 1.6;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 20 }),
        exEq: () => elements.exclusive_equipment_3.value() ? 0.3 : 0,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  zahhak: {
    name: 'Zahhak',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1177,
    baseHP: 5542,
    baseDef: 553,
    form: [elements.target_has_buff],
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.8 : 1.1,
        pow: 1,
        mult: () => elements.target_has_buff.value() ? 1.3 : 1,
        multTip: () => ({ target_has_buff: 30 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1.9,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  zealot_carmainerose: {
    name: 'Zealot Carmainerose',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1168,
    baseHP: 3877,
    baseDef: 666,
    form: [elements.skill_tree_completed, elements.target_has_buff],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => elements.skill_tree_completed.value() && !elements.target_has_buff.value() ? 1.1 : 1,
        multTip: () => (elements.skill_tree_completed.value() ? { target_has_no_buff: 10 } : null),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1.05,
        mult: () => elements.skill_tree_completed.value() && !elements.target_has_buff.value() ? 1.1 : 1,
        multTip: () => (elements.skill_tree_completed.value() ? { target_has_no_buff: 10 } : null),
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.95,
        mult: () => elements.skill_tree_completed.value() && !elements.target_has_buff.value() ? 1.1 : 1,
        multTip: () => (elements.skill_tree_completed.value() ? { target_has_no_buff: 10 } : null),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  zeno: {
    name: 'Zeno',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1039,
    baseHP: 5299,
    baseDef: 673,
    form: [elements.caster_max_hp, elements.non_attack_skill_stack_8],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.005, 0.005, 0.005, 0.005, 0.01],
      },
      s3: {
        hpScaling: true,
        ate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        mult: () => {
          let extra = 0;
          for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
            extra += heroes.zeno.skills.s2.enhance[i];
          }

          return 1 + elements.non_attack_skill_stack_8.value() * (0.07 + extra);
        },
        multTip: () => {
          let extra = 0;
          for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
            extra += heroes.zeno.skills.s2.enhance[i] * 100;
          }

          return { per_stack: 7 + extra };
        },
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  zerato: {
    name: 'Zerato',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1159,
    baseHP: 4733,
    baseDef: 627,
    form: [elements.target_has_debuff],
    skills: {
      s1: {
        rate: 1.05,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1.5,
        pow: 0.95,
        mult: () => elements.target_has_debuff.value() ? 1.3 : 1,
        multTip: () => ({ target_has_debuff: 30 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  zio: {
    name: 'Zio',
    element: element.dark,
    classType: classType.mage,
    form: [elements.target_current_hp],
    baseAtk: 1255,
    baseHP: 5016,
    baseDef: 652,
    skills: {
      s1: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_bis: {
        isExtra: true,
        name: infoLabel('zio_disappear'),
        rate: 1,
        pow: 1,
        penetrate: () => 0.5,
        enhance_from: 's1',
        single: true,
      },
      s3: {
        rate: 0.2,
        pow: 1,
        flat: () => elements.target_current_hp.value() * 0.1875,
        flatTip: () => ({ target_current_hp: 18.75 }),
        penetrate: () => 1,
        noCrit: true,
        single: true,
      },
    }
  },
};
