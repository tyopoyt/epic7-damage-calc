/*
 * Notes:
 * aftermath damage is only used when it scales with the caster's attack (hwayoung)
 * fixed damage is used for flat extra damage (rimuru)
 * flat damage is used for damage scaling with stats other than attack (alencia)
 */

import { Artifact } from "src/app/models/artifact";
import { DamageFormData } from "src/app/models/forms";
import { Hero, HeroClass, HeroElement } from "src/app/models/hero";
import { DoT, HitType, Skill } from "src/app/models/skill";

export const Heroes: Record<string, Hero> = {
  abigail: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 984,
    baseHP: 6266,
    baseDefense: 637,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({caster_max_hp: 12}),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.2,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.2,
        flatTip: () => ({caster_max_hp: 20}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  achates: new Hero({
    element: HeroElement.fire,
    class: HeroClass.soul_weaver,
    baseAttack: 603,
    baseHP: 4945,
    baseDefense: 662,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  adin: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    // form: [elements.nb_targets],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => {
          switch (inputValues.numberOfTargets) {
          case 3: return 1.2;
          case 2: return 1.4;
          case 1: return 1.6;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 20 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  adlay: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 3925,
    baseDefense: 606,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  adventurer_ras: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 758,
    baseHP: 5826,
    baseDefense: 672,
    // form: [elements.caster_max_hp, elements.skill_tree_completed],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        mult: (inputValues: DamageFormData) => 1 + (inputValues.skillTreeCompleted ? 0.1 : 0),
        multTip: () => ({ skill_tree: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
    }
  }),
  ae_giselle: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    // form: [elements.target_hp_pc],
    baseAttack: 1286,
    baseHP: 4733,
    baseDefense: 652,
    skills: {
      s1: new Skill({
        id: 's1',
        mult: (inputValues: DamageFormData) => 1 + inputValues.targetCurrentHPPercent * 0.002,
        multTip: () => ({ target_current_hp: 0.2 }),
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.7 : 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 2,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
        noTrans: true,
      })
    }
  }),
  ae_karina: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 821,
    baseDefense: 648,
    baseHP: 6751,
    // form: [elements.caster_defense],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) =>  inputValues.casterDefense * 1.0,
        flatTip: () => ({ caster_defense: 100 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.5,
        flatTip: () => ({ caster_defense: 50 }),
        afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? { defensePercent: 1.4, penetrate: () => 0.7 } : null,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  ae_ningning: new Hero({
    element: HeroElement.fire,
    class: HeroClass.soul_weaver,
    baseAttack: 785,
    baseHP: 5077,
    baseDefense: 634,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  ae_winter: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1057,
    baseHP: 5542,
    baseDefense: 532,
    // form: [elements.attack_skill_stack_3],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.8,
        pow: () => 0.95,
        fixed: (hitType: HitType, inputValues: DamageFormData) => (hitType === HitType.crit) ? 5000 * (inputValues.casterAttackStack + 1)  : 0,
        fixedTip: () => ({fixed: 5000, per_stack: 5000 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  ainos: new Hero({
    element: HeroElement.dark,
    class: HeroClass.soul_weaver,
    baseAttack: 804,
    baseHP: 3925,
    baseDefense: 599,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        aoe: true,
      })
    }
  }),
  ainos_2_0: new Hero({
    element: HeroElement.dark,
    class: HeroClass.soul_weaver,
    baseAttack: 804,
    baseHP: 3925,
    baseDefense: 599,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        aoe: true,
      })
    }
  }),
  ains: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 951,
    baseHP: 5517,
    baseDefense: 583,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.7,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s1_crit: new Skill({
        id: 's1_crit',
        onlyCrit: true,
        rate: () => 1,
        pow: () => 1,
        enhance_from: 's1',
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.8 : 1.5,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  aither: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 705,
    baseHP: 4592,
    baseDefense: 672,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill),
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  alencia: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 975,
    baseHP: 7054,
    baseDefense: 652,
    // form: [elements.caster_max_hp, elements.exclusive_equipment_2],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.08,
        flatTip: () => ({caster_max_hp: 8}),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
            rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.11,
        flatTip: () => ({caster_max_hp: 11}),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.2 : 0,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
        flatTip: () => ({ caster_max_hp: 15 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        aoe: true,
      })
    }
  }),
  alexa: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    // form: [elements.target_nb_debuff],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
            rate: () => 0.75,
        pow: () => 1,
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + inputValues.targetNumberOfDebuffs * 0.15,
        multTip: ()=> ({ per_target_debuff: 15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  all_rounder_wanda: new Hero({
    element: HeroElement.dark,
    class: HeroClass.ranger,
    baseAttack: 1005,
    baseHP: 4693,
    baseDefense: 532,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.9,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => inputValues.targetTargeted ? 1.35 : 1,
        multTip: (inputValues: DamageFormData) => inputValues.targetTargeted ? { target_debuff: 35 } : null,
        enhance: [0.05, 0, 0, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0, 0.15, 0.15],
        isSingle: () => true,
      })
    }
  }),
  ambitious_tywin: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 894,
    baseHP: 6840,
    baseDefense: 694,
    // form: [elements.caster_max_hp, elements.caster_enrage],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.05, 0.15],
        aoe: true,
      }),
    }
  }),
  amid: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 694,
    baseHP: 4855,
    baseDefense: 655,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  angel_of_light_angelica: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 957,
    baseHP: 5016,
    baseDefense: 645,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.1, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      })
    }
  }),
  angelic_montmorancy: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 540,
    baseHP: 4900,
    baseDefense: 729,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  angelica: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 576,
    baseHP: 5700,
    baseDefense: 743,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  apocalypse_ravi: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 975,
    baseHP: 7054,
    baseDefense: 652,
    // form: [elements.caster_max_hp, elements.dead_people],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2 : 1,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterMaxHP * (soulburn ? 0.2 : 0.12),
        flatTip: (soulburn: boolean) => ({ caster_max_hp: soulburn ? 20 : 12 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.3,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterMaxHP * 0.2,
        flatTip: () => ({ caster_max_hp: 20 }),
        mult: (inputValues: DamageFormData) => 1 + Math.min(inputValues.numberOfDeaths, 3) * 0.25,
        multTip: () => ({ dead_people: 25 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  aramintha: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1197,
    baseHP: 4572,
    baseDefense: 683,
    // form: [elements.target_burn_detonate],
    dot: [DoT.burn],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 1.2,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1.05,
        detonate: [DoT.burn],
        detonation: () => 1,
        enhance: [0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  arbiter_vildred: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1283,
    baseHP: 5138,
    baseDefense: 522,
    // form: [elements.caster_full_focus],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.975,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1]
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean, inputValues: DamageFormData) => {
          if (inputValues.casterFullFocus) {
            return soulburn ? 1.55 : 1.23;
          } else {
            return soulburn ? 1.29 : 1.04;
          }
        },
        pow: () => 0.85,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  archdemon_shadow: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 1316,
    baseHP: 4777,
    baseDefense: 715,
    dot: [DoT.burn],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.6,
        pow: () => 1.3,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  architect_laika: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 1306,
    baseHP: 4248,
    baseDefense: 652,
    // form: [elements.caster_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        rate: () => 0.95,
        pow: () => 0.9,
        penetrate: (inputValues: DamageFormData) => inputValues.targetTargeted ? 0.8 : 0,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.15],
        noTrans: true,
        aoe: true,
      })
    }
  }),
  // architect_laika_old: {
  //   name: 'Architect Laika (Pre-Balance)',
  //   element: HeroElement.light,
  //   class: HeroClass.mage,
  //   baseAttack: 1306,
  //   // form: [elements.caster_speed],
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
  //       penetrate: (inputValues: DamageFormData) => inputValues.targetTargeted ? 0.8 : 0,
  //       mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.001125,
  //       multTip: () => ({ caster_speed: 0.1125 }),
  //       enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.15],
  //       noTrans: true,
  //       aoe: true,
  //     }
  //   }
  // },
  aria: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseDefense: 673,
    baseHP: 5299,
    // form: [elements.caster_defense],
    barrier: (inputValues: DamageFormData) => inputValues.casterDefense * 1.0,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.85,
        flatTip: () => ({ caster_defense: 85 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
      }),
      s2: new Skill({
        id: 's2',
        defenseScaling: true,
        rate: () => 0.7,
        pow: () => 1.3,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 1.4,
        flatTip: () => ({ caster_defense: 140 }),
        aoe: true,
      })
    }
  }),
  armin: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 721,
    baseDefense: 785,
    baseHP: 6189,
    // form: [elements.caster_defense],
    barrier: (inputValues: DamageFormData) => inputValues.casterDefense * 0.7,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.8,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.6,
        flatTip: () => ({ caster_defense: 60 }),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  arowell: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 758,
    baseHP: 5826,
    baseDefense: 672,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.05,
        flatTip: () => ({caster_max_hp: 5}),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.75,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
        flatTip: () => ({caster_max_hp: 15}),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  arunka: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1570,
    baseHP: 6488,
    baseDefense: 616,
    // form: [elements.target_has_barrier],
    dot: [DoT.bleed],
    innateAttackIncrease: () => 0.30,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
        noCrit: true,
      }),
      s1_bis: new Skill({
        id: 's1_bis',
            rate: () => 1.3,
        pow: () => 1.3,
        // enhance_from: 's1', Presumed not to inherit from s1 mola since the pow is so high already
        isSingle: () => true,
        isExtra: true,
        noCrit: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        penetrate: () => 0.7,
        mult: (inputValues: DamageFormData) => inputValues.targetHasBarrier ? 3.4 : 1,
        multTip: () => ({ target_has_barrier: 240 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
        noCrit: true,
      }),
    }
  }),
  // arunka_old: {
  //   name: 'Arunka (Pre-Balance)',
  //   element: HeroElement.earth,
  //   class: HeroClass.warrior,
  //   baseAttack: 1570,
  //   baseHP: 6488,
  //   baseDefense: 616,
  //   // form: [elements.target_has_barrier],
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
  //       // enhance_from: 's1', Presumed not to inherit from s1 mola since the pow is so high already
  //       isSingle: () => true,
  //       noCrit: true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.9,
  //       pow: () => 1,
  //       penetrate: () => 0.7,
  //       mult: (inputValues: DamageFormData) => inputValues.targetHasBarrier ? 2.2 : 1,
  //       multTip: () => ({ target_has_barrier: 120 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //       noCrit: true,
  //     },
  //   }
  // },
  assassin_cartuja: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6019,
    baseDefense: 594,
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  assassin_cidd: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 930,
    baseHP: 4774,
    baseDefense: 497,
    // form: [elements.caster_speed, elements.target_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2 : 1.5,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.001 + inputValues.targetSpeed * 0.003,
        multTip: () => ({ caster_speed: 0.1, target_speed: 0.3 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  assassin_coli: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1027,
    baseHP: 5299,
    baseDefense: 469,
    // form: [elements.caster_speed, elements.caster_stealth, elements.exclusive_equipment_1],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: (inputValues: DamageFormData) => inputValues.casterHasStealth ? 1.2 : 0.9,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment1 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 3 : 1.5,
        pow: () => 0.8,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  astromancer_elena: new Hero({
    element: HeroElement.light,
    class: HeroClass.ranger,
    baseAttack: 1079,
    baseHP: 5502,
    baseDefense: 564,
    // form: [elements.target_has_debuff],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => inputValues.targetHasDebuff ? 1.2 : 1,
        multTip: () => ({ target_has_debuff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  auxiliary_lots: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 1021,
    baseHP: 4855,
    baseDefense: 610,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.8,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1 : 0.8,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  azalea: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 1019,
    baseHP: 5738,
    baseDefense: 571,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0, 0.1, 0, 0.15, 0],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      }),
    }
  }),
  baal_and_sezan: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1197,
    baseHP: 4572,
    baseDefense: 683,
    // form: [elements.target_nb_debuff],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.15, 0, 0.15]
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.35 : 1.1,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.targetNumberOfDebuffs * 0.15),
        multTip: () => ({ per_target_debuff: 15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.8,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  bad_cat_armin: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 912,
    baseHP: 5871,
    baseDefense: 614,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.3,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.16,
        flatTip: () => ({ caster_max_hp: 16 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  // bad_cat_armin_old: {
  //   name: 'Bad Cat Armin (Pre-Balance)',
  //   element: HeroElement.dark,
  //   class: HeroClass.warrior,
  //   baseAttack: 912,
  //   // form: [elements.caster_max_hp],
  //   barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.15,
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.9,
  //       pow: () => 1,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.06,
  //       flatTip: () => ({ caster_max_hp: 6 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       aoe: true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1.3,
  //       pow: () => 1,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.2,
  //       flatTip: () => ({ caster_max_hp: 20 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //   }
  // },
  baiken: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    // form: [elements.target_bleed_detonate],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.85 : 1.6,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        detonate: DoT.bleed,
        detonation: () => 1.3,
        isSingle: () => true,
      })
    }
  }),
  basar: new Hero({
    element: HeroElement.earth,
    baseAttack: 1316,
    baseHP: 4777,
    baseDefense: 715,
    class: HeroClass.mage,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 0.9,
        enhance: [0.05, 0.1, 0, 0.1, 0.15],
        aoe: true,
      }),
    }
  }),
  bask: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 842,
    baseHP: 6463,
    baseDefense: 617,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0.1, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  batisse: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1039,
    baseHP: 5097,
    baseDefense: 518,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.8,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s1_rock_smash: new Skill({
        id: 's1_rock_smash',
        rate: () => 0.5,
        pow: () => 0.95,
        enhance_from: 's1',
        isExtra: true,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  beehoo: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    // form: [elements.target_burn_detonate],
    baseAttack: 1203,
    baseHP: 5704,
    baseDefense: 702,
    innateAttackIncrease: (molagoras: Record<string, number>) => {
      let boost = 0.20;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes.beehoo.skills.s2.enhance[i];
      }
      return boost;
    },
    dot: [DoT.burn],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        noCrit: true,
        isSingle: () => true,
      }),
      s1_bis: new Skill({
        id: 's1_bis',
        rate: () => 1.2,
        pow: () => 0.9,
        enhance_from: 's1',
        detonate: DoT.burn,
        detonation: () => 1.3,
        noCrit: true,
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.01, 0.01, 0.01, 0.01, 0.02, 0.02, 0.02],
      }),
    }
  }),
  belian: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    // form: [elements.caster_max_hp],
    baseAttack: 821,
    baseHP: 6751,
    baseDefense: 648,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1.05,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.09,
        flatTip: () => ({ caster_max_hp: 9 }),
        enhance: [0.05, 0, 0.05, 0, 0.05, 0, 0.1],
        aoe: true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1.3,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.045,
        flatTip: () => ({ caster_max_hp: 4.5 }),
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1.3,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        aoe: true,
      })
    }
  }),
  bellona: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 1003,
    baseHP: 5704,
    baseDefense: 585,
    // form: [elements.target_max_hp, elements.nb_targets],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.targetMaxHP * 0.04,
        flatTip: () => ({ target_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => inputValues.numberOfTargets > 1 ? 1 + (inputValues.numberOfTargets - 1) * 0.1 : 1,
        multTip: () => ({ per_target: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.2 : 0.95,
        pow: () => 1,
        enhance: [0.15, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  benevolent_romann: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 957,
    baseHP: 5016,
    baseDefense: 645,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.8,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      mana_burst: new Skill({
        id: 'mana_burst',
        rate: () => 0.5,
        pow: () => 1,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  benimaru: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    // form: [elements.caster_has_multilayer_barrier],
    baseAttack: 1177,
    baseHP: 5542,
    baseDefense: 553,
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.7 : 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.casterHasMultilayerBarrier ? 0.3 : 0),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.2,
        pow: () => 1,
        penetrate: (inputValues: DamageFormData) => inputValues.casterHasMultilayerBarrier ? 0.6 : 0.3,
        isExtra: true,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: 2,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  blaze_dingo: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    baseAttack: 880,
    baseHP: 4167,
    baseDefense: 627,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.5,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.2,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  blood_blade_karin: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1138,
    baseHP: 5871,
    baseDefense: 462,
    // form: [elements.caster_hp_pc],
    attackIncrease: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      let boost = 0.0051;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += 0.0051 * Heroes.blood_blade_karin.skills.s2.enhance[i];
      }
      return 1 + (100 - inputValues.casterCurrentHPPercent) * boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.45 : 1.2,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }),
    }
  }),
  blood_moon_haste: new Hero({
    element: HeroElement.dark,
    class: HeroClass.soul_weaver,
    baseAttack: 621,
    baseHP: 5474,
    baseDefense: 802,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.4,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15]
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        noCrit: true,
        rate: () => 0.3,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  briar_witch_iseria: new Hero({
    element: HeroElement.dark,
    class: HeroClass.ranger,
    baseAttack: 1182,
    baseHP: 5299,
    baseDefense: 571,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.85,
        pow: () => 1,
        afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? { attackPercent: 0.3, penetrate: () => 0.7 } : null,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.95,
        pow: () => 1.1,
        afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? { attackPercent: 0.3, penetrate: () => 0.7 } : null,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  // briar_witch_iseria_old: {
  //   name: 'Briar Witch Iseria (Pre-Balance)',
  //   element: HeroElement.dark,
  //   class: HeroClass.ranger,
  //   baseAttack: 1182,
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.85,
  //       pow: () => 1,
  //       afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? { attackPercent: 0.3, penetrate: () => 0.7 } : null,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.2 : 0.95,
  //       pow: () => 1.1,
  //       afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? { attackPercent: 0.3, penetrate: () => 0.7 } : null,
  //       enhance: [0.05, 0, 0, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  brieg: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 821,
    baseHP: 6751,
    baseDefense: 648,
    barrierSkills: ['S2', 'S2 Soulburn'],
    barrier: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      let boost = 1.0;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes['brieg'].skills.s2.enhance[i];
      }

      return inputValues.casterMaxHP * 0.185 * boost;
    },
    barrier2: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      let boost = 1.0;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes['brieg'].skills.s2.enhance[i];
      }

      return inputValues.casterMaxHP * 0.24 * boost;
    },
    // form: [elements.caster_max_hp, elements.caster_perception],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        canExtra: true,
        rate: () => 1,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.22,
        flatTip: () => ({ caster_max_hp: 22 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  butcher_corps_inquisitor: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 963,
    baseHP: 5138,
    baseDefense: 606,
    // form: [elements.caster_hp_pc],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.5,
        pow: () => 0.85,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.005,
        multTip: () => ({ caster_lost_hp_pc: 50 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  camilla: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 885,
    baseHP: 4733,
    baseDefense: 571,
    // form: [elements.target_hp_pc],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.01,
        multTip: () => ({ target_lost_hp_pc: 1 }),
        isSingle: () => true,
      })
    }
  }),
  captain_rikoris: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 951,
    baseHP: 5517,
    baseDefense: 583,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        aoe: true,
      })
    }
  }),
  carmainerose: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1168,
    baseHP: 3877,
    baseDefense: 666,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  carrot: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 3925,
    baseDefense: 606,
    // form: [elements.target_burn_detonate],
    dot: [DoT.burn],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.6,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        detonate: DoT.burn,
        detonation: () => 1.1,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.15, 0.15]
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  cartuja: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 903,
    baseHP: 6635,
    baseDefense: 630,
    // form: [elements.caster_max_hp, elements.caster_hp_pc],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean, inputValues: DamageFormData) => (inputValues.casterCurrentHPPercent < 75 ? 1 : 0.6) + (soulburn ? 0.2 : 0),
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData) => {
          if (soulburn) {
            return inputValues.casterMaxHP * (inputValues.casterCurrentHPPercent < 75 ? 0.1 : 0.08);
          } else {
            return inputValues.casterMaxHP * (inputValues.casterCurrentHPPercent < 75 ? 0.0625 : 0.05);
          }
        },
        flatTip: (soulburn: boolean, inputValues: DamageFormData) => (inputValues.casterCurrentHPPercent < 75)
          ? { caster_hp_pc_under_hp_threshold: soulburn ? 10 : 6.25 }
          : { caster_hp_pc_over_hp_threshold: soulburn ? 8 : 5 },
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  cecilia: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 821,
    baseHP: 6751,
    baseDefense: 648,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.4,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1.05,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  celeste: new Hero({
    element: HeroElement.light,
    class: HeroClass.ranger,
    baseAttack: 929,
    baseHP: 4733,
    baseDefense: 494,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.25 : 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        aoe: true,
      }),
    }
  }),
  celestial_mercedes: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 1187,
    baseHP: 4491,
    baseDefense: 627,
    // form: [elements.target_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.9,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.targetMaxHP * 0.04,
        flatTip: () => ({ target_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        aoe: true,
      })
    }
  }),
  celine: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    // form: [elements.exclusive_equipment_2, elements.exclusive_equipment_3],
    baseAttack: 1228,
    baseHP: 6267,
    baseDefense: 473,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.5,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.4,
        pow: () => 1,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.5 : 1.8,
        pow: () => 1,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        isSingle: () => true,
      })
    }
  }),
  // celine_old: {
  //   name: 'Celine (Pre-Balance)',
  //   element: HeroElement.earth,
  //   class: HeroClass.thief,
  //   // form: [elements.exclusive_equipment_2, elements.exclusive_equipment_3],
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
  cerise: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    baseAttack: 970,
    baseHP: 5299,
    baseDefense: 603,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        elementalAdvantage: () => true,
        aoe: true,
      }),
    }
  }),
  cermia: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 1359,
    baseHP: 5542,
    baseDefense: 585,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        canExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.65 : 1.15,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        penetrate: () => 0.5,
        isSingle: () => true,
      }),
    }
  }),
  challenger_dominiel: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 1187,
    baseHP: 4491,
    baseDefense: 627,
    // form: [elements.critical_hit_stack],
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.5 : 1,
        pow: (soulburn: boolean) => soulburn ? 1 : 0.9,
        critDmgBoost: () => 0.2,
        mult: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
          let mult = 0;
          for (let i = 0; i < molagoras['S2']; i++) {
            mult += Heroes.challenger_dominiel.skills.s2.enhance[i];
          }

          return 1 + (inputValues.criticalHitStack * (0.054 + (0.054 * mult)));
        },
        multTip: (molagoras: Record<string, number>) => {
          let mult = 0;
          for (let i = 0; i < molagoras['S2']; i++) {
            mult += Heroes.challenger_dominiel.skills.s2.enhance[i];
          }
          return { per_crit_hit: (5.4 + (5.4 * mult)).toFixed(2) };
        },
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
      })
    }
  }),
  champion_zerato: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 1159,
    baseHP: 4733,
    baseDefense: 627,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1]
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  chaos_inquisitor: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 963,
    baseHP: 5138,
    baseDefense: 606,
    // form: [elements.caster_hp_pc, elements.skill_tree_completed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.skillTreeCompleted ? 0.05 : 0),
        multTip: () => ({ skill_tree: 5 }),
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.5,
        pow: () => 0.85,
        mult: (inputValues: DamageFormData) => 1 + (1 - (inputValues.casterCurrentHPPercent / 100)) / 2 + (inputValues.skillTreeCompleted ? 0.12 : 0),
        multTip: () => ({ caster_lost_hp_pc: 50, skill_tree: 12 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  chaos_sect_axe: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1144,
    baseHP: 4895,
    baseDefense: 543,
    // form: [elements.caster_max_hp, elements.skill_tree_completed],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { skill_tree: 10 } : null),
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.08,
        flatTip: () => ({ caster_max_hp: 8 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.2,
        flatTip: () => ({ caster_max_hp: 20 }),
        penetrate: (inputValues: DamageFormData) => inputValues.elementalAdvantage ? 0.4 : 0,
        enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  // chaos_sect_axe_old: {
  //   name: 'Chaos Sect Axe (Pre-Balance)',
  //   element: HeroElement.dark,
  //   class: HeroClass.warrior,
  //   baseAttack: 1144,
  //   // form: [elements.caster_max_hp, elements.caster_attacked_stack_5],
  //   dot: [DoT.bleed],
  //   atkUp: () => 1 + elements.caster_attacked_stack_5.value()*0.06,
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.85,
  //       pow: () => 0.95,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.04,
  //       flatTip: () => ({ caster_max_hp: 4 }),
  //       enhance: [0.05, 0.05, 0.1, 0.15],
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       rate: () => 0.75,
  //       pow: () => 0.95,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.05,
  //       flatTip: () => ({ caster_max_hp: 5 }),
  //       enhance: [0.05, 0.05, 0.1, 0.15],
  //       aoe: true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1.2,
  //       pow: () => 0.9,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.1,
  //       flatTip: () => ({ caster_max_hp: 10 }),
  //       penetrate: () => document.getElementById(`elem-adv`).checked ? 0.4 : 0,
  //       enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
  //       isSingle: () => true,
  //     }
  //   }
  // },
  charles: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 957,
    baseHP: 6148,
    baseDefense: 634,
    // form: [elements.caster_nb_buff, elements.nb_targets, elements.exclusive_equipment_2],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: (inputValues: DamageFormData) => 1.5 + inputValues.casterNumberOfBuffs * 0.07,
        pow: () => 1,
        enhance: [0.1, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => {
          switch (inputValues.numberOfTargets) {
          case 3: return 1.267;
          case 2: return 1.534;
          case 1: return 1.801;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 26.7 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  charlotte: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 1134,
    baseHP: 5825,
    baseDefense: 662,
    skills: {
      s1: new Skill({
        id: 's1',
        onlyCrit: true,
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        onlyCrit: true,
        rate: () => 1.4,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  chloe: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1177,
    baseHP: 5542,
    baseDefense: 553,
    // form: [elements.target_magic_nailed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => inputValues.targetMagicNailed ? 1.3 : 1,
        multTip: () => ({ target_magic_nail: 30 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.2,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 3 : 1.7,
        pow: () => 0.8,
        mult: (inputValues: DamageFormData) => inputValues.targetMagicNailed ? 1.35 : 1,
        multTip: () => ({ target_magic_nail: 35 }),
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        isSingle: () => true,
      })
    }
  }),
  choux: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 966,
    baseHP: 7323,
    baseDefense: 657,
    // form: [elements.caster_max_hp, elements.caster_full_focus],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * (inputValues.casterFullFocus ? 0.15 : 0.11),
        flatTip: (inputValues: DamageFormData) => ({ caster_max_hp: (inputValues.casterFullFocus ? 15 : 11) }),
        penetrate: () => 0.7,
        enhance: [0.05, 0.1, 0.15],
        canExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
        flatTip: () => ({ caster_max_hp: 15 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
      })
    }
  }),
  christy: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 667,
    baseHP: 5784,
    baseDefense: 749,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1.1,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0, 0.1, 0, 0.1, 0],
        isSingle: () => true
      })
    }
  }),
  church_of_ilryos_axe: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1144,
    baseHP: 4895,
    baseDefense: 543,
    // form: [elements.caster_max_hp],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.85,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.75,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.2,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  cidd: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 1029,
    baseHP: 5097,
    baseDefense: 473,
    // form: [elements.caster_speed, elements.exclusive_equipment_3],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: (inputValues: DamageFormData) => inputValues.casterSpeedUp ? 1.5 : 0.9,
        pow: (inputValues: DamageFormData) => inputValues.casterSpeedUp ? 0.9 : 0.95,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.6,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.0021,
        multTip: () => ({ caster_speed: 0.21 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        elementalAdvantage: (inputValues: DamageFormData) => inputValues.casterSpeedUp || inputValues.exclusiveEquipment3,
        isSingle: () => true,
      })
    }
  }),
  clarissa: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1252,
    baseHP: 5219,
    baseDefense: 564,
    // form: [elements.caster_enrage, elements.exclusive_equipment_3],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isExtra: true,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.05 : 0.8,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.casterEnraged ? 1.3 : 1,
        multTip: () => ({ caster_rage: 30 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  closer_charles: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    // form: [elements.target_hp_pc, elements.caster_perception],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s1_alt: new Skill({
        id: 's1_alt',
        rate: () => 1.2,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.004,
        multTip: () => ({ target_lost_hp_pc: 0.4 }),
        enhance_from: 's1',
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.25 : 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  coli: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1138,
    baseHP: 5871,
    baseDefense: 462,
    // form: [elements.target_bleed_detonate, elements.target_bomb_detonate],
    dot: [DoT.bleed, DoT.bomb],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.8,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 0.9,
        detonate: [DoT.bleed, DoT.bomb],
        detonation: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.3,
        pow: () => 0.9,
        enhance: [0.05, 0.1, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  commander_lorina: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1144,
    baseHP: 4895,
    baseDefense: 543,
    // form: [elements.target_max_hp, elements.target_hp_pc, elements.attack_skill_stack_5],
    attackIncrease: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      let boost = 0.1;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes.commander_lorina.skills.s2.enhance[i];
      }

      return 1 + inputValues.casterAttackStack * boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.targetMaxHP * 0.02,
        flatTip: () => ({ target_max_hp: 2 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.005, 0.005, 0.01, 0.01, 0.02]
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.005,
        multTip: () => ({ target_lost_hp_pc: 50 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  command_model_laika: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 1182,
    baseHP: 5299,
    baseDefense: 571,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  commander_pavel: new Hero({
    element: HeroElement.light,
    class: HeroClass.ranger,
    // form: [elements.target_attack],
    baseAttack: 1327,
    baseHP: 5138,
    baseDefense: 582,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.75,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.75,
        pow: () => 1,
        penetrate: (inputValues: DamageFormData, casterAttack: number) => {
          const targetAtk = inputValues.targetAttack;

          const penDiff = (casterAttack - targetAtk) * 0.000117;

          return Math.min(Math.max(0, penDiff), 0.7);
        },
        penetrateTip: () => ({caster_target_atk_diff: 0.0117}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        isSingle: () => true,
      })
    }
  }),
  conqueror_lilias: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 885,
    baseHP: 6149,
    baseDefense: 613,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.2,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  corvus: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 903,
    baseDefense: 630,
    baseHP: 6635,
    // form: [elements.caster_defense, elements.caster_enrage],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: (inputValues: DamageFormData) => inputValues.casterEnraged ? 0.9 : 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => (inputValues.casterEnraged ? 1.2 : 0.9) * inputValues.casterDefense,
        flatTip: (inputValues: DamageFormData) => ({ caster_defense: inputValues.casterEnraged ? 120 : 90 }),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        defenseScaling: true,
        rate: () => 0.3,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.05, 0, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  crescent_moon_rin: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1027,
    baseHP: 5299,
    baseDefense: 469,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.6,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  crimson_armin: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 821,
    baseDefense: 703,
    baseHP: 6266,
    // form: [elements.caster_defense],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.6,
        flatTip: () => ({ caster_defense: 60 }),
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  crozet: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 739,
    baseDefense: 733,
    baseHP: 6868,
    // form: [elements.caster_max_hp, elements.caster_defense],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.6,
        pow: () => 1.05,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.1, 0.1]
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 0.75 : 0.5,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.6,
        flatTip: () => ({ caster_defense: 60 }),
        enhance: [0.1, 0, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  dark_corvus: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 966,
    baseHP: 7323,
    baseDefense: 657,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        noCrit: true,
        soulburn: true,
        rate: () => 0,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterMaxHP * (soulburn ? 0.375 : 0.25),
        flatTip: (soulburn: boolean) => ({ caster_max_hp: soulburn ? 37.5 : 25 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  death_dealer_ray: new Hero({
    element: HeroElement.dark,
    class: HeroClass.soul_weaver,
    baseAttack: 621,
    baseHP: 6034,
    baseDefense: 775,
    // form: [elements.target_injuries],
    skills: {
      s1: new Skill({
        id: 's1',
        //TODO: add venom detonate
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        noCrit: true,
        noMiss: true,
        rate: () => 0,
        pow: () => 0,
        afterMath: () => ({ injuryPercent: 0.8, penetrate: () => 0.7 }),
        isSingle: () => true,
      })
    }
  }),
  desert_jewel_basar: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    baseAttack: 948,
    baseHP: 4370,
    baseDefense: 652,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  designer_lilibet: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    // form: [elements.caster_defense],
    baseAttack: 975,
    baseDefense: 652,
    baseHP: 7054,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.6,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 1.0,
        flatTip: () => ({ caster_defense: 100 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 0.6,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 1.15,
        flatTip: () => ({ caster_defense: 115 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        aoe: true,
      })
    }
  }),
  destina: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 621,
    baseHP: 6034,
    baseDefense: 775,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  diene: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 649,
    baseHP: 5254,
    baseDefense: 694,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0, 0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  dingo: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 957,
    baseHP: 5057,
    baseDefense: 592,
    dot: [DoT.bleed, DoT.burn],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  dizzy: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 5299,
    baseDefense: 673,
    // form: [elements.target_has_debuff],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.7,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.targetHasDebuff ? 1.3 : 1.0,
        multTip: () => ({ target_debuff: 30 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        onlyMiss: true,
        rate: 2.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  doll_maker_pearlhorizon: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    baseAttack: 921,
    baseHP: 4855,
    baseDefense: 631,
    // form: [elements.target_max_hp, elements.target_has_sleep],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.6,
        pow: () => 1,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.9,
        extraDmg: (inputValues: DamageFormData) => inputValues.targetAsleep ? inputValues.targetMaxHP * 0.3 : 0,
        extraDmgTip: (inputValues: DamageFormData) => ({ target_max_hp: inputValues.targetAsleep ? 30 : 0 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  dominiel: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 957,
    baseHP: 5016,
    baseDefense: 645,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill),
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.75,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  doris: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    baseAttack: 540,
    baseHP: 5319,
    baseDefense: 705,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  eaton: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 685,
    baseHP: 7043,
    baseDefense: 703,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.25,
    barrierEnhance: 's3',
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        enhance: [0.05, 0.1, 0, 0.1, 0.15]
      })
    }
  }),
  eda: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1255,
    baseHP: 5016,
    baseDefense: 652,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.05,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true
      })
    }
  }),
  edward_elric: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 984,
    baseHP: 6266,
    baseDefense: 637,
    // form: [elements.caster_max_hp, elements.attack_skill_stack_3],
    barrier: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      const scale = [0, 0.1, 0, 0.15, 0];
      let boost = 1.0;
      for (let i = 0; i < molagoras['S1']; i++) {
        boost += scale[i];
      }

      return inputValues.casterMaxHP * 0.08 * boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({caster_max_hp: 10}),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.08,
        flatTip: () => ({caster_max_hp: 8}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        aoe: true
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.25,
        flatTip: () => ({caster_max_hp: 25}),
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterAttackStack * 0.2,
        multTip: () => ({per_stack: 20}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        isSingle: () => true
      })
    }
  }),
  elena: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 649,
    baseHP: 5254,
    baseDefense: 694,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  eligos: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    // form: [elements.caster_speed, elements.caster_perception, elements.target_speed],
    baseAttack: 1283,
    baseHP: 4976,
    baseDefense: 536,
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.95,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        spdScaling: true,
        rate: () => 0.7,
        pow: () => 1.3,
        mult: (inputValues: DamageFormData) => {
          const spdDiff = (inputValues.casterSpeed - inputValues.targetSpeed) * 0.025;
          return 1 + Math.min(Math.max(0, spdDiff), 2);
        },
        multTip: () => ({ caster_target_spd_diff: 0.25 }),
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  elphelt_valentine: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    baseAttack: 1003,
    baseHP: 5704,
    baseDefense: 585,
    // form: [elements.target_nb_debuff],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.targetNumberOfDebuffs * 0.2),
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  elson: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    baseAttack: 540,
    baseHP: 4900,
    baseDefense: 729,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  emilia: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 649,
    baseHP: 5254,
    baseDefense: 694,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.95,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true
      })
    }
  }),
  enott: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1019,
    baseHP: 5738,
    baseDefense: 571,
    // form: [elements.target_hp_pc],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.005,
        multTip: () => ({ target_lost_hp_pc: 0.5 }),
        enhance: [0.05, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  ervalen: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    // form: [elements.caster_max_hp, elements.target_max_hp],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 1.2,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2 : 1.4,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.6,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.casterMaxHP < inputValues.targetMaxHP ? 1 + Math.min((inputValues.targetMaxHP - inputValues.casterMaxHP) * 0.0001, 0.7) : 1,
        multTip: () => ({caster_vs_target_hp_diff: 10}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  fairytale_tenebria: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 5299,
    baseDefense: 673,
    // form: [elements.target_has_provoke, elements.target_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 1,
        extraDmg: (hitType: HitType, inputValues: DamageFormData) => hitType !== HitType.miss && inputValues.targetProvoked ? inputValues.targetMaxHP * 0.1 : 0,
        extraDmgTip: (inputValues: DamageFormData) => ({ target_max_hp: inputValues.targetProvoked ? 10 : 0 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.10],
        aoe: true,
      }),
    }
  }),
  faithless_lidica: new Hero({
    element: HeroElement.light,
    class: HeroClass.ranger,
    baseAttack: 1182,
    baseHP: 5299,
    baseDefense: 571,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.4,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  falconer_kluri: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 703,
    baseDefense: 596,
    baseHP: 5914,
    // form: [elements.caster_defense],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  fallen_cecilia: new Hero({
    element: HeroElement.dark,
    class: HeroClass.knight,
    baseAttack: 894,
    baseHP: 6840,
    baseDefense: 694,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.65,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  fighter_maya: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 821,
    baseDefense: 703,
    baseHP: 6266,
    // form: [elements.caster_defense, elements.target_hp_pc],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.75,
        flatTip: () => ({ caster_defense: 75 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 1.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 1.5,
        flatTip: () => ({ caster_defense: 150 }),
        mult: (inputValues: DamageFormData) => inputValues.targetCurrentHPPercent < 30 ? 4 : 1,
        multTip: () => ({ under_threshold: 400 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  flan: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    baseAttack: 1003,
    baseHP: 5704,
    baseDefense: 585,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  free_spirit_tieria: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 957,
    baseHP: 5057,
    baseDefense: 592,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.5 : 1.8,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.05, 0.15],
        isSingle: () => true,
      })
    }
  }),
  furious: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    baseAttack: 1068,
    baseHP: 5650,
    baseDefense: 536,
    dot: [DoT.burn],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.95 : 1.65,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      })
    }
  }),
  general_purrgis: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 903,
    baseHP: 6635,
    baseDefense: 630,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => 0.06 * inputValues.casterMaxHP,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => 0.08 * inputValues.casterMaxHP,
        flatTip: () => ({ caster_max_hp: 8 }),
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  glenn: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 920,
    baseHP: 4855,
    baseDefense: 525,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.5,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  gloomyrain: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    // form: [elements.caster_has_debuff],
    baseAttack: 1199,
    baseHP: 4491,
    baseDefense: 613,
    attackIncrease: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      if (!inputValues.casterDebuffed) return 1;

      let boost = 0.2;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes.gloomyrain.skills.s2.enhance[i];
      }

      return 1 + boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.1],
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 0.95 : 0.7,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15, 0],
        aoe: true,
      })
    }
  }),
  godmother: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    baseAttack: 1005,
    baseHP: 4693,
    baseDefense: 523,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.65,
        pow: () => 0.95,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  great_chief_khawana: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1138,
    baseHP: 5421,
    baseDefense: 536,
    // form: [elements.dual_attack_stack_5, elements.exclusive_equipment_1],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.5,
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.dualAttackStack * 0.15,
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.8 : 1.1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment1 ? 0.1 : 0,
        isSingle: () => true,
      })
    }
  }),
  guider_aither: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 1252,
    baseHP: 4612,
    baseDefense: 627,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.6,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  gunther: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 1426,
    baseHP: 5517,
    baseDefense: 583,
    dot: [DoT.bleed],
    innateAttackIncrease: (molagoras: Record<string, number>) => {
      let boost = 0.5;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes.gunther.skills.s2.enhance[i];
      }

      return boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        noCrit: true,
        rate: () => 1,
        pow: () => 0.85,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05],
      }),
      s3: new Skill({
        id: 's3',
        noCrit: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.9 : 2.2,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  hataan: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    // form: [elements.caster_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.95,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        spdScaling: true,
        rate: () => 1.3,
        pow: () => 0.85,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00125,
        multTip: () => ({ caster_speed: 0.125 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  hasol: new Hero({
    element: HeroElement.dark,
    class: HeroClass.knight,
    baseAttack: 758,
    baseHP: 6002,
    baseDefense: 639,
    // form: [elements.caster_max_hp, elements.enemy_counters],
    barrier: (inputValues: DamageFormData) => {
      return inputValues.casterMaxHP * 0.2;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        fixed: (inputValues: DamageFormData) => 500 + inputValues.enemyCounterStack * 1000,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        fixed: (inputValues: DamageFormData) => 500 + inputValues.enemyCounterStack * 1000,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  haste: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1089,
    baseHP: 5380,
    baseDefense: 511,
    // form: [elements.nb_targets, elements.target_bleed_detonate],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2 : 1.5,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => {
          switch (inputValues.numberOfTargets) {
          case 1: return 2.5;
          case 2: return 2.0;
          case 3: return 1.5;
          default: return 1.0;
          }
        },
        multTip: () => ({ per_fewer_target: 50 }),
        enhance: [0.15, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  hazel: new Hero({
    element: HeroElement.fire,
    class: HeroClass.soul_weaver,
    baseAttack: 762,
    baseHP: 4450,
    baseDefense: 662,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  helen: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 685,
    baseDefense: 703,
    baseHP: 6403,
    // form: [elements.caster_defense],
    barrier: (inputValues: DamageFormData) => inputValues.casterDefense * 0.8,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.8,
        flatTip: () => ({ caster_defense: 80 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        isSingle: () => true
      }),
      s2: new Skill({
        id: 's2',
        defenseScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense,
        flatTip: () => ({ caster_defense: 100 }),
        enhance: [0.1, 0.1, 0.1, 0, 0, 0, 0],
        isSingle: () => true
      })
    }
  }),
  helga: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1000,
    baseHP: 4895,
    baseDefense: 518,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.55,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  holiday_yufine: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6266,
    baseDefense: 627,
    dot: [DoT.burn],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.8,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        aoe: true,
      })
    }
  }),
  holy_flame_adin: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    // form: [elements.skill_tree_completed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { skill_tree: 10 } : null),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 1,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1.05,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  hurado: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 930,
    baseHP: 4572,
    baseDefense: 585,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  hwayoung: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    // info: "<strong>Notice:</strong> Hwayoung's S1 additional damage penetration has been set back to 0.7 in the calculator.  It was presumed" +
    //       " to have been removed because it did not show up when the skill data spreadsheet datamined.  However, as of now it is presumed all" +
    //       " additional damage of this kind has 0.7 def pen due to other heroes' additional damage penetration similarly being absent in datamines.",
    baseAttack: 1119,
    baseHP: 6226,
    baseDefense: 627,
    // form: [elements.caster_has_buff, elements.caster_max_hp, elements.target_max_hp],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.45,
    innateAttackIncrease: (molagoras: Record<string, number>) => {
      let boost = 0.20;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes.hwayoung.skills.s2.enhance[i];
      }
      return boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.8,
        pow: () => 1,
        afterMath: (hitType: HitType, inputValues: DamageFormData) => inputValues.casterHasBuff && hitType !== HitType.miss ? ({ attackPercent: 0.25, penetrate: () => 0.7 }) : null,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
        noCrit: true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.01, 0.02, 0.02, 0.02, 0.03],
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.25,
        pow: () => 1,
        penetrate:(inputValues: DamageFormData) => inputValues.casterMaxHP < inputValues.targetMaxHP
          ? Math.min((inputValues.targetMaxHP - inputValues.casterMaxHP) * 0.000091, 1)
          : 0,
        penetrateTip: () => ({ caster_vs_target_hp_diff: 9.1 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
        noCrit: true,
      }),
    }
  }),
  // hwayoung_old: {
  //   name: 'Hwayoung (Pre-Balance)',
  //   element: HeroElement.fire,
  //   class: HeroClass.warrior,
  //   baseAttack: 1510,
  //   // form: [elements.caster_has_buff, elements.caster_max_hp, elements.target_max_hp],
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
  //       afterMath: (inputValues: DamageFormData) => inputValues.casterHasBuff ? ({ attackPercent: 0.5, penetrate: () => 0.7 }) : null,
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
  //       mult: (inputValues: DamageFormData) => inputValues.casterMaxHP < inputValues.targetMaxHP
  //           ? 1 + Math.min((inputValues.targetMaxHP - inputValues.casterMaxHP)*0.00015, 1)
  //           : 1,
  //       multTip: () => ({ caster_vs_target_hp_diff: 15 }),
  //       penetrate: () => 1,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //       noCrit: true,
  //     },
  //   }
  // },
  ian: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    baseAttack: 1081,
    baseHP: 4450,
    baseDefense: 504,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.15 : 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  ilynav: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 957,
    baseHP: 6148,
    baseDefense: 634,
    // form: [elements.caster_max_hp, elements.target_injuries],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.4 : 1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterMaxHP * (soulburn ? 0.28 : 0.18),
        flatTip: (soulburn: boolean) => ({ caster_max_hp: (soulburn ? 28 : 18) }),
        afterMath: () => ({ injuryPercent: 0.5, penetrate: () => 0.7 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
        flatTip: () => ({ caster_max_hp: 15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  // ilynav_old: {
  //   name: 'Ilynav (Pre-Balance)',
  //   element: HeroElement.fire,
  //   class: HeroClass.knight,
  //   baseAttack: 957,
  //   // form: [elements.caster_max_hp],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.7,
  //       pow: () => 1,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.08,
  //       flatTip: () => ({ caster_max_hp: 8 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     },
  //     s2: new Skill({
  //       rate: () => 1,
  //       pow: () => 1,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.18,
  //       flatTip: () => ({ caster_max_hp: 18 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.7,
  //       pow: () => 1,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.12,
  //       flatTip: () => ({ caster_max_hp: 12 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     }
  //   }
  // },
  inferno_khawazu: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6091,
    baseDefense: 594,
    // form: [elements.target_burn_detonate],
    dot: [DoT.burn],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.95,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1,  0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.7,
        pow: () => 1,
        detonate: DoT.burn,
        detonation: () => 1.2,
        isSingle: () => true,
      })
    }
  }),
  infinite_horizon_achates: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    // form: [elements.caster_max_hp],
    baseAttack: 576,
    baseHP: 5165,
    baseDefense: 767,
    barrierSkills: ['S2', 'S3'],
    barrier: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      const scale = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1];
      let boost = 1.0;
      for (let i = 0; i < molagoras['S1']; i++) {
        boost += scale[i];
      }

      return inputValues.casterMaxHP * 0.18 * boost;
    },
    barrier2: (inputValues: DamageFormData) => {
      return inputValues.casterMaxHP * 0.2;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1]
      }),
    }
  }),
  iseria: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 1158,
    baseHP: 6002,
    baseDefense: 553,
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2 : 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: 2,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  jack_o: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    // form: [elements.target_has_debuff],
    baseAttack: 1228,
    baseHP: 5784,
    baseDefense: 553,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.75,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
        rate: () => 1.1,
        pow: () => 1,
        enhance_from: 's1',
        isExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.targetHasDebuff ? 1.5 : 1,
        multTip: () => ({ target_has_debuff: 50 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  // jack_o_old: {
  //   name: 'Jack-O\' (Pre-Balance)',
  //   element: HeroElement.fire,
  //   class: HeroClass.warrior,
  //   // form: [elements.target_has_debuff],
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
  //       enhance_from: 's1',
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.95,
  //       pow: () => 1,
  //       mult: (inputValues: DamageFormData) => inputValues.targetHasDebuff ? 1.3 : 1,
  //       multTip: () => ({ target_has_debuff: 30 }),
  //       penetrate: () => 0.5,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     }
  //   }
  // },
  januta: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    // form: [elements.caster_enrage],
    baseAttack: 1144,
    baseHP: 4895,
    baseDefense: 543,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.casterEnraged ? 1.3 : 1,
        multTip: () => ({ caster_rage: 30 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  jecht: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 804,
    baseHP: 3925,
    baseDefense: 599,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  jena: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1063,
    baseHP: 4491,
    baseDefense: 599,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.85,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  // jena_old: {
  //   name: 'Jena (Pre-Balance)',
  //   element: HeroElement.ice,
  //   class: HeroClass.mage,
  //   baseAttack: 1063,
  //   // form: [elements.target_nb_debuff],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 1,
  //       pow: () => 0.95,
  //       mult: (inputValues: DamageFormData) => 1 + inputValues.targetNumberOfDebuffs*0.1,
  //       multTip: () => ({ per_target_debuff: 10 }),
  //       enhance: [0.05, 0.05, 0.1, 0.15],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.1 : 0.85,
  //       pow: () => 0.95,
  //       enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  judge_kise: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 1039,
    baseHP: 5340,
    baseDefense: 617,
    // form: [elements.nb_targets],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.15, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.numberOfTargets - 1) * 0.1,
        multTip: () => ({ per_target: 10 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  judith: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 848,
    baseHP: 4289,
    baseDefense: 494,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  juni: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    // form: [elements.caster_perception],
    baseAttack: 1000,
    baseHP: 4895,
    baseDefense: 518,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1.1,
        enhance: [0.05, 0, 0.05, 0, 0.1],
        aoe: true,
      })
    }
  }),
  kanna: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    // form: [elements.caster_speed],
    baseAttack: 1182,
    baseHP: 5299,
    baseDefense: 571,
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.75,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  karin: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1188,
    baseHP: 4855,
    baseDefense: 508,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.3 : 1.6,
        pow: () => 0.85,
        critDmgBoost: () => 0.5,
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  kawerik: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1306,
    baseHP: 4248,
    baseDefense: 652,
    // form: [elements.target_speed, elements.caster_speed, elements.exclusive_equipment_3],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.4,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.targetSpeed * 0.003,
        multTip: () => ({ target_speed: 0.3 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        rate: () => 0.8,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        penetrate: () => 0.3,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.2 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  kayron: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1119,
    baseHP: 5340,
    baseDefense: 483,
    // form: [elements.caster_hp_pc, elements.exclusive_equipment_1, elements.exclusive_equipment_2],
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.35 : 0.85,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.0015,
        multTip: () => ({ caster_lost_hp_pc: 0.15 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment1 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.7,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.003,
        multTip: () => ({ caster_lost_hp_pc: 0.3 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  ken: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 966,
    baseHP: 7323,
    baseDefense: 657,
    // form: [elements.caster_max_hp],
    dot: [DoT.burn],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.5,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.3,
        flatTip: () => ({ caster_max_hp: 30 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  khawana: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 957,
    baseHP: 4653,
    baseDefense: 515,
    // form: [elements.target_has_debuff, elements.caster_speed],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        afterMath: (inputValues: DamageFormData) => inputValues.targetHasDebuff ? { attackPercent: 0.6, penetrate: () => 0.7 } : null,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        spdScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        rate: () => 1.5,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  khawazu: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 4653,
    baseDefense: 515,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  kikirat_v2: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 667,
    baseDefense: 749,
    baseHP: 5704,
    // form: [elements.caster_defense],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 0.5 : 0.4,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterDefense * (soulburn ? 0.6 : 0.5),
        flatTip: (soulburn: boolean) => ({ caster_defense: soulburn ? 60 : 50 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  kiris: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 857,
    baseHP: 5057,
    baseDefense: 543,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.05, 0.05],
        aoe: true,
      })
    }
  }),
  kise: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1283,
    baseHP: 5138,
    baseDefense: 522,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.65,
    // form: [elements.target_has_buff, elements.caster_stealth, elements.caster_hp_pc, elements.exclusive_equipment_2],
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.4 : 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        mult: (soulburn: boolean, inputValues: DamageFormData) => {
          if (!inputValues.targetHasBuff) return 1;

          return soulburn ? 2 : 1.7;
        },
        multTip: (soulburn: boolean) => ({ target_debuff: soulburn ? 100 : 70 }),
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.9,
        pow: () => 1,
        penetrate: (inputValues: DamageFormData) => inputValues.casterHasStealth ? 0.6 : 0.3,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.6,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterCurrentHPPercent * 0.0035,
        multTip: () => ({ caster_left_hp_pc: 0.35 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  // kise_old: {
  //   name: 'Kise (Pre-Balance)',
  //   element: HeroElement.ice,
  //   class: HeroClass.thief,
  //   baseAttack: 1283,
  //   barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAtk() * 0.5,
  //   // form: [elements.target_has_buff, elements.caster_stealth, elements.caster_hp_pc, elements.exclusive_equipment_2],
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
  //       penetrate: (inputValues: DamageFormData) => inputValues.casterHasStealth ? 0.6 : 0.3,
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1.6,
  //       pow: () => 1,
  //       mult: (inputValues: DamageFormData) => 1 + inputValues.casterCurrentHPPercent*0.0035,
  //       multTip: () => ({ caster_left_hp_pc: 0.35 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     }
  //   }
  // },
  kitty_clarissa: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 957,
    baseHP: 5057,
    baseDefense: 592,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.9,
        pow: () => 0.8,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,

      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.05 : 0.8,
        pow: () => 0.95,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  kizuna_ai: new Hero({
    element: HeroElement.fire,
    class: HeroClass.soul_weaver,
    baseAttack: 576,
    baseHP: 5700,
    baseDefense: 743,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.14,
    barrierEnhance: 's3',
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        enhance: [0.05, 0.1, 0.15]
      }),
    }
  }),
  kluri: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 703,
    baseDefense: 596,
    baseHP: 5914,
    // form: [elements.caster_defense],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  krau: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 839,
    baseHP: 6405,
    baseDefense: 752,
    // form: [elements.caster_max_hp, elements.caster_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => 0.085 * inputValues.casterMaxHP,
        flatTip: () => ({ caster_max_hp: 8.5 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => 0.13 * inputValues.casterMaxHP,
        flatTip: () => ({ caster_max_hp: 13 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        noCrit: true,
        rate: () => 0.3,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => 0.53571 * Math.max(inputValues.casterMaxHP - inputValues.casterCurrentHP, 0),
        flatTip: () => ({ caster_lost_hp: 53.571 }),
        penetrate: () => 1.0,
        isSingle: () => true,
      })
    }
  }),
  landy: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 1158,
    baseHP: 6002,
    baseDefense: 553,
    // form: [elements.caster_full_fighting_spirit, elements.attack_skill_stack_3],
    attackIncrease: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      let boost = 0.15;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes.landy.skills.s2.enhance[i];
      }

      return 1 + inputValues.casterAttackStack * boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.005, 0.005, 0.01, 0.01, 0.02]
      }),
      s3: new Skill({
        id: 's3',
        aoe: true,
        rate: () => 0.9,
        pow: () => 1,
        penetrate: (inputValues: DamageFormData) => inputValues.casterFullFightingSpirit ? 0.5 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1]
      })
    }
  }),
  last_piece_karin: new Hero({
    element: HeroElement.light,
    class: HeroClass.thief,
    baseAttack: 1029,
    baseHP: 5097,
    baseDefense: 473,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.65,
    // form: [elements.caster_speed, elements.target_max_hp, elements.caster_has_neo_phantom_sword],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.5 : 0.9,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        flat: (inputValues: DamageFormData) => inputValues.casterHasNeoPhantomSword ? inputValues.targetMaxHP * 0.2 : 0,
        flatTip: () => ({ target_max_hp: 20 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
        noTrans: (inputValues: DamageFormData) => inputValues.casterHasNeoPhantomSword ? true : false
      }),
      s2: new Skill({
        id: 's2',
        spdScaling: true,
        rate: () => 1.5,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.0015,
        multTip: () => ({ caster_speed: 0.15 }),
        flat: (inputValues: DamageFormData) => inputValues.casterHasNeoPhantomSword ? inputValues.targetMaxHP * 0.2 : 0,
        flatTip: () => ({ target_max_hp: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
        noTrans: (inputValues: DamageFormData) => inputValues.casterHasNeoPhantomSword
      })
    }
  }),
  last_rider_krau: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 839,
    baseHP: 6405,
    baseDefense: 752,
    // form: [elements.caster_max_hp, elements.attack_skill_stack_3, elements.caster_speed],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => 0.1 * inputValues.casterMaxHP,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        spdScaling: true,
        noCrit: true,
        rate: () => 0.3,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => 0.06 * inputValues.casterMaxHP,
        flatTip: () => ({ caster_max_hp: 6 }),
        mult: (inputValues: DamageFormData) => 1 + (inputValues.casterAttackStack * 0.2) + (inputValues.casterSpeed * 0.001125),
        multTip: () => ({ per_stack: 20, caster_speed: 0.1125 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  // last_rider_krau_old: {
  //   name: 'Last Rider Krau (Pre-Balance)',
  //   element: HeroElement.light,
  //   class: HeroClass.knight,
  //   baseAttack: 839,
  //   // form: [elements.caster_max_hp, elements.attack_skill_stack_3],
  //   barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.07,
  //   barrierEnhance: 's2',
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.7,
  //       pow: () => 1,
  //       flat: () => 0.1*inputValues.casterMaxHP,
  //       flatTip: () => ({ caster_max_hp: 10 }),
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
  //       flat: () => 0.06*inputValues.casterMaxHP,
  //       flatTip: () => ({ caster_max_hp: 6 }),
  //       mult: (inputValues: DamageFormData) => 1 + inputValues.casterAttackStack*0.2,
  //       multTip: () => ({ per_stack: 20 }),
  //       penetrate: () => 1.0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     }
  //   }
  // },
  lena: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 951,
    baseHP: 5517,
    baseDefense: 583,
    // form: [elements.target_hp_pc],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.15,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.2 : 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.002,
        multTip: () => ({ target_lost_hp_pc: 0.2 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
      }),
    }
  }),
  leo: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 930,
    baseHP: 5380,
    baseDefense: 564,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.35,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.8,
        pow: () => 0.8,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  lethe: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 885,
    baseHP: 6149,
    baseDefense: 613,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
            rate: () => 0.3,
        pow: () => 1.3,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.22,
        flatTip: () => ({caster_max_hp: 22}),
        penetrate: () => 1,
        noCrit: true,
        isExtra: true,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0.0, 0.1, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  lidica: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    baseAttack: 1283,
    baseHP: 4976,
    baseDefense: 536,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.6,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  lilias: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 821,
    baseHP: 6751,
    baseDefense: 648,
    // form: [elements.caster_max_hp, elements.highest_ally_attack],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        atk: (inputValues: DamageFormData) => inputValues.highestAllyAttack,
        noBuff: true,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
      })
    }
  }),
  // lilias_old: {
  //   name: 'Lilias (Pre-Balance)',
  //   element: HeroElement.fire,
  //   class: HeroClass.knight,
  //   baseAttack: 821,
  //   // form: [elements.caster_max_hp, elements.highest_ally_attack],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.8,
  //       pow: () => 0.95,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.12,
  //       flatTip: () => ({ caster_max_hp: 12 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.9,
  //       pow: () => 1,
  //       atk: () => inputValues.highestAllyAttack,
  //       noBuff: true,
  //       enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
  //       aoe: true,
  //     }
  //   }
  // },
  lilibet: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6266,
    baseDefense: 627,
    // form: [elements.exclusive_equipment_1, elements.exclusive_equipment_3],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment1 ? 0.2 : 0,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.6 : 2,
        pow: () => 0.95,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  lilka: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 1005,
    baseHP: 4693,
    baseDefense: 532,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1,],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.9,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  lionheart_cermia: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 966,
    baseDefense: 668,
    baseHP: 5663,
    // form: [elements.caster_defense],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1 : 0.6,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterDefense * (soulburn ? 1.6 : 1.0),
        flatTip: (soulburn: boolean) => ({ caster_defense: (soulburn ? 160 : 100) }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 1.35,
        flatTip: () => ({ caster_defense: 135 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
    }
  }),
  lionheart_cermia_old: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 966,
    baseDefense: 668,
    baseHP: 5663,
    // form: [elements.caster_defense],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1 : 0.6,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterDefense * (soulburn ? 1.6 : 1.0),
        flatTip: (soulburn: boolean) => ({ caster_defense: (soulburn ? 160 : 100) }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 0.3,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 1.35,
        flatTip: () => ({ caster_defense: 135 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
    }
  }),
  little_queen_charlotte: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6266,
    baseDefense: 627,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.elementalAdvantage ? 1.5 : 1,
        multTip: () => ({ elemental_advantage: 50 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        isSingle: () => true,
      }),
      s3_splash: new Skill({
        id: 's3_splash',
        rate: () => 0,
        pow: () => 0,
        afterMath: (inputValues: DamageFormData) => inputValues.elementalAdvantage ? { attackPercent: 1.2, penetrate: () => 0.7 } : null,
        noCrit: true,
        noMiss: true,
      })
    }
  }),
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
  //       multTip: () => ({ elemental_advantage: 30 }),
  //       penetrate: () => 0.5,
  //       enhance: [0.05, 0.05, 0, 0.05, 0.15],
  //       isSingle: () => true,
  //     },
  //     s3_splash: {
  //     //       rate: () => 0,
  //       pow: () => 0,
  //       afterMath: () => elementalAdvantage ? { attackPercent: 1.2, penetrate: () => 0.7 } : null,
  //       noCrit: true,
  //       noMiss: true,
  //     }
  //   }
  // },
  lone_crescent_bellona: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    // form: [elements.caster_has_buff, elements.attack_skill_stack_5],
    baseAttack: 1208,
    baseHP: 6488,
    baseDefense: 616,
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.casterAttackStack * 0.1,
    skills: {
      s1: new Skill({
        id: 's1',
        onlyCrit: true,
        rate: () => 0.9,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        onlyCrit: true,
        rate: () => 0.6,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        onlyCrit: true,
        rate: () => 1.5,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.casterHasBuff ? 0.3 : 0),
        multTip: () => ({ caster_has_buff: 30 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  lorina: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1144,
    baseHP: 4895,
    baseDefense: 543,
    // form: [elements.target_max_hp, elements.target_hp_pc, elements.attack_skill_stack_5],
    attackIncrease: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      let boost = 0.1;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes.lorina.skills.s2.enhance[i];
      }

      return 1 + inputValues.casterAttackStack * boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.targetMaxHP * 0.02,
        flatTip: () => ({ target_max_hp: 2 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.005, 0.005, 0.01, 0.01, 0.02]
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.005,
        multTip: () => ({ target_lost_hp_pc: 0.5 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  lots: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 603,
    baseHP: 4945,
    baseDefense: 662,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  lua: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    baseAttack: 993,
    baseHP: 6002,
    baseDefense: 611,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  lucy: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 558,
    baseHP: 4733,
    baseDefense: 661,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.9,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  ludwig: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    baseAttack: 1412,
    baseHP: 4248,
    baseDefense: 645,
    // form: [elements.caster_invincible, elements.exclusive_equipment_1, elements.exclusive_equipment_3],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.65,
        pow: () => 1.05,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment1 ? 0.1 : 0,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 0.95,
        penetrate: (inputValues: DamageFormData) => inputValues.casterInvincible ? 0.6 : 0.3,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  luluca: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1316,
    baseHP: 4777,
    baseDefense: 715,
    // form: [elements.target_hp_pc, elements.s3_stack],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * (1 + inputValues.skill3Stack * 0.2) * 0.375,
    barrierEnhance: 's2',
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.skill3Stack * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (1 - (inputValues.targetCurrentHPPercent / 100)) * 0.2,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0, 0.05, 0.1]
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  luna: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6266,
    baseDefense: 627,
    // form: [elements.caster_hp_above_50pc, elements.nb_hits],
    attackIncrease: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      if (!inputValues.casterAboveHalfHP) {
        return 1;
      }

      let mult = 1.2;
      for (let i = 0; i < molagoras['S2']; i++) {
        mult += Heroes.luna.skills.s2.enhance[i];
      }

      return mult;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean, inputValues: DamageFormData) => (soulburn ? 3 : inputValues.numberOfHits) * 0.7,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.01, 0.02, 0.02, 0.02, 0.03]
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1.05,
        penetrate: () => 0.5,
        enhance: [0.05, 0, 0.1, 0, 0.1],
        elementalAdvantage: () => true,
        isSingle: () => true,
      })
    }
  }),
  magic_scholar_doris: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    baseAttack: 540,
    baseHP: 5319,
    baseDefense: 705,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  maid_chloe: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    baseAttack: 640,
    baseHP: 5340,
    baseDefense: 720,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      })
    }
  }),
  martial_artist_ken: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1359,
    baseHP: 5542,
    baseDefense: 585,
    // form: [elements.caster_hp_pc],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        onlyCrit: true,
        rate: () => 1.2,
        pow: () => 0.95,
        mult: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
          let extra = 0;
          for (let i = 0; i < molagoras['S1']; i++) {
            extra += Heroes.martial_artist_ken.skills.s1.enhance[i];
          }
          return (1 + (100 - inputValues.casterCurrentHPPercent) * 0.004 + extra);
        },
        multTip: () => ({ caster_lost_hp_pc: 40 }),
        enhance: [0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.1 : 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  mascot_hazel: new Hero({
    element: HeroElement.fire,
    class: HeroClass.soul_weaver,
    baseAttack: 762,
    baseHP: 4450,
    baseDefense: 662,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  maya: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 821,
    baseDefense: 648,
    baseHP: 6796,
    // form: [elements.caster_defense],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.75,
        flatTip: () => ({ caster_defense: 75 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        defenseScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.8,
        flatTip: () => ({ caster_defense: 80 }),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  mediator_kawerik: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 966,
    baseHP: 7323,
    baseDefense: 657,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => 0.04 * inputValues.casterMaxHP,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 1.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => 0.09 * inputValues.casterMaxHP,
        flatTip: () => ({ caster_max_hp: 9 }),
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  melany: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 951,
    baseHP: 5517,
    baseDefense: 583,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.1, 0, 0.1, 0, 0.1],
        isSingle: () => true
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true
      })
    }
  }),
  melissa: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1412,
    baseHP: 4248,
    baseDefense: 645,
    // form: [elements.caster_hp_pc, elements.exclusive_equipment_2],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1.1,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.0035,
        multTip: () => ({ caster_lost_hp_pc: 0.35 }),
        enhance: [0.05, 0, 0.05, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.003,
        multTip: () => ({ caster_lost_hp_pc: 0.3 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  // melissa_old: {
  //   name: 'Melissa (Pre-Balance)',
  //   element: HeroElement.fire,
  //   class: HeroClass.mage,
  //   baseAttack: 1412,
  //   // form: [elements.caster_hp_pc, elements.exclusive_equipment_2],
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
  mercedes: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1187,
    baseHP: 4491,
    baseDefense: 627,
    // form: [elements.nb_targets, elements.target_hp_pc, elements.caster_immense_power],
    attackIncrease: (inputValues: DamageFormData) => inputValues.casterHasImmensePower ? 1.15 : 1,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.8,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 0.9 : 0.7,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => {
          switch (inputValues.numberOfTargets) {
          case 1: return 1.9;
          case 2: return 1.6;
          case 3: return 1.3;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 30 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      }),
      s2_bis: new Skill({
        id: 's2_bis',
        rate: () => 0.35,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => {
          switch (inputValues.numberOfTargets) {
          case 1: return 1.9;
          case 2: return 1.6;
          case 3: return 1.3;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 30 }),
        enhance_from: 's2',
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.15,
        pow: () => 0.95,
        critDmgBoost: () => 0.2,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.003,
        multTip: () => ({ caster_lost_hp_pc: 0.3 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  mercenary_helga: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1000,
    baseHP: 4895,
    baseDefense: 518,
    // form: [elements.skill_tree_completed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.skillTreeCompleted ? 0.1 : 0),
        multTip: () => ({ skill_tree: 10 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.55,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.skillTreeCompleted ? 0.05 : 0),
        multTip: () => ({ skill_tree: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  mighty_scout: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 919,
    baseHP: 5259,
    baseDefense: 525,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.35,
        pow: () => 1,
        penetrate: () => 0.7,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  milim: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1359,
    baseHP: 4895,
    baseDefense: 652,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.7,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        isSingle: () => true,
      }),
    }
  }),
  mirsa: new Hero({
    element: HeroElement.light,
    class: HeroClass.thief,
    baseAttack: 885,
    baseHP: 4410,
    baseDefense: 501,
    // form: [elements.caster_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.5 : 1.8,
        pow: () => 0.85,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.0015,
        multTip: () => ({ caster_speed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  mistychain: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1244,
    baseHP: 3925,
    baseDefense: 606,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.3,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.5,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  montmorancy: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 540,
    baseHP: 4900,
    baseDefense: 729,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  moon_bunny_dominiel: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    baseAttack: 649,
    baseHP: 4572,
    baseDefense: 631,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.21,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.1]
      }),
    }
  }),
  mort: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 957,
    baseHP: 6148,
    baseDefense: 634,
    // form: [elements.caster_max_hp, elements.caster_enrage, elements.exclusive_equipment_3],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.08,
        flatTip: () => ({ caster_max_hp: 8 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
        flatTip: () => ({ caster_max_hp: 15 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  mucacha: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1000,
    baseHP: 4895,
    baseDefense: 518,
    // form: [elements.caster_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        rate: () => 1.5,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  mui: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1039,
    baseHP: 5340,
    baseDefense: 617,
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
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
  //       aoe: true,
  //     },
  //     s3: new Skill({
  //       rate: () => 1,
  //       pow: () => 0.95,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  muse_rima: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    // form: [elements.skill_tree_completed],
    baseAttack: 822,
    baseHP: 4693,
    baseDefense: 561,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.8,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.skillTreeCompleted ? 0.05 : 0),
        multTip: () => ({ skill_tree: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.3,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  muwi: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1039,
    baseHP: 5517,
    baseDefense: 452,
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.25 : 1,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  navy_captain_landy: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 1134,
    baseDefense: 662,
    baseHP: 5825,
    // form: [elements.attack_skill_stack_5],
    attackIncrease: (inputValues: DamageFormData) => {
      return 1 + inputValues.casterAttackStack * 0.1;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
            rate: () => 0.8,
        pow: () => 1.3,
        isExtra: true,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        penetrate: () => 0.6,
        aoe: true,
      })
    }
  }),
  nemunas: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    baseAttack: 920,
    baseHP: 4855,
    baseDefense: 525,
    // form: [elements.target_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.7 : 1,
        pow: () => 0.8,
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.targetMaxHP * (soulburn ? 0.085 : 0.05),
        flatTip: (soulburn: boolean) => ({ target_max_hp: soulburn ? 8.5 : 5 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  ocean_breeze_luluca: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 649,
    baseHP: 5254,
    baseDefense: 694,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        aoe: true,
      })
    }
  }),
  operator_sigret: new Hero({
    element: HeroElement.dark,
    class: HeroClass.ranger,
    baseAttack: 1079,
    baseHP: 5502,
    baseDefense: 564,
    // form: [elements.target_has_barrier, elements.caster_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        spdScaling: true,
        rate: () => 0.75,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        penetrate: (inputValues: DamageFormData) => inputValues.targetHasBarrier ? 1.0 : 0.5,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        rate: () => 1,
        pow: () => 1.1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  orte: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 857,
    baseHP: 4531,
    baseDefense: 483,
    // form: [elements.caster_perception, elements.caster_speed, elements.target_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.65,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        penetrate: (inputValues: DamageFormData) => {
          const casterSpd = inputValues.casterSpeed;
          const targetSpd = inputValues.targetSpeed;

          const penDiff = (casterSpd - targetSpd) * 0.003;
          return Math.min(Math.max(0, penDiff) + 0.3, 0.7);
        },
        penetrateTip: () => ({ caster_target_spd_diff: 0.3 }),
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  otillie: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 885,
    baseHP: 4693,
    baseDefense: 617,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  pavel: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 1283,
    baseHP: 4976,
    baseDefense: 536,
    // form: [elements.caster_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.9,
        pow: () => 1.1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.05, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        spdScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        rate: () => 1.6,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.0015,
        multTip: () => ({ caster_speed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        isSingle: () => true,
      })
    }
  }),
  peacemaker_furious: new Hero({
    element: HeroElement.dark,
    class: HeroClass.ranger,
    baseAttack: 970,
    baseDefense: 557,
    baseHP: 5935,
    // form: [elements.caster_defense, elements.caster_fury],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.8,
        flatTip: () => ({ caster_defense: 80 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 1.3,
        flatTip: () => ({ caster_defense: 130 }),
        penetrate: (inputValues: DamageFormData) => {
          const targetDef = inputValues.targetDefense;
          const casterDef = inputValues.casterDefense;

          const penDiffMult = (casterDef - targetDef) * 0.00032;

          return Math.min(Math.max(0, penDiffMult), 0.6);
        },
        penetrateTip: () => ({caster_target_def_diff: 0.032}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
    }
  }),
  pearlhorizon: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    baseAttack: 921,
    baseHP: 4855,
    baseDefense: 631,
    // form: [elements.target_max_hp, elements.target_has_sleep],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.6,
        pow: () => 1,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.9,
        extraDmg: (inputValues: DamageFormData) => inputValues.targetAsleep ? inputValues.targetMaxHP * 0.2 : 0,
        extraDmgTip: (inputValues: DamageFormData) => ({ target_max_hp: inputValues.targetAsleep ? 20 : 0 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  peira: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1075,
    baseHP: 5562,
    baseDefense: 487,
    barrier: (molagoras: Record<string, number>) => {
      let boost = 1.0;
      for (let i = 0; i < molagoras['S3']; i++) {
        boost += Heroes.peira.skills.s3.enhance[i];
      }
      return 180 * boost * 60;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
      })
    }
  }),
  penelope: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1039,
    baseHP: 5517,
    baseDefense: 452,
    // form: [elements.attack_skill_stack_3],
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.casterAttackStack * 0.15,
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.6 : 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1.2,
        enhance: [0, 0.1, 0, 0, 0],
        isSingle: () => true,
      }),
    }
  }),
  pirate_captain_flan: new Hero({
    element: HeroElement.dark,
    class: HeroClass.ranger,
    baseAttack: 1182,
    baseHP: 5299,
    baseDefense: 571,
    // form: [elements.target_burn_detonate, elements.target_bomb_detonate],
    dot: [DoT.burn, DoT.bomb],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.7,
        pow: () => 0.95,
        detonate: [DoT.burn, DoT.bomb],
        detonation: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
        noCrit: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.8,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
        noCrit: true,
      }),
    }
  }),
  politis: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1197,
    baseHP: 4572,
    baseDefense: 683,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      }),
    }
  }),
  purrgis: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6091,
    baseDefense: 594,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
            rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance_from: 's1',
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.05 : 0.8,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  pyllis: new Hero({
    element: HeroElement.dark,
    class: HeroClass.knight,
    baseAttack: 685,
    baseDefense: 703,
    baseHP: 6403,
    // form: [elements.caster_defense, elements.caster_attacked_stack_3],
    barrier: (inputValues: DamageFormData) => inputValues.casterDefense * (1 + inputValues.casterAttackedStack * 0.1) * 0.6,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * (1 + inputValues.casterAttackedStack * 0.1) * 0.5,
        flatTip: () => ({ caster_defense: 50, per_stack: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 1.3,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * (1 + inputValues.casterAttackedStack * 0.1) * 0.7,
        flatTip: () => ({ caster_defense: 70, per_stack: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  ram: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    baseAttack: 1556,
    baseHP: 4572,
    baseDefense: 683,
    innateAttackIncrease: () => 0.3,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        // add soulburn aoe condition?
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8, 
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true
      })
    }
  }),
  ran: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1119,
    baseHP: 5380,
    baseDefense: 483,
    // form: [elements.caster_speed, elements.target_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.9,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        penetrate: () => 0.2,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075 + inputValues.targetSpeed * 0.0015,
        multTip: () => ({ caster_speed: 0.075, target_speed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  ras: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 758,
    baseHP: 5826,
    baseDefense: 672,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
    }
  }),
  ravi: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 966,
    baseHP: 7323,
    baseDefense: 657,
    // form: [elements.attack_skill_stack_5],
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.casterAttackStack * 0.15,
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.5 : 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.85,
        pow: () => 0.95,
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  ray: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 694,
    baseHP: 4855,
    baseDefense: 655,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  rem: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1208,
    baseHP: 6488,
    baseDefense: 616,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.95,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        canExtra: true,
        isSingle: () => true
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.5, 
        pow: () => 1,
        aoe: true
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1, 
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true
      })
    }
  }),
  remnant_violet: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1283,
    baseHP: 5138,
    baseDefense: 522,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.3,
        pow: () => 1,
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  requiem_roana: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    // form: [elements.attack_skill_stack_3],
    baseAttack: 1316,
    baseHP: 4777,
    baseDefense: 715,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        afterMath: (hitType: HitType) => hitType !== HitType.miss ? ({ attackPercent: 0.5, penetrate: () => 0.7 }) : null,
        noCrit: true,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.3,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterAttackStack * 0.15,
        multTip: () => ({per_stack: 15}),
        penetrate: () => 1.0,
        noCrit: true,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true
      }),
    }
  }),
  requiemroar: new Hero({
    element: HeroElement.dark,
    class: HeroClass.soul_weaver,
    baseAttack: 842,
    baseHP: 4046,
    baseDefense: 613,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.7 : 1.8,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  researcher_carrot: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 3925,
    baseDefense: 606,
    // form: [elements.target_burn_detonate],
    dot: [DoT.burn],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.6,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        pow: () => 0.95,
        rate: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        detonate: DoT.burn,
        detonation: () => 1.1,
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.15, 0.15]
      }),
      s3: new Skill({
        id: 's3',
        pow: () => 1,
        rate: () => 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  righteous_thief_roozid: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 812,
    baseHP: 4370,
    baseDefense: 462,
    // form: [elements.caster_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        spdScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  rikoris: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 951,
    baseHP: 5517,
    baseDefense: 583,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        aoe: true,
      })
    }
  }),
  rima: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    baseAttack: 822,
    baseHP: 4693,
    baseDefense: 561,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.8,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.3,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  rimuru: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6266,
    baseDefense: 627,
    // form: [elements.allies_nb_buff],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.65,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1,
        fixed: (hitType: HitType, inputValues: DamageFormData) => (hitType !== HitType.miss) ? Math.min(5000 + (inputValues.totalAllyBuffs * 625), 10000) : 0,
        fixedTip: () => ({ allies_buff: 625 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  rin: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 594,
    baseHP: 5057,
    baseDefense: 691,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.9,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.07,
        flatTip: () => ({caster_max_hp: 7}),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  riza_hawkeye: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    baseAttack: 1003,
    baseHP: 5704,
    baseDefense: 585,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.15,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: 2,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  roaming_warrior_leo: new Hero({
    element: HeroElement.dark,
    class: HeroClass.ranger,
    baseAttack: 1088,
    baseHP: 5016,
    baseDefense: 553,
    // form: [elements.target_has_debuff],
    dot: [DoT.bomb],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.targetHasDebuff ? 1.1 : 1,
        multTip: () => ({ target_has_debuff: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.8,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  roana: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 621,
    baseHP: 5474,
    baseDefense: 802,
    // form: [elements.caster_max_hp],
    barrierSkills: ['S1', 'S3'],
    barrier: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      const scale = [0, 0.05, 0, 0.1, 0, 0.1, 0];
      let boost = 1.0;
      for (let i = 0; i < molagoras['S1']; i++) {
        boost += scale[i];
      }

      return inputValues.casterMaxHP * 0.1 * boost;
    },
    barrier2: (inputValues: DamageFormData) => {
      return inputValues.casterMaxHP * 0.15;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      })
    }
  }),
  romann: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1109,
    baseHP: 4329,
    baseDefense: 655,
    // form: [elements.target_has_buff],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 0.85,
        mult: (inputValues: DamageFormData) => inputValues.targetHasBuff ? 1.3 : 1,
        multTip: () => ({ target_has_buff: 30 }),
        enhance: [0.05, 0.1, 0, 0.15, 0.15],
        aoe: true,
      }),
    }
  }),
  roozid: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 812,
    baseHP: 4370,
    baseDefense: 462,
    // form: [elements.caster_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        spdScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  rose: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 821,
    baseDefense: 703,
    baseHP: 6266,
    // form: [elements.caster_defense],
    barrier: (inputValues: DamageFormData) => inputValues.casterDefense,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * 0.7,
        flatTip: () => ({caster_defense: 70}),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  roy_mustang: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1412,
    baseHP: 4248,
    baseDefense: 645,
    // form: [elements.caster_has_flame_alchemist, elements.nb_targets],
    attackIncrease: (inputValues: DamageFormData) => inputValues.casterHasFlameAlchemist ? 1.2 : 1,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.8,
        pow: () => 1,
        penetrate: (inputValues: DamageFormData) => inputValues.casterHasFlameAlchemist ? 0.5 : 0,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => {
          switch (inputValues.numberOfTargets) {
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
      })
    }
  }),
  ruele_of_light: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    baseAttack: 621,
    baseHP: 5474,
    baseDefense: 802,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.81,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.07,
        flatTip: () => ({caster_max_hp: 7}),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  sage_baal_and_sezan: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 5299,
    baseDefense: 673,
    // form: [elements.caster_max_hp, elements.caster_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1.1,
        enhance: [0.05, 0, 0.05, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.85,
        pow: () => 1.3,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        penetrate: () => 1.0,
        flat: (inputValues: DamageFormData) => 0.25 * Math.max(inputValues.casterMaxHP - inputValues.casterCurrentHP, 0),
        flatTip: () => ({ caster_lost_hp: 25 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noCrit: true,
        isSingle: () => true,
      })
    }
  }),
  savior_adin: new Hero({
    element: HeroElement.light,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    // form: [elements.skill_tree_completed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1.3,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        penetrate: () => 0.5,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted && inputValues.elementalAdvantage ? 1.2 : 1,
        multTip: () => ({ skill_tree_elemental: 20 }),
        isSingle: () => true,
      }),
    }
  }),
  schuri: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    baseAttack: 1068,
    baseHP: 5650,
    baseDefense: 536,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  senya: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 1445,
    baseDefense: 645,
    baseHP: 6321,
    innateAttackIncrease: () => 0.3,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.25,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.95,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noCrit: true,
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0,
        pow: () => 0,
        afterMath: () => ({ attackPercent: 0.45, penetrate: () => 0.7 }),
        noCrit: true,
        noMiss: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        noCrit: true,
        aoe: true,
      })
    }
  }),
  shadow_knight_pyllis: new Hero({
    element: HeroElement.dark,
    class: HeroClass.knight,
    baseAttack: 685,
    baseDefense: 703,
    baseHP: 6403,
    // form: [elements.caster_defense, elements.caster_attacked_stack_3],
    barrier: (inputValues: DamageFormData) => inputValues.casterDefense * (1 + inputValues.casterAttackedStack * 0.1) * 0.6,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * (1 + inputValues.casterAttackedStack * 0.1) * 0.5,
        flatTip: () => ({ caster_defense: 50, per_stack: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 1.3,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterDefense * (1 + inputValues.casterAttackedStack * 0.1) * 0.7,
        flatTip: () => ({ caster_defense: 70, per_stack: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  shepherd_jena: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    // form: [elements.skill_tree_completed],
    baseAttack: 1063,
    baseHP: 4491,
    baseDefense: 599,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.85,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? 1.05 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? {skill_tree: 5} : null),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  shooting_star_achates: new Hero({
    element: HeroElement.dark,
    class: HeroClass.soul_weaver,
    baseAttack: 576,
    baseHP: 5700,
    baseDefense: 743,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.1, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  shuna: new Hero({
    element: HeroElement.fire,
    class: HeroClass.soul_weaver,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.18,
    barrierEnhance: 's2',
    baseAttack: 649,
    baseHP: 5254,
    baseDefense: 694,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.75,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.025,
        flatTip: () => ({ caster_max_hp: 2.5 }),
        enhance: [0.1, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.1, 0.1, 0, 0.1, 0.1]
      }),
    }
  }),
  seaside_bellona: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    // form: [elements.exclusive_equipment_2],
    baseAttack: 1182,
    baseHP: 5299,
    baseDefense: 571,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        enhance: [0.05, 0.1, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  serene_purity_adin: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    // form: [elements.skill_tree_completed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.85,
        pow: () => 1.05,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? {skill_tree: 10} : null),
        enhance: [0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.6,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? {skill_tree: 10} : null),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.3,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  serila: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1218,
    baseHP: 4521,
    baseDefense: 683,
    dot: [DoT.burn],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2 : 1.5,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  sez: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    // form: [elements.target_hp_pc],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s1_bis: new Skill({
        id: 's1_bis',
        rate: () => 0.5,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.003,
        multTip: () => ({ target_lost_hp_pc: 0.3 }),
        enhance_from: 's1',
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 3.2 : 2.0,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData) => 1 + (100 - inputValues.targetCurrentHPPercent) * (soulburn ? 0.007 : 0.003),
        multTip: (soulburn: boolean) => ({ target_lost_hp_pc: soulburn ? 0.7 : 0.3 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      explosion: new Skill({ // TODO: change this to be aftermath on s3 with an input for enemy killed?
        id: 'explosion',
        rate: () => 0,
        pow: () => 0,
        afterMath: () => ({ attackPercent: 1.5, penetrate: () => 0.7 }),
        noCrit: true,
        noMiss: true,
      })
    }
  }),
  // sez_old: {
  //   name: 'Sez (Pre-Balance)',
  //   element: HeroElement.ice,
  //   class: HeroClass.thief,
  //   baseAttack: 1228,
  //   // form: [elements.target_hp_pc],
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
  //       aoe: true,
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
  //       afterMath: () => ({ attackPercent: 1.5, penetrate: () => 0.7 }),
  //       noCrit: true,
  //       noMiss: true,
  //     }
  //   }
  // },
  shadow_rose: new Hero({
    element: HeroElement.dark,
    class: HeroClass.knight,
    baseAttack: 889,
    baseHP: 5784,
    baseDefense: 610,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.05,
        pow: () => 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        aoe: true,
      }),
    }
  }),
  sharun: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 640,
    baseHP: 5340,
    baseDefense: 720,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }),
    }
  }),
  sigret: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1228,
    baseHP: 5784,
    baseDefense: 553,
    // form: [elements.target_nb_debuff, elements.exclusive_equipment_1],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment1 ? 0.2 : 0,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        canExtra: true,
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.25,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.7,
        pow: () => 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        penetrate: (inputValues: DamageFormData) => Math.min(0.3 + inputValues.targetNumberOfDebuffs * 0.1, 1.0),
        isSingle: () => true,
      }),
    }
  }),
  silk: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 1188,
    baseHP: 4693,
    baseDefense: 518,
    // form: [elements.caster_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.9,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s1_bis: new Skill({
        id: 's1_bis',
        s1Benefits: true,
        spdScaling: true,
        rate: () => 1.2,
        pow: () => 0.9,
        penetrate: () =>  0.2,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.95,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  silk_old: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 1188,
    baseHP: 4693,
    baseDefense: 518,
    // form: [elements.caster_speed, elements.caster_nb_focus],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.9,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s1_bis: new Skill({
        id: 's1_bis',
        s1Benefits: true,
        spdScaling: true,
        rate: () => 1.25,
        pow: () => 0.9,
        penetrate: () => 0.2,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.95,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  silver_blade_aramintha: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 1197,
    baseHP: 4572,
    baseDefense: 683,
    dot: [DoT.burn],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
            rate: () => 0.5,
        pow: () => 1.3,
        enhance_from: 's1',
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }),
    }
  }),
  sinful_angelica: new Hero({
    element: HeroElement.dark,
    class: HeroClass.soul_weaver,
    baseAttack: 649,
    baseHP: 4572,
    baseDefense: 631,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  sol: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 1177,
    baseHP: 5542,
    baseDefense: 553,
    // form: [elements.target_has_buff, elements.target_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.targetHasBuff ? 1 : 1.2,
        multTip: () => ({ target_has_no_buff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.targetMaxHP * 0.04,
        flatTip: () => ({ target_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.6,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.targetMaxHP * 0.05,
        flatTip: () => ({ target_max_hp: 5 }),
        afterMath: () => ({ attackPercent: 0.4, penetrate: () => 0.7 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  solitaria_of_the_snow: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 5299,
    baseDefense: 673,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.25,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.7,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
            rate: () => 0.8,
        pow: () => 1.3,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  sonia: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.08,
    baseAttack: 540,
    baseHP: 4900,
    baseDefense: 729,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  specimen_sez: new Hero({
    element: HeroElement.light,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    // form: [elements.target_is_stunned],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.15 : 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 1,
        penetrate: (inputValues: DamageFormData) => inputValues.targetStunned ? 1.0 : 0.3,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  specter_tenebria: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 1197,
    baseHP: 4572,
    baseDefense: 683,
    // form: [elements.target_nb_debuff, elements.dead_people, elements.s3_on_cooldown],
    attackIncrease: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      let buff = 0.07;
      for (let i = 0; i < molagoras['S2']; i++) {
        buff += Heroes.specter_tenebria.skills.s2.enhance[i];
      }
      return 1 + Math.min(inputValues.numberOfDeaths, 5) * buff;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.15],
        single: (inputValues: DamageFormData) => !inputValues.S3OnCooldown,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.005, 0.01, 0.015],
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => 1 + inputValues.targetNumberOfDebuffs * 0.2,
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  spirit_eye_celine: new Hero({
    element: HeroElement.light,
    class: HeroClass.thief,
    baseAttack: 1158,
    baseHP: 5016,
    baseDefense: 532,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s1_bis: new Skill({
        id: 's1_bis',
            rate: () => 1.3,
        pow: () => 0.9,
        penetrate: () => 0.35,
        enhance_from: 's1',
        isSingle: () => true,
      }),
    }
  }),
  straze: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1228,
    baseHP: 5784,
    baseDefense: 553,
    // form: [elements.nb_targets, elements.target_is_highest_max_hp, elements.target_attack],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.9,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => {
          switch (inputValues.numberOfTargets) {
          case 1: return 1.6;
          case 2: return 1.4;
          case 3: return 1.2;
          default: return 1;
          }
        },
        multTip: () => ({per_fewer_target: 20}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.95,
        pow: () => 1,
        penetrate: (inputValues: DamageFormData, heroAttack: number) => {
          if (!inputValues.targetIsHighestMaxHP) return 0;

          const targetAtk = inputValues.targetAttack;

          const penDiff = (heroAttack - targetAtk) * 0.00035;

          return Math.min(Math.max(0, penDiff) + 0.3, 1);
        },
        penetrateTip: () => ({caster_target_atk_diff: 0.035}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }),
    }
  }),
  summer_break_charlotte: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 957,
    baseHP: 6148,
    baseDefense: 634,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 1,
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  // summer_break_charlotte_old: {
  //   name: 'Summer Break Charlotte (Pre-Balance)',
  //   element: HeroElement.ice,
  //   class: HeroClass.knight,
  //   baseAttack: 957,
  //   baseHP: 6148,
  //   baseDefense: 634,
  //   // form: [elements.target_hp_pc],
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
  //       mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.0035,
  //       multTip: () => ({target_lost_hp_pc: 35}),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       isSingle: () => true,
  //     },
  //   }
  // },
  summer_disciple_alexa: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    // form: [elements.skill_tree_completed, elements.target_nb_debuff, elements.target_max_hp],
    attackIncrease: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? 1.03 : 1,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
            rate: () => 0.75,
        pow: () => 1,
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.skillTreeCompleted ? 0.1 : 0),
        multTip: () => ({skill_tree: 10}),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + inputValues.targetNumberOfDebuffs * 0.15,
        multTip: () => ({per_target_debuff: 15}),
        flat2: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? (inputValues.targetMaxHP * 0.05) : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  summertime_iseria: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    baseAttack: 1203,
    baseHP: 5704,
    baseDefense: 585,
    // form: [elements.target_bomb_detonate],
    dot: [DoT.bomb],
    innateAttackIncrease: (molagoras: Record<string, number>) => {
      let boost = 0.35;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes.summertime_iseria.skills.s2.enhance[i];
      }

      return boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
        noCrit: true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.02, 0.02, 0.03, 0.03, 0.05],
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 1,
        detonate: DoT.bomb,
        detonation: () => 1.1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
        noCrit: true,
      }),
    }
  }),
  surin: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1010,
    baseHP: 5097,
    baseDefense: 497,
    // form: [elements.target_nb_bleed],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.4,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 0.8,
        mult: (inputValues: DamageFormData) => inputValues.targetNumberOfBleeds > 0 ? 1.25 + (Math.min(inputValues.targetNumberOfBleeds, 5) - 1) * 0.25 : 1,
        multTip: () => ({ per_bleed: 25 }),
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  suthan: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    // form: [elements.attack_skill_stack_10],
    attackIncrease: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
      let boost = 0.025;
      for (let i = 0; i < molagoras['S2']; i++) {
        boost += Heroes.suthan.skills.s2.enhance[i];
      }
      return 1 + (boost * inputValues.casterAttackStack);
    },
    dot: [DoT.burn],
    baseAttack: 1144,
    baseHP: 4263,
    baseDefense: 652,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.005, 0.005, 0.005, 0.005, 0.005],
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  sven: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1039,
    baseHP: 5517,
    baseDefense: 452,
    // form: [elements.caster_hp_pc, elements.target_hp_pc],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
            rate: () => 0.7,
        pow: () => 1,
        enhance_from: 's1',
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.003,
        multTip: () => ({ caster_speed: 0.3 }),
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1 : 0.8,
        pow: () => 0.8,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.005 + (100 - inputValues.targetCurrentHPPercent) * 0.0015,
        multTip: () => ({caster_lost_hp_pc: 50, target_lost_hp_pc: 15}),
        enhance: [0.05, 0.05, 0.1, 0, 0.1, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  sylvan_sage_vivian: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 1359,
    baseHP: 4895,
    baseDefense: 652,
    // form: [elements.attack_skill_stack_3],
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.casterAttackStack * 0.15,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      // Separate skill because it goes AOE
      s1_soulburn: new Skill({
        id: 's1_soulburn',
        rate: () => 1,
        pow: () => 1,
        enhance_from: 's1',
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
    }
  }),
  taeyou: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1039,
    baseHP: 5340,
    baseDefense: 617,
    // form: [elements.caster_speed, elements.caster_enrage],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.65 : 0.98,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
        spdScaling: true,
            rate: () => 1.2,
        pow: () => 1.3,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        isExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        aoe: true,
      }),
    }
  }),
  talaz: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    // form: [elements.target_has_provoke],
    baseAttack: 1144,
    baseHP: 4895,
    baseDefense: 543,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.8 : 1.5,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + (inputValues.targetProvoked ? 0.5 : 0),
        multTip: () => ({ target_has_provoke: 50 }), // TODO: translate target_has_provoke
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  talia: new Hero({
    element: HeroElement.light,
    class: HeroClass.thief,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.7,
    baseAttack: 903,
    baseHP: 4895,
    baseDefense: 501,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1,],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0, 0.05, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  tamarinne: new Hero({
    element: HeroElement.fire,
    class: HeroClass.soul_weaver,
    baseAttack: 948,
    baseHP: 4370,
    baseDefense: 652,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.75,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.15]
      })
    }
  }),
  taranor_guard: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 951,
    baseHP: 5517,
    baseDefense: 583,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  taranor_royal_guard: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 842,
    baseHP: 6463,
    baseDefense: 617,
    // form: [elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.025,
        flatTip: () => ({ caster_max_hp: 2.5 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.3 : 1.5,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  tempest_surin: new Hero({
    element: HeroElement.light,
    class: HeroClass.thief,
    baseAttack: 1010,
    baseHP: 5097,
    baseDefense: 497,
    // form: [elements.caster_hp_pc],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.0015,
        multTip: () => ({ caster_lost_hp_pc: 15 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.25 : 1,
        pow: () => 1.05,
        mult: (inputValues: DamageFormData) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.002,
        multTip: () => ({ caster_lost_hp_pc: 20 }),
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  tenebria: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1359,
    baseHP: 4895,
    baseDefense: 652,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.05 : 0.8,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  tenebria_old: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1359,
    baseHP: 4895,
    baseDefense: 652,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.35 : 1.1,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      })
    }
  }),
  tieria: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 839,
    baseHP: 5517,
    baseDefense: 591,
    // form: [elements.target_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0.1, 0, 0.15, 0],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.8 : 1.2,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.targetMaxHP * (soulburn ? 0.06 : 0.04),
        flatTip: (soulburn: boolean) => ({ target_max_hp: soulburn ? 6 : 4 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  top_model_luluca: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 1228,
    baseHP: 4370,
    baseDefense: 662,
    // form: [elements.caster_speed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        noTrans: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        rate: () => 1.6,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.0015,
        multTip: () => ({ caster_speed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  troublemaker_crozet: new Hero({
    element: HeroElement.dark,
    class: HeroClass.knight,
    baseAttack: 776,
    baseHP: 6021,
    baseDefense: 718,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0, 0.05, 0, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  twisted_eidolon_kayron: new Hero({ //TODO: translate when available
    element: HeroElement.light,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
    // form: [elements.target_hp_pc, elements.caster_enrage, elements.caster_max_hp],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: (soulburn: boolean) => soulburn ? 1.7 : 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        mult: (inputValues: DamageFormData) => 1 + (1 - (inputValues.targetCurrentHPPercent / 100)) * 0.3,
        multTip: () => ({ target_lost_hp_pc: 30 }),
        isSingle: () => true,
        soulburn: true
      }),
      s1_bis: new Skill({
        id: 's1_bis',
            rate: () => 0.85,
        pow: () => 1,
        enhance_from: 's1',
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        fixed: (hitType: HitType, inputValues: DamageFormData) => (hitType !== HitType.miss) ? ((inputValues.casterEnraged) ? 10000 : 2000) : 0,
        fixedTip: () => ({ caster_rage_flat: 10000 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }),
    }
  }),
  tywin: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 821,
    baseHP: 6751,
    baseDefense: 648,
    // form: [elements.caster_max_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      })
    }
  }),
  // tywin_old: {
  //   name: 'Tywin (Pre-Balance)',
  //   element: HeroElement.ice,
  //   class: HeroClass.knight,
  //   baseAttack: 821,
  //   // form: [elements.caster_max_hp],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.8,
  //       pow: () => 0.95,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.04,
  //       flatTip: () => ({ caster_max_hp: 4 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
  //       isSingle: () => true,
  //     },
  //     s3: new Skill({
  //       rate: () => 0.5,
  //       pow: () => 0.95,
  //       flat: (inputValues: DamageFormData) => inputValues.casterMaxHP*0.1,
  //       flatTip: () => ({ caster_max_hp: 10 }),
  //       enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  unbound_knight_arowell: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 758,
    baseHP: 5826,
    baseDefense: 672,
    // form: [elements.caster_max_hp, elements.skill_tree_completed],
    barrierSkills: ['Passive', 'S3'],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
    barrier2: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.05,
        flatTip: () => ({caster_max_hp: 5}),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        // rate: () => 0.75, // This looks like it was just updated on the sheet as well
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.15,
        flatTip: () => ({caster_max_hp: 15}),
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: () => ({ skill_tree: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      })
    }
  }),
  urban_shadow_choux: new Hero({
    name: 'Urban Shadow Choux', // TODO: translate when available
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 984,
    baseHP: 6266,
    baseDefense: 637,
    // form: [elements.caster_max_hp, elements.caster_has_bzzt, elements.target_injuries],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => (soulburn ? 0.8 : 0.5),
        pow: () => 1,
        fixed: (inputValues: DamageFormData) => inputValues.casterHasBzzt ? 2000 : 0,
        fixedTip: () => ({ caster_has_bzzt: 2000 }),
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterMaxHP * (soulburn ? 0.16 : 0.1),
        flatTip: (soulburn: boolean) => ({ caster_max_hp: soulburn ? 16 : 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        fixed: (inputValues: DamageFormData) => inputValues.casterHasBzzt ? 2000 : 0,
        fixedTip: () => ({ caster_has_bzzt: 2000 }),
        afterMath: () => ({ injuryPercent: 0.6, penetrate: () => 0.7 }),
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.25,
        flatTip: () => ({ caster_max_hp: 25 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  verdant_adin: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    // form: [elements.nb_targets, elements.skill_tree_completed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { skill_tree: 10 } : null),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => {
          switch (inputValues.numberOfTargets) {
          case 3: return 1.2;
          case 2: return 1.4;
          case 1: return 1.6;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 20 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1.05,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { skill_tree: 10 } : null),
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  veronica: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    baseAttack: 1188,
    baseHP: 4693,
    baseDefense: 518,
    // form: [elements.target_bomb_detonate],
    dot: [DoT.bomb],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.7,
        pow: () => 1,
        detonate: [DoT.bomb],
        detonation: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.8,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),  
  vigilante_leader_glenn: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 920,
    baseHP: 4855,
    baseDefense: 525,
    // form: [elements.skill_tree_completed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? (1.1 + (inputValues.elementalAdvantage ? 0.25 : 0)) : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? ({
          skill_tree: 10,
          ...(inputValues.elementalAdvantage ? { elemental_advantage: 25 } : {}),
        }) : null),
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.5,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted && inputValues.elementalAdvantage ? 1.25 : 1,
        multTip: () => ({ elemental_advantage: 25 }),
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  vildred: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 1283,
    baseHP: 5138,
    baseDefense: 522,
    // form: [elements.caster_speed, elements.exclusive_equipment_2],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        rate: () => 0.9,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        spdScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.1 : 0.85,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  // vildred_old: {
  //   name: 'Vildred (Pre-Balance)',
  //   element: HeroElement.earth,
  //   class: HeroClass.thief,
  //   baseAttack: 1283,
  //   // form: [elements.caster_speed, elements.exclusive_equipment_2],
  //   skills: {
  //     s1: new Skill({
  //       rate: () => 0.85,
  //       pow: () => 0.95,
  //       mult: (inputValues: DamageFormData) => 1 + inputValues.casterSpeed*0.00075,
  //       multTip: () => ({ caster_speed: 0.075 }),
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
  //     },
  //     s2: new Skill({
  //       rate: () => 0.5,
  //       pow: () => 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       aoe: true,
  //     },
  //     s3: new Skill({
  //       soulburn: true,
  //       rate: (soulburn: boolean) => soulburn ? 1.1 : 0.85,
  //       pow: () => 1,
  //       mult: (soulburn: boolean) => 1 + inputValues.casterSpeed*(soulburn ? 0.0009 : 0.00075),
  //       multTip: (soulburn: boolean) => ({ caster_speed: soulburn ? 0.09 : 0.075 }),
  //       exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     }
  //   }
  // },
  violet: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    // form: [elements.caster_nb_focus, elements.caster_perception],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.9,
        mult: (inputValues: DamageFormData) => 1 + inputValues.casterFocus * 0.15,
        multTip: () => ({ per_focus: 15 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  vivian: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    baseAttack: 1228,
    baseHP: 4378,
    baseDefense: 662,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.3 : 1.05,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      }),
      s2_wave_2: new Skill({
        id: 's2_wave_2',
        rate: () => 0.55,
        pow: () => 0.9,
        enhance_from: 's2',
        aoe: true,
      }),
      s2_wave_3: new Skill({
        id: 's2_wave_3',
        rate: () => 0.3,
        pow: () => 0.9,
        enhance_from: 's2',
        aoe: true,
      })
    }
  }),
  wanda: new Hero({
    element: HeroElement.dark,
    class: HeroClass.ranger,
    baseAttack: 1005,
    baseHP: 4693,
    baseDefense: 532,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.9,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => inputValues.targetTargeted ? 1.35 : 1,
        multTip: () => ({ target_debuff: 35 }),
        enhance: [0.05, 0, 0, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0, 0.15, 0.15],
        isSingle: () => true,
      })
    }
  }),
  wanderer_silk: new Hero({
    element: HeroElement.light,
    class: HeroClass.ranger,
    baseAttack: 930,
    baseHP: 5380,
    baseDefense: 564,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.3,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: 2,
        pow: () => 0.8,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  watcher_schuri: new Hero({
    element: HeroElement.light,
    class: HeroClass.ranger,
    baseAttack: 970,
    baseHP: 5935,
    baseDefense: 557,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.8,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        penetrate: () => 1.0,
        isSingle: () => true,
      })
    }
  }),
  yoonryoung: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 703,
    baseHP: 5914,
    baseDefense: 596,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.8,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s1_bis: new Skill({
        id: 's1_bis',
            rate: () => 0.5,
        pow: () => 1,
        enhance_from: 's1',
        isSingle: () => true,
      })
    }
  }),
  yufine: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1228,
    baseHP: 5784,
    baseDefense: 553,
    // form: [elements.exclusive_equipment_2, elements.target_silenced],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.3 : 0,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.9,
        pow: () => 1,
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: 2,
        pow: () => 0.95,
        penetrate: (inputValues: DamageFormData) => inputValues.targetSilenced ? 0.7 : 0,
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  // yufine_old: {
  //   name: 'Yufine (Pre-Balance)',
  //   element: HeroElement.earth,
  //   class: HeroClass.warrior,
  //   baseAttack: 1228,
  //   // form: [elements.target_has_buff, elements.exclusive_equipment_2],
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
  //       aoe: true,
  //     },
  //     s3: new Skill({
  //       rate: 2,
  //       pow: () => 0.95,
  //       mult: (inputValues: DamageFormData) => inputValues.targetHasBuff ? 1.5 : 1.0,
  //       multTip: () => ({target_has_buff: 50}),
  //       enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
  //       isSingle: () => true,
  //     }
  //   }
  // },
  yulha: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 894,
    baseHP: 6840,
    baseDefense: 694,
    // form: [elements.caster_max_hp, elements.caster_hp],
    barrier: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.35,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({caster_max_hp: 10}),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => 0.31 * Math.max(inputValues.casterMaxHP - inputValues.casterCurrentHP, 0),
        flatTip: () => ({caster_lost_hp: 31}),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noCrit: true,
        noTrans: true,
        isSingle: () => true,
      })
    }
  }),
  yuna: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    baseAttack: 1158,
    baseHP: 6002,
    baseDefense: 553,
    // form: [elements.caster_speed, elements.nb_targets, elements.exclusive_equipment_3],
    skills: {
      s1: new Skill({
        id: 's1',
        spdScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 0.85 : 0.6,
        pow: () => 0.8,
        mult: (inputValues: DamageFormData) => {
          let mult = 1 + inputValues.casterSpeed * 0.00075;
          switch (inputValues.numberOfTargets) {
          case 3: mult += 0.2; break;
          case 2: mult += 0.4; break;
          case 1: mult += 0.6; break;
          }
          return mult;
        },
        multTip: () => ({ caster_speed: 0.075, per_fewer_target: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        aoe: true,
      }),
      s3: new Skill({
        id: 's3',
        onlyCrit: true,
        rate: () => 1.5,
        pow: () => 0.8,
        mult: (inputValues: DamageFormData) => {
          switch (inputValues.numberOfTargets) {
          case 3: return 1.2;
          case 2: return 1.4;
          case 1: return 1.6;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 20 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.3 : 0,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  zahhak: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1177,
    baseHP: 5542,
    baseDefense: 553,
    // form: [elements.target_has_buff],
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.8 : 1.1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.targetHasBuff ? 1.3 : 1,
        multTip: () => ({ target_has_buff: 30 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  zealot_carmainerose: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1168,
    baseHP: 3877,
    baseDefense: 666,
    // form: [elements.skill_tree_completed, elements.target_has_buff],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted && !inputValues.targetHasBuff ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { target_has_no_buff: 10 } : null),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 1.05,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted && !inputValues.targetHasBuff ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { target_has_no_buff: 10 } : null),
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => inputValues.skillTreeCompleted && !inputValues.targetHasBuff ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { target_has_no_buff: 10 } : null),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  zeno: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 5299,
    baseDefense: 673,
    // form: [elements.caster_max_hp, elements.non_attack_skill_stack_8],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.005, 0.005, 0.005, 0.005, 0.01],
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        ate: 0.5,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.casterMaxHP * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        mult: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
          let extra = 0;
          for (let i = 0; i < molagoras['S2']; i++) {
            extra += Heroes.zeno.skills.s2.enhance[i];
          }

          return 1 + inputValues.nonCasterAttackStack * (0.07 + extra);
        },
        multTip: (molagoras: Record<string, number>) => {
          let extra = 0;
          for (let i = 0; i < molagoras['S2']; i++) {
            extra += Heroes.zeno.skills.s2.enhance[i] * 100;
          }

          return { per_stack: 7 + extra };
        },
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      })
    }
  }),
  zerato: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1159,
    baseHP: 4733,
    baseDefense: 627,
    // form: [elements.target_has_debuff],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.05,
        pow: () => 1,
        enhance: [0.05, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2 : 1.5,
        pow: () => 0.95,
        mult: (inputValues: DamageFormData) => inputValues.targetHasDebuff ? 1.3 : 1,
        multTip: () => ({ target_has_debuff: 30 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      })
    }
  }),
  zio: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    // form: [elements.target_current_hp],
    baseAttack: 1255,
    baseHP: 5016,
    baseDefense: 652,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.7,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s1_bis: new Skill({
        id: 's1_bis',
        isExtra: true,
            rate: () => 1,
        pow: () => 1,
        penetrate: () => 0.5,
        enhance_from: 's1',
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.2,
        pow: () => 1,
        flat: (inputValues: DamageFormData) => inputValues.targetCurrentHP * 0.1875,
        flatTip: () => ({ target_current_hp: 18.75 }),
        penetrate: () => 1,
        noCrit: true,
        isSingle: () => true,
      }),
    }
  }),
};
