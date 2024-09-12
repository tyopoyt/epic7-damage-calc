/*
 * Notes:
 * aftermath damage is extra damage that procs after skill (hwayoung)
 * fixed damage is used for flat extra damage (rimuru)
 * flat damage is used for damage scaling with stats other than attack (alencia)
 */
// Fix skill labels for unique names like Beehoo's Incinerate
import { Artifact } from "src/app/models/artifact";
import { DamageFormData } from "src/app/models/forms";
import { Hero, HeroClass, HeroElement } from "src/app/models/hero";
import { AftermathSkill, DoT, HitType, Skill } from "src/app/models/skill";
import { BattleConstants } from "./constants";

export const Heroes: Record<string, Hero> = {
  // If a new first hero without an s3 is released, update the logic for the loading variable in damage-calculator.component.ts
  abigail: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 984,
    baseHP: 6266,
    baseDefense: 637,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({casterMaxHP: 12}),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.2,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.2,
        flatTip: () => ({casterMaxHP: 20}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  abyssal_yufine: new Hero({
    name: 'Abyssal Yufine',
    element: HeroElement.dark,
    class: HeroClass.knight,
    baseAtk: 830,
    baseHP: 6619,
    baseDef: 713,
    heroSpecific: ['casterDefense', 'casterHasTrauma'],
    attackIncrease: (inputValues: DamageFormData) => {
      let boost = 1;

      if (inputValues.casterHasTrauma) {
        boost += 1

        const defenseBeforeTrauma = Number(inputValues.casterDefense)
                                      * (1 + (inputValues.casterDefenseUp ? BattleConstants.targetDefenseUp : 0)
                                      + (inputValues.casterVigor ? BattleConstants.casterVigor - 1 : 0)
                                      + (inputValues.casterFury ? BattleConstants['caster-fury'] - 1 : 0)
                                      + (inputValues.casterDefenseDown ? BattleConstants.targetDefenseDown : 0));
        if (defenseBeforeTrauma >= 2000) {
          boost += 1;
        }
      }

      return boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: (soulburn: boolean) => soulburn ? 0.9 : 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
          return inputValues.casterFinalDefense() * (soulburn ? 1.1 : 0.9)
        },
        flatTip: (soulburn: boolean) => ({caster_defense: soulburn ? 110 : 90}),
        enhance: [0.05, 0, 0.05, 0.05, 0, 0.15],
        isAOE: () => true,
        soulburn: true
      }),
      s1_bis: new Skill({
        name: 'abyssal_yufine_unbridled_outburst',
        id: 's1_bis',
        rate: () => 0.8,
        pow: () => 0.9,
        penetrate: () => 0.7,
        enhanceFrom: 's1',
        isSingle: () => true,
      }),
      s1_bis_soulburn: new Skill({
        name: 'abyssal_yufine_unbridled_outburst_soulburn',
        id: 's1_bis_soulburn',
        rate: () => 1.25,
        pow: () => 0.9,
        penetrate: () => 0.7,
        enhanceFrom: 's1',
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isAOE: () => true,
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
    heroSpecific: ['numberOfTargets'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
          switch (inputValues.numberOfTargets) {
          case 3: return 1.2;
          case 2: return 1.4;
          case 1: return 1.6;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 20 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
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
        isAOE: () => true,
      })
    }
  }),
  adventurer_ras: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 758,
    baseHP: 5826,
    baseDefense: 672,
    heroSpecific: ['casterMaxHP', 'skillTreeCompleted'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.04,
        flatTip: () => ({ casterMaxHP: 4 }),
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.skillTreeCompleted ? 0.1 : 0),
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.04,
        flatTip: () => ({ casterMaxHP: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      }),
    }
  }),
  ae_giselle: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    heroSpecific: ['targetCurrentHPPercent'],
    baseAttack: 1286,
    baseHP: 4733,
    baseDefense: 652,
    skills: {
      s1: new Skill({
        id: 's1',
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.targetCurrentHPPercent * 0.002,
        multTip: () => ({ targetCurrentHP: 0.2 }),
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
        ignoreDamageTransfer: () => true,
      })
    }
  }),
  ae_karina: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 821,
    baseDefense: 648,
    baseHP: 6751,
    heroSpecific: ['casterDefense'],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) =>  inputValues.casterFinalDefense() * 1.0,
        flatTip: () => ({ casterDefense: 100 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.5,
        flatTip: () => ({ casterDefense: 50 }),
        afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? new AftermathSkill({ defensePercent: 1.4 }) : null,
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
    heroSpecific: ['skill3Stack'],
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
        fixed: (hitType: HitType, inputValues: DamageFormData) => (hitType === HitType.crit) ? 5000 * (inputValues.skill3Stack + 1)  : 0,
        fixedTip: () => ({fixed: 5000, fixed_per_stack: 5000 }),
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
        isAOE: () => true,
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
        isAOE: () => true,
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
        onlyCrit: () => true,
        rate: () => 1,
        pow: () => 1,
        enhanceFrom: 's1',
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
  ainz_ooal_gown: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.7,
    baseAttack: 1039,
    baseHP: 5299,
    baseDefense: 673,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.7,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      })
    }
  }),
  aither: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 705,
    baseHP: 4592,
    baseDefense: 672,
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
  albedo: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 894,
    baseHP: 6840,
    baseDefense: 694,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.75,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.09,
        flatTip: () => ({casterMaxHP: 9}),
        afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? new AftermathSkill({ hpPercent: 0.07 }) : null,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        name: 'albedo_lets_go_bicom',
        hpScaling: true,
        rate: () => 0.3,
        pow: () => 1.3,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.07,
        flatTip: () => ({casterMaxHP: 7}),
        isExtra: true,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1.05,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.25,
        flatTip: () => ({ casterMaxHP: 25 }),
        enhance: [0, 0.1, 0, 0, 0.15],
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
    heroSpecific: ['exclusiveEquipment2', 'casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.08,
        flatTip: () => ({casterMaxHP: 8}),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        name: 'alencia_trample',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.11,
        flatTip: () => ({casterMaxHP: 11}),
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.15,
        flatTip: () => ({ casterMaxHP: 15 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        isAOE: () => true,
      })
    }
  }),
  alexa: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    heroSpecific: ['targetNumberOfDebuffs'],
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
        name: 's1_extra_attack',
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.targetNumberOfDebuffs * 0.15,
        multTip: () => ({ per_target_debuff: 15 }),
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetTargeted ? 1.35 : 1,
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
    heroSpecific: ['casterMaxHP'/*, 'casterEnraged'*/],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
        enhance: [0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.05, 0.15],
        isAOE: () => true,
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
  amiki: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1019,
    baseHP: 5738,
    baseDefense: 571,
    heroSpecific: ['casterBelow30PercentHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.6,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        noCrit: true,
        isSingle: () => true,
        penetrate: () => 0.3,
        canExtra: true
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.5 : 1.1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1],
        noCrit: true,
        isSingle: () => true,
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterBelow30PercentHP ? 0.7 : 0.3
      })
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
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.15,
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
    heroSpecific: ['casterMaxHP', 'numberOfDeaths'],
    heroSpecificMaximums: {'numberOfDeaths': 3},
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2 : 1,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * (soulburn ? 0.2 : 0.12),
        flatTip: (soulburn: boolean) => ({ casterMaxHP: soulburn ? 20 : 12 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.3,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.2,
        flatTip: () => ({ casterMaxHP: 20 }),
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + Math.min(inputValues.numberOfDeaths, 3) * 0.25,
        multTip: () => ({ numberOfDeaths: 25 }),
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
    heroSpecific: ['targetBurnDetonate'],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  arbiter_vildred: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1283,
    baseHP: 5138,
    baseDefense: 522,
    heroSpecific: ['casterFullFocus', 'casterHasArchdemonsMight'],
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
        isAOE: () => true,
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
        isAOE: () => true,
        isExtra: true
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isAOE: () => true,
      })
    }
  }),
  architect_laika: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 1306,
    baseHP: 4248,
    baseDefense: 652,
    heroSpecific: ['casterSpeed'],
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
        speedScaling: true,
        rate: () => 0.95,
        pow: () => 0.9,
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.targetTargeted ? 0.8 : 0,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001125,
        multTip: () => ({ casterSpeed: 0.1125 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.15],
        ignoreDamageTransfer: () => true,
        isAOE: () => true,
      })
    }
  }),
  aria: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseDefense: 673,
    baseHP: 5299,
    heroSpecific: ['casterDefense'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalDefense() * 1.0,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.85,
        flatTip: () => ({ casterDefense: 85 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
      }),
      s2: new Skill({
        id: 's2',
        defenseScaling: true,
        rate: () => 0.7,
        pow: () => 1.3,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 1.4,
        flatTip: () => ({ casterDefense: 140 }),
        isAOE: () => true,
      })
    }
  }),
  armin: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 721,
    baseDefense: 785,
    baseHP: 6189,
    heroSpecific: ['casterDefense'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalDefense() * 0.7,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.8,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.6,
        flatTip: () => ({ casterDefense: 60 }),
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
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.05,
        flatTip: () => ({casterMaxHP: 5}),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.75,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.15,
        flatTip: () => ({casterMaxHP: 15}),
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
    heroSpecific: ['exclusiveEquipment2', 'targetHasBarrier'],
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
        name: 'arunka_expose',
        rate: () => 1.3,
        pow: () => 1.3,
        // enhanceFrom: 's1', Presumed not to inherit from s1 mola since the pow is so high already
        isSingle: () => true,
        isExtra: true,
        noCrit: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        penetrate: () => 0.7,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasBarrier ? 3.4 : 1,
        multTip: () => ({ targetHasBarrier: 240 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        isSingle: () => true,
        noCrit: true,
      }),
    }
  }),

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
    heroSpecific: ['casterSpeed', 'targetSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2 : 1.5,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001 + inputValues.targetFinalSpeed() * 0.003,
        multTip: () => ({ casterSpeed: 0.1, targetSpeed: 0.3 }),
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
    heroSpecific: ['exclusiveEquipment1', 'casterSpeed', 'casterHasStealth'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterHasStealth ? 1.2 : 0.9,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment1 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 3 : 1.5,
        pow: () => 0.8,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001125,
        multTip: () => ({ casterSpeed: 0.1125 }),
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
    heroSpecific: ['targetHasDebuff', 'casterHasStarsBlessing'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasDebuff ? 1.2 : 1,
        multTip: () => ({ targetHasDebuff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  auxiliary_lots: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 1021,
    baseHP: 5474,
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
        isAOE: () => true,
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
        isAOE: () => true,
      }),
    }
  }),
  baal_and_sezan: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1197,
    baseHP: 4572,
    baseDefense: 683,
    heroSpecific: ['targetNumberOfDebuffs'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.targetNumberOfDebuffs * 0.15),
        multTip: () => ({ per_target_debuff: 15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.8,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        isAOE: () => true,
      })
    }
  }),
  bad_cat_armin: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 912,
    baseHP: 5871,
    baseDefense: 614,
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.15,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.06,
        flatTip: () => ({ casterMaxHP: 6 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.3,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.16,
        flatTip: () => ({ casterMaxHP: 16 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  baiken: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    heroSpecific: ['targetBleedDetonate'],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 0.9,
        enhance: [0.05, 0.1, 0, 0.1, 0.15],
        isAOE: () => true,
      }),
    }
  }),
  bask: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 842,
    baseHP: 6463,
    baseDefense: 617,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.07,
        flatTip: () => ({ casterMaxHP: 7 }),
        enhance: [0.05, 0, 0.1, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
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
        enhanceFrom: 's1',
        isExtra: true,
        isAOE: () => true,
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
    heroSpecific: ['targetBurnDetonate', 'exclusiveEquipment3'],
    baseAttack: 1203,
    baseHP: 5704,
    baseDefense: 702,
    innateAttackIncrease: (inputValues: DamageFormData) => {
      let boost = 0.20;
      for (let i = 0; i < inputValues.molagoras2; i++) {
        boost += Heroes.beehoo.skills.s2.enhance[i];
      }
      return boost + (inputValues.exclusiveEquipment3 ? 0.05 : 0);
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
        name: 'beehoo_incinerate',
        rate: () => 1.2,
        pow: () => 0.9,
        enhanceFrom: 's1',
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
    heroSpecific: ['casterMaxHP'],
    baseAttack: 821,
    baseHP: 6751,
    baseDefense: 648,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1.05,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.09,
        flatTip: () => ({ casterMaxHP: 9 }),
        enhance: [0.05, 0, 0.05, 0, 0.05, 0, 0.1],
        isAOE: () => true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
        name: 'belianIncursion',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1.3,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.045,
        flatTip: () => ({ casterMaxHP: 4.5 }),
        isAOE: () => true,
        isExtra: true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1.3,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
        isAOE: () => true,
      })
    }
  }),
  bellona: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAttack: 1003,
    baseHP: 5704,
    baseDefense: 585,
    heroSpecific: ['targetMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * 0.04,
        flatTip: () => ({ targetMaxHP: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.2,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: (soulburn: boolean, inputValues: DamageFormData, isExtra: boolean) => isExtra ? 1.25 : 1.05,
        pow: () => 1,
        enhance: [0.15, 0, 0, 0, 0.15],
        isAOE: () => true,
        canExtra: true,
        extraModifier: true
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        isAOE: () => true,
      })
    }
  }),
  benimaru: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    heroSpecific: ['casterHasMultilayerBarrier'],
    baseAttack: 1177,
    baseHP: 5542,
    baseDefense: 553,
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.7 : 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.casterHasMultilayerBarrier ? 0.3 : 0),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.2,
        pow: () => 1,
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterHasMultilayerBarrier ? 0.6 : 0.3,
        isExtra: true,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 2,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  bernard: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 594,
    baseHP: 4329,
    baseDefense: 603,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.2,
    barrierEnhance: 's2',
    barrier2: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.15,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1]
      })
    }
  }),
  birgitta: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 785,
    baseHP: 5077,
    baseDefense: 634,
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
        isAOE: () => true,
      })
    }
  }),
  blood_blade_karin: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1138,
    baseHP: 5871,
    baseDefense: 462,
    heroSpecific: ['casterCurrentHPPercent', 'exclusiveEquipment3'],
    attackIncrease: (inputValues: DamageFormData) => {
      let boost = 0.0051;
      for (let i = 0; i < inputValues.molagoras2; i++) {
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
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isAOE: () => true,
      }),
    }
  }),
  blood_moon_haste: new Hero({
    element: HeroElement.dark,
    class: HeroClass.soul_weaver,
    baseAttack: 621,
    baseHP: 5474,
    baseDefense: 802,
    heroSpecific: ['casterMaxHP', 'casterHasBloodAura'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.3,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.3,
        pow: () => 1,
        penetrate: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.03,
        flatTip: () => ({ casterMaxHP: 3 }),
        enhance: [0.05, 0.1, 0.15],
        isSingle: () => true,
        noCrit: true
      }),
      s1_extra: new Skill({
        id: 's1_extra',
        name: 'blood_moon_haste_bloody_retribution',
        rate: () => 0.3,
        pow: () => 1,
        penetrate: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
        isSingle: () => true,
        noCrit: true
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1]
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        noCrit: true,
        rate: () => 0.3,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.14,
        flatTip: () => ({ casterMaxHP: 14 }),
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterHasBloodAura ? 2 : 1,
        multTip: () => ({ caster_has_blood_aura: 50 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true
      }),
    }
  }),

  blooming_lidica: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    heroSpecific: ['casterSpeed', 'casterMaxHP', 'enemyNumberOfDebuffs', 'targetSpeed'],
    baseAttack: 1057,
    baseHP: 5542,
    baseDefense: 532,
    speedIncrease: (inputValues: DamageFormData) => 1 + Math.min(inputValues.enemyNumberOfDebuffs, 10) * 0.07,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        // name: 'belianIncursion',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.07,
        flatTip: () => ({ casterMaxHP: 7 }),
        isExtra: true,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.3,
        flatTip: () => ({ casterMaxHP: 30 }),
        penetrate: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact, casterAttack: number, casterSpeed: number) => {
          const targetSpeed = inputValues.targetFinalSpeed();

          const penDiff = (casterSpeed - targetSpeed) * 0.0059;

          return Math.min(Math.max(0, penDiff), 1);
        },
        penetrateTip: () => ({caster_target_spd_diff: 0.0059}),
        isSingle: () => true,
        noCrit: true,
      })
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
        afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? new AftermathSkill({ attackPercent: 0.3 }) : null,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.95,
        pow: () => 1.1,
        afterMath: (hitType: HitType) => (hitType !== HitType.miss) ? new AftermathSkill({ attackPercent: 0.3 }) : null,
        enhance: [0.05, 0, 0, 0, 0.15],
        isAOE: () => true,
      })
    }
  }),
  brieg: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 821,
    baseHP: 6751,
    baseDefense: 648,
    barrierSkills: ['S2', 'S2 Soulburn'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      let boost = 1.0;
      for (let i = 0; i < inputValues.molagoras2; i++) {
        boost += Heroes['brieg'].skills.s2.enhance[i];
      }

      return inputValues.casterFinalMaxHP(artifact) * 0.185 * boost;
    },
    barrier2: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      let boost = 1.0;
      for (let i = 0; i < inputValues.molagoras2; i++) {
        boost += Heroes['brieg'].skills.s2.enhance[i];
      }

      return inputValues.casterFinalMaxHP(artifact) * 0.24 * boost;
    },
    heroSpecific: ['casterMaxHP', 'casterPerception'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.22,
        flatTip: () => ({ casterMaxHP: 22 }),
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
    heroSpecific: ['casterCurrentHPPercent'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.005,
        multTip: () => ({ caster_lost_hp_pc: 50 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  byblis: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    baseAttack: 993,
    baseHP: 6002,
    baseDefense: 611,
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
        pow: () => 1.3,
        isExtra: true,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        isAOE: () => true,
      }),
    }
  }),
  camilla: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 885,
    baseHP: 4733,
    baseDefense: 571,
    heroSpecific: ['targetCurrentHPPercent'],
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
        rate: () => 1.6,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.01,
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
        isAOE: () => true,
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
    heroSpecific: ['targetBurnDetonate'],
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
        isAOE: () => true,
      })
    }
  }),
  cartuja: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 903,
    baseHP: 6635,
    baseDefense: 630,
    heroSpecific: ['casterMaxHP', 'casterCurrentHPPercent'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.06,
        flatTip: () => ({ casterMaxHP: 6 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean, inputValues: DamageFormData) => (inputValues.casterCurrentHPPercent < 75 ? 1 : 0.6) + (soulburn ? 0.2 : 0),
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
          if (soulburn) {
            return inputValues.casterFinalMaxHP(artifact) * (inputValues.casterCurrentHPPercent < 75 ? 0.1 : 0.08);
          } else {
            return inputValues.casterFinalMaxHP(artifact) * (inputValues.casterCurrentHPPercent < 75 ? 0.0625 : 0.05);
          }
        },
        flatTip: (soulburn: boolean, inputValues: DamageFormData) => (inputValues.casterCurrentHPPercent < 75)
          ? { casterCurrentHPPercent_under_hp_threshold: soulburn ? 10 : 6.25 }
          : { casterCurrentHPPercent_over_hp_threshold: soulburn ? 8 : 5 },
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        isAOE: () => true,
      })
    }
  }),
  cecilia: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 821,
    baseHP: 6751,
    baseDefense: 648,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.07,
        flatTip: () => ({ casterMaxHP: 7 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.4,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.06,
        flatTip: () => ({ casterMaxHP: 6 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1.05,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
        enhance: [0.1, 0, 0, 0, 0.15],
        isAOE: () => true,
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
        isAOE: () => true,
      }),
    }
  }),
  celestial_mercedes: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 1187,
    baseHP: 4491,
    baseDefense: 627,
    heroSpecific: ['targetMaxHP'],
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * 0.04,
        flatTip: () => ({ targetMaxHP: 4 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        isAOE: () => true,
      })
    }
  }),
  celine: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    heroSpecific: ['exclusiveEquipment2', 'exclusiveEquipment3'],
    baseAttack: 1228,
    baseHP: 6267,
    baseDefense: 473,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.5,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.6,
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
        ignoreDamageTransfer: () => true,
        isSingle: () => true,
      })
    }
  }),
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
        isAOE: () => true,
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
    heroSpecific: ['criticalHitStack'],
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.5 : 1,
        pow: (soulburn: boolean) => soulburn ? 1 : 0.9,
        critDmgBoost: () => 0.2,
        mult: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
          let mult = 0;
          for (let i = 0; i < inputValues.molagoras2; i++) {
            mult += Heroes.challenger_dominiel.skills.s2.enhance[i];
          }

          return 1 + (inputValues.criticalHitStack * (0.054 + (0.054 * mult)));
        },
        multTip: (inputValues: DamageFormData) => {
          let mult = 0;
          for (let i = 0; i < inputValues.molagoras2; i++) {
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
        isAOE: () => true,
      })
    }
  }),
  chaos_inquisitor: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 963,
    baseHP: 5138,
    baseDefense: 606,
    heroSpecific: ['casterCurrentHPPercent', 'skillTreeCompleted'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.skillTreeCompleted ? 0.05 : 0),
        multTip: () => ({ skill_tree: 5 }),
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.5,
        pow: () => 0.85,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (1 - (inputValues.casterCurrentHPPercent / 100)) / 2 + (inputValues.skillTreeCompleted ? 0.12 : 0),
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
    heroSpecific: ['casterMaxHP', 'skillTreeCompleted'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.06,
        flatTip: () => ({ casterMaxHP: 6 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { skill_tree: 10 } : null),
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.08,
        flatTip: () => ({ casterMaxHP: 8 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.2,
        flatTip: () => ({ casterMaxHP: 20 }),
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.elementalAdvantage ? 0.4 : 0,
        enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  charles: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 957,
    baseHP: 6148,
    baseDefense: 634,
    heroSpecific: ['exclusiveEquipment2', 'casterNumberOfBuffs', 'numberOfTargets'],
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
        rate: (soulburn: boolean, inputValues: DamageFormData) => 1.5 + inputValues.casterNumberOfBuffs * 0.07,
        pow: () => 1,
        enhance: [0.1, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
          switch (inputValues.numberOfTargets) {
          case 3: return 1.267;
          case 2: return 1.534;
          case 1: return 1.801;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 26.7 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
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
        onlyCrit: () => true,
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        onlyCrit: () => true,
        rate: () => 1.4,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        isAOE: () => true,
      })
    }
  }),
  chloe: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1177,
    baseHP: 5542,
    baseDefense: 553,
    // TODO: add magic nail dot damage?
    heroSpecific: ['targetMagicNailed'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetMagicNailed ? 1.3 : 1,
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetMagicNailed ? 1.35 : 1,
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
    heroSpecific: ['casterMaxHP', 'casterFullFocus'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * (inputValues.casterFullFocus ? 0.15 : 0.11),
        flatTip: (inputValues: DamageFormData) => ({ casterMaxHP: (inputValues.casterFullFocus ? 15 : 11) }),
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.15,
        flatTip: () => ({ casterMaxHP: 15 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isAOE: () => true,
      })
    }
  }),
  christy: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 667,
    baseHP: 5784,
    baseDefense: 749,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1.1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.05,
        flatTip: () => ({ casterMaxHP: 5 }),
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
    heroSpecific: ['casterMaxHP'],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.85,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.04,
        flatTip: () => ({ casterMaxHP: 4 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.75,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.05,
        flatTip: () => ({ casterMaxHP: 5 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.2,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
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
    heroSpecific: ['exclusiveEquipment3', 'casterSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterSpeedUp ? 1.5 : 0.9,
        pow: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterSpeedUp ? 0.9 : 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.6,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.0021,
        multTip: () => ({ casterSpeed: 0.21 }),
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
    heroSpecific: ['exclusiveEquipment3'/*, 'casterEnraged'*/],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.1 : 0.85,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterEnraged ? 1.2 : 1,
        multTip: () => ({ caster_rage: 20 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  claudia: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 703,
    baseHP: 5914,
    baseDefense: 596,
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.2,
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
        pow: () => 1.3,
        isSingle: () => true,
      })
    }
  }),
  closer_charles: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    heroSpecific: ['targetCurrentHPPercent', 'casterPerception'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.004,
        multTip: () => ({ target_lost_hp_pc: 0.4 }),
        enhanceFrom: 's1',
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.25 : 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  coli: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1138,
    baseHP: 5871,
    baseDefense: 462,
    heroSpecific: ['targetBleedDetonate', 'targetBombDetonate'],
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
    heroSpecific: ['targetMaxHP', 'targetCurrentHPPercent', 'attackSkillStack'],
    heroSpecificMaximums: {'attackSkillStack': 5},
    attackIncrease: (inputValues: DamageFormData) => {
      let boost = 0.1;
      for (let i = 0; i < inputValues.molagoras2; i++) {
        boost += Heroes.commander_lorina.skills.s2.enhance[i];
      }

      return 1 + inputValues.attackSkillStack * boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * 0.02,
        flatTip: () => ({ targetMaxHP: 2 }),
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.005,
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
    heroSpecific: ['exclusiveEquipment3'],
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
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        isAOE: () => true,
      })
    }
  }),
  commander_pavel: new Hero({
    element: HeroElement.light,
    class: HeroClass.ranger,
    heroSpecific: ['targetAttack'],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.75,
        pow: () => 1,
        penetrate: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact, casterAttack: number) => {
          const targetAtk = inputValues.targetFinalAttack();

          const penDiff = (casterAttack - targetAtk) * 0.000117;

          return Math.min(Math.max(0, penDiff), 0.7);
        },
        penetrateTip: () => ({caster_target_atk_diff: 0.0117}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        ignoreDamageTransfer: () => true,
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
    heroSpecific: ['casterDefense'/*, 'casterEnraged'*/],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterEnraged ? 0.9 : 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => (inputValues.casterEnraged ? 1.2 : 0.9) * inputValues.casterFinalDefense(),
        flatTip: (inputValues: DamageFormData) => ({ casterDefense: inputValues.casterEnraged ? 120 : 90 }),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        defenseScaling: true,
        rate: () => 0.3,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.7,
        flatTip: () => ({ casterDefense: 70 }),
        enhance: [0.05, 0, 0, 0, 0, 0.1, 0.15],
        isAOE: () => true,
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
    heroSpecific: ['casterDefense'],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.6,
        flatTip: () => ({ casterDefense: 60 }),
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
    heroSpecific: ['casterMaxHP', 'casterDefense'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.15,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.6,
        pow: () => 1.05,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.7,
        flatTip: () => ({ casterDefense: 70 }),
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.6,
        flatTip: () => ({ casterDefense: 60 }),
        enhance: [0.1, 0, 0, 0, 0.1, 0, 0.15],
        isAOE: () => true,
      })
    }
  }),
  dark_corvus: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 966,
    baseHP: 7323,
    baseDefense: 657,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.07,
        flatTip: () => ({ casterMaxHP: 7 }),
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * (soulburn ? 0.375 : 0.25),
        flatTip: (soulburn: boolean) => ({ casterMaxHP: soulburn ? 37.5 : 25 }),
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
    heroSpecific: ['targetInjuries'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        afterMath: () => new AftermathSkill({ injuryPercent: 0.4 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
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
    heroSpecific: ['casterDefense'],
    baseAttack: 975,
    baseDefense: 652,
    baseHP: 7054,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.6,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 1.0,
        flatTip: () => ({ casterDefense: 100 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 0.6,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 1.15,
        flatTip: () => ({ casterDefense: 115 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        isAOE: () => true,
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
        isAOE: () => true,
      })
    }
  }),
  dizzy: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 5299,
    baseDefense: 673,
    heroSpecific: ['targetHasDebuff'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.7,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasDebuff ? 1.3 : 1.0,
        multTip: () => ({ target_debuff: 30 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        onlyMiss: true,
        rate: () => 2.5,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  doll_maker_pearlhorizon: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    baseAttack: 921,
    baseHP: 4855,
    baseDefense: 631,
    heroSpecific: ['targetMaxHP', 'targetAsleep'],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.9,
        fixed: (hitType: HitType, inputValues: DamageFormData) => (inputValues.targetAsleep) ? inputValues.targetFinalMaxHP() * 0.3 : 0,
        fixedTip: (fixedDamage: number, inputValues: DamageFormData) => ({ targetMaxHP: inputValues.targetAsleep ? 30 : 0 }),
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
        isAOE: () => true,
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
  dragon_bride_senya: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 894,
    baseHP: 6840,
    baseDefense: 694,
    heroSpecific: ['casterHasOathOfPunishment', 'casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.3,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.7,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.3,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * (soulburn ? 0.11 : 0.09),
        flatTip: (soulburn: boolean) => ({ casterMaxHP: (soulburn ? 11 : 9) }),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.15],
        penetrate: () => 1,
        noCrit: true,
        soulburn: true,
        isAOE: (inputValues: DamageFormData) => inputValues.casterHasOathOfPunishment,
      })
    }
  }),
  dragon_king_sharun: new Hero({
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
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isAOE: () => true,
      })
    }
  }),
  eaton: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 685,
    baseHP: 7043,
    baseDefense: 703,
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.25,
    barrierEnhance: 's3',
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.05,
        flatTip: () => ({ casterMaxHP: 5 }),
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
        isAOE: () => true
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.05,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        isAOE: () => true
      })
    }
  }),
  edward_elric: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 984,
    baseHP: 6266,
    baseDefense: 637,
    heroSpecific: ['casterMaxHP', 'attackSkillStack'],
    heroSpecificMaximums: {'attackSkillStack': 3},
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      const scale = [0, 0.1, 0, 0.15, 0];
      let boost = 1.0;
      for (let i = 0; i < inputValues.molagoras1; i++) {
        boost += scale[i];
      }

      return inputValues.casterFinalMaxHP(artifact) * 0.08 * boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({casterMaxHP: 10}),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.08,
        flatTip: () => ({casterMaxHP: 8}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        isAOE: () => true
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.25,
        flatTip: () => ({casterMaxHP: 25}),
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.attackSkillStack * 0.2,
        multTip: () => ({per_stack: 20}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        ignoreDamageTransfer: () => true,
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
        isAOE: () => true,
      })
    }
  }),
  eligos: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    heroSpecific: ['casterSpeed', 'casterPerception', 'targetSpeed'],
    baseAttack: 1283,
    baseHP: 4976,
    baseDefense: 536,
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.95,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        speedScaling: true,
        rate: () => 0.75,
        pow: () => 1.3,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
          const spdDiff = (inputValues.casterFinalSpeed() - inputValues.targetFinalSpeed()) * 0.025;
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
    heroSpecific: ['targetNumberOfDebuffs'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.targetNumberOfDebuffs * 0.2),
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
        isAOE: () => true,
      })
    }
  }),
  elvira: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    heroSpecific: ['targetCurrentHP'],
    baseAttack: 1057,
    baseHP: 5542,
    baseDefense: 532,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
        noCrit: true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
        name: 'elviraExterminate',
        rate: () => 1,
        pow: () => 1.3,
        isAOE: () => true,
        noCrit: true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.2,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData) => inputValues.targetCurrentHP * 0.16,
        flatTip: () => ({ targetCurrentHP: 16 }),
        penetrate: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        isSingle: () => true,
        noCrit: true,
      })
    }
  }),
  emilia: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 649,
    baseHP: 5254,
    baseDefense: 694,
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.15,
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
  empyrean_ilynav: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 794,
    baseHP: 7332,
    baseDefense: 767,
    heroSpecific: ['casterMaxHP', 'targetInjuries'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * (soulburn ? 0.17 : 0.1),
        flatTip: (soulburn: boolean) => ({ casterMaxHP: soulburn ? 17 : 10 }),
        afterMath: (hitType: HitType, damageForm: DamageFormData, soulburn: boolean) => new AftermathSkill({ injuryPercent: soulburn ? 0.5 : 0 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        soulburn: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.18,
        flatTip: () => ({ casterMaxHP: 18 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  enott: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1019,
    baseHP: 5738,
    baseDefense: 571,
    heroSpecific: ['targetCurrentHPPercent'],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.005,
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
    heroSpecific: ['casterMaxHP', 'targetMaxHP'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) < inputValues.targetFinalMaxHP() ? 1 + Math.min((inputValues.targetFinalMaxHP() - inputValues.casterFinalMaxHP(artifact)) * 0.0001, 0.7) : 1,
        multTip: () => ({caster_vs_target_hp_diff: 10}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  eternal_wanderer_ludwig: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    baseAttack: 1412,
    baseHP: 4248,
    baseDefense: 645,
    heroSpecific: ['soulburnStack'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2:  new Skill({
        id: 's2',
        rate: () => 1.6,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        isSingle: () => true,
      }),
      s3:  new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => 0.3 * (Math.min(inputValues.soulburnStack, 2)),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      })
    }
  }),
  ezra: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 921,
    baseHP: 4945,
    baseDefense: 462,
    heroSpecific: ['targetNumberOfDebuffs'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        // TODO: fix this mod tip saying 1000%
        fixed: (hitType: HitType, inputValues: DamageFormData) => (hitType !== HitType.miss) ? inputValues.targetNumberOfDebuffs * 1000 : 0,
        fixedTip: (fixedDamage: number, inputValues: DamageFormData) => ({ per_target_debuff: 1000 }),
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        fixed: (hitType: HitType, inputValues: DamageFormData) => (hitType !== HitType.miss) ? inputValues.targetNumberOfDebuffs * 1500 : 0,
        fixedTip: (fixedDamage: number, inputValues: DamageFormData) => ({ per_target_debuff: 1500 }),
        isAOE: () => true,
      })
    }
  }),
  fairytale_tenebria: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 5299,
    baseDefense: 673,
    heroSpecific: ['targetProvoked', 'targetMaxHP'],
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
        fixed: (hitType: HitType, inputValues: DamageFormData) => (hitType !== HitType.miss && inputValues.targetProvoked) ? inputValues.targetFinalMaxHP() * 0.1 : 0,
        fixedTip: (fixedDamage: number, inputValues: DamageFormData) => ({ targetMaxHP: inputValues.targetProvoked ? 10 : 0 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
        isExtra: true
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.10],
        isAOE: () => true,
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
        isAOE: () => true,
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
    heroSpecific: ['casterDefense'],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.7,
        flatTip: () => ({ casterDefense: 70 }),
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
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.1,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.07,
        flatTip: () => ({ casterMaxHP: 7 }),
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isAOE: () => true,
      })
    }
  }),
  fenris: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    baseAtk: 1327,
    baseHP: 5138,
    baseDef: 582,
    heroSpecific: ['casterMaxHP', 'targetMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: (soulburn: boolean) => soulburn ? 1.9 : 1.2,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
        soulburn: true
      }),
      s2: new Skill({
        id: 's2',
        name: 'fenrisSoaringArrow',
        rate: () => 0.7,
        pow: () => 1,
        isExtra: true,
        isAOE: () => true,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.3,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
          const casterHP = inputValues.casterFinalMaxHP(artifact)
          const targetHP =inputValues.targetFinalMaxHP()
          return (casterHP < targetHP)
                 ? 1 + Math.min((targetHP - casterHP) * 0.00005, 0.7)
                 : 1
        },
        multTip: () => ({ caster_vs_target_hp_diff: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  festive_eda: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1102,
    baseDefense: 634,
    baseHP: 5782,
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
        name: 'festive_eda_expected_outcome',
        rate: () => 1,
        pow: () => 1,
        isExtra: true,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0, 0.1],
        isAOE: () => true,
      })
    }
  }),
  frida: new Hero({
    element: HeroElement.ice,
    class: HeroClass.soul_weaver,
    baseAttack: 694,
    baseDefense: 613,
    baseHP: 4855,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      return inputValues.casterFinalMaxHP(artifact) * 0.2;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  fighter_maya: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 821,
    baseDefense: 703,
    baseHP: 6266,
    heroSpecific: ['casterDefense', 'targetCurrentHPPercent'],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.75,
        flatTip: () => ({ casterDefense: 75 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 1.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 1.5,
        flatTip: () => ({ casterDefense: 150 }),
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetCurrentHPPercent < 30 ? 4 : 1,
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
    heroSpecific: ['targetMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * 0.03,
        flatTip: () => ({ targetMaxHP: 3 }),
        enhance: [0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.3 : 1.6,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.05, 0.15],
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * 0.04,
        flatTip: () => ({ targetMaxHP: 4 }),
        isSingle: () => true,
      })
    }
  }),
  fumyr: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 5299,
    baseDefense: 673,
    heroSpecific: ['casterElementalWisdomStack'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.0, 0.05, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 1,
        fixed: (hitType: HitType, inputValues: DamageFormData) => inputValues.casterElementalWisdomStack * 3000,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
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
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.06 * inputValues.casterFinalMaxHP(artifact),
        flatTip: () => ({ casterMaxHP: 6 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.08 * inputValues.casterFinalMaxHP(artifact),
        flatTip: () => ({ casterMaxHP: 8 }),
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        isAOE: () => true,
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
    heroSpecific: ['casterDebuffed'],
    baseAttack: 1199,
    baseHP: 4491,
    baseDefense: 613,
    attackIncrease: (inputValues: DamageFormData) => {
      if (!inputValues.casterDebuffed) return 1;

      let boost = 0.2;
      for (let i = 0; i < inputValues.molagoras2; i++) {
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
        isAOE: () => true,
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
    heroSpecific: ['exclusiveEquipment1', 'dualAttackStack'],
    heroSpecificMaximums: {'dualAttackStack': 5},
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
    innateAttackIncrease: (inputValues: DamageFormData) => {
      let boost = 0.5;
      for (let i = 0; i < inputValues.molagoras2; i++) {
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
  harsetti: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    heroSpecific: ['casterMaxHP', 'casterFullFocus'],
    baseAttack: 1039,
    baseHP: 6034,
    baseDefense: 613,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.6,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.08,
        flatTip: () => ({ casterMaxHP: 8 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0, 0.1],
        isSingle: () => true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
        name: 'harsettiEnPassant',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.11,
        flatTip: () => ({ casterMaxHP: 11 }),
        isExtra: true,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.0,
        flatTip: () => ({ casterMaxHP: 0 }),
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFullFocus ? 2 : 1,
        multTip: () => ({ casterFullFocus: 100 }),
        penetrate: () => 1,
        isAOE: () => true,
        enhance: [0.05, 0.05, 0, 0, 0.05, 0.05, 0, 0.1],
      })
    }
  }),
  hataan: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    heroSpecific: ['casterSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.95,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        speedScaling: true,
        rate: () => 1.3,
        pow: () => 0.85,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00125,
        multTip: () => ({ casterSpeed: 0.125 }),
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
    heroSpecific: ['casterMaxHP', 'enemyCounterStack'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      return inputValues.casterFinalMaxHP(artifact) * 0.2;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        fixed: (hitType: HitType, inputValues: DamageFormData) => 500 + inputValues.enemyCounterStack * 100,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.05,
        flatTip: () => ({ casterMaxHP: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        fixed: (hitType: HitType, inputValues: DamageFormData) => 500 + inputValues.enemyCounterStack * 1000,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  haste: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1089,
    baseHP: 5380,
    baseDefense: 511,
    heroSpecific: ['numberOfTargets'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
          switch (inputValues.numberOfTargets) {
          case 1: return 2.5;
          case 2: return 2.0;
          case 3: return 1.5;
          default: return 1.0;
          }
        },
        multTip: () => ({ per_fewer_target: 50 }),
        enhance: [0.15, 0, 0, 0, 0.15],
        isAOE: () => true,
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
    heroSpecific: ['casterDefense'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalDefense() * 0.8,
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.8,
        flatTip: () => ({ casterDefense: 80 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        isSingle: () => true
      }),
      s2: new Skill({
        id: 's2',
        defenseScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense(),
        flatTip: () => ({ casterDefense: 100 }),
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        isAOE: () => true,
      })
    }
  }),
  holy_flame_adin: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    heroSpecific: ['skillTreeCompleted'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { skill_tree: 10 } : null),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 1,
        isAOE: () => true,
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
    baseHP: 5121,
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
        isAOE: () => true,
      })
    }
  }),
  hwayoung: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6226,
    baseDefense: 627,
    heroSpecific: ['targetAttack'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.8,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: (soulburn: boolean) => soulburn ? 1.2 : 0.8,
        pow: () => 1,
        afterMath: (hitType: HitType, inputValues: DamageFormData, soulburn: boolean) => hitType !== HitType.miss ? (soulburn ? new AftermathSkill({ attackPercent: 0.7 }) : new AftermathSkill({ attackPercent: 0.35 })) : null,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
        noCrit: true,
        soulburn: true
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1,
        penetrate: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact, casterAttack: number) => {
          const targetAtk = inputValues.targetFinalAttack();

          const penDiff = (casterAttack - targetAtk) * 0.000196;

          return Math.min(Math.max(0, penDiff), 1);
        },
        penetrateTip: () => ({caster_target_atk_diff: 0.0196}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
        noCrit: true,
      }),
    }
  }),
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
        isAOE: () => true,
      })
    }
  }),
  ilynav: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 957,
    baseHP: 6148,
    baseDefense: 634,
    heroSpecific: ['casterMaxHP', 'targetInjuries'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.4 : 1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * (soulburn ? 0.28 : 0.18),
        flatTip: (soulburn: boolean) => ({ casterMaxHP: (soulburn ? 28 : 18) }),
        afterMath: () => new AftermathSkill({ injuryPercent: 0.5 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.15,
        flatTip: () => ({ casterMaxHP: 15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  immortal_wukong: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1208,
    baseHP: 6488,
    baseDefense: 616,
    heroSpecific: ['casterAttackedStack', 'targetAttack'],
    heroSpecificMaximums: {'casterAttackedStack': 3},
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.casterAttackedStack * 0.2,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.3,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.85,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s1_bis: new Skill({
        name: 'immortal_wukong_s1_aoe',
        id: 's1_bis',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.1 : 0.85,
        enhanceFrom: 's1',
        pow: () => 1,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact, heroAttack: number) => {
          const targetAtk = inputValues.targetFinalAttack();

          const multDiff = (heroAttack - targetAtk) * 0.000175;

          return Math.min(Math.max(multDiff + 1, 1), 1.7);
        },
        multTip: () => ({caster_target_atk_diff: 0.0175}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  inferno_khawazu: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6091,
    baseDefense: 594,
    heroSpecific: ['targetBurnDetonate'],
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
        detonation: () => 1.3,
        isSingle: () => true,
      })
    }
  }),
  infinite_horizon_achates: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    heroSpecific: ['casterMaxHP'],
    baseAttack: 576,
    baseHP: 5165,
    baseDefense: 767,
    barrierSkills: ['S2', 'S3'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      const scale = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1];
      let boost = 1.0;
      for (let i = 0; i < inputValues.molagoras1; i++) {
        boost += scale[i];
      }

      return inputValues.casterFinalMaxHP(artifact) * 0.18 * boost;
    },
    barrier2: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      return inputValues.casterFinalMaxHP(artifact) * 0.2;
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
        rate: () => 2,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  jack_o: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    heroSpecific: ['targetHasDebuff'],
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
        name: 's1_extra_attack',
        rate: () => 1.1,
        pow: () => 1,
        isExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasDebuff ? 1.5 : 1,
        multTip: () => ({ targetHasDebuff: 50 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),

  januta: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    /*heroSpecific: ['casterEnraged'],*/
    baseAttack: 1144,
    baseHP: 4895,
    baseDefense: 543,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterEnraged ? 1.3 : 1,
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
        isAOE: () => true,
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
        isAOE: () => true,
      })
    }
  }),
  jenua: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    /*heroSpecific: ['casterEnraged'],*/
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.32,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        penetrate: () => 1.0,
        isSingle: () => true,
      }),
      s3_splash: new Skill({
        id: 's3_splash',
        name: 's3_splash',
        rate: () => 0,
        pow: () => 0,
        afterMath: () => new AftermathSkill({ attackPercent: 0.6 }),
        noCrit: true,
        noMiss: true
      })
    }
  }),
  judge_kise: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 1039,
    baseHP: 5340,
    baseDefense: 617,
    heroSpecific: ['numberOfTargets'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        penetrate: () => 0.2,
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.15, 0, 0, 0.15],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.numberOfTargets - 1) * 0.1,
        multTip: () => ({ per_target: 10 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isAOE: () => true,
      })
    }
  }),
  judge_kise_old: new Hero({
    element: HeroElement.light,
    class: HeroClass.warrior,
    baseAttack: 1039,
    baseHP: 5340,
    baseDefense: 617,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        penetrate: () => 0.2,
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.15, 0, 0, 0.15],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isAOE: () => true,
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
    heroSpecific: ['casterPerception'],
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
        isAOE: () => true,
      })
    }
  }),
  kane: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAtk: 1359,
    baseHP: 5542,
    baseDef: 585,
    heroSpecific: [/*'casterEnraged',*/ 'targetNumberOfDebuffs'],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
        isSingle: () => true,
      }),
      s1_bis: new Skill({
        name: 'kane_rock_smash',
        id: 's1_bis',
        rate: () => 0.45,
        pow: () => 1,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.6,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.targetNumberOfDebuffs * 0.2,
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
        isAOE: () => true,
      })
    }
  }),
  kanna: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    heroSpecific: ['casterSpeed'],
    baseAttack: 1182,
    baseHP: 5299,
    baseDefense: 571,
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.75,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        isAOE: () => true,
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
    heroSpecific: ['exclusiveEquipment3', 'casterSpeed', 'targetSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.4,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.targetFinalSpeed() * 0.003,
        multTip: () => ({ targetSpeed: 0.3 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        rate: () => 0.8,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        penetrate: () => 0.3,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.2 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isAOE: () => true,
      })
    }
  }),
  kayron: new Hero({
    element: HeroElement.fire,
    class: HeroClass.thief,
    baseAttack: 1119,
    baseHP: 5340,
    baseDefense: 483,
    heroSpecific: ['exclusiveEquipment1', 'exclusiveEquipment2', 'casterCurrentHPPercent'],
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.35 : 0.85,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.0015,
        multTip: () => ({ caster_lost_hp_pc: 0.15 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment1 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.7,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.003,
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
    heroSpecific: ['casterMaxHP'],
    dot: [DoT.burn],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
        enhance: [0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 1.5,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.3,
        flatTip: () => ({ casterMaxHP: 30 }),
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
    heroSpecific: ['targetHasDebuff', 'casterSpeed'],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        afterMath: (hitType: HitType, inputValues: DamageFormData) => inputValues.targetHasDebuff ? new AftermathSkill({ attackPercent: 0.6 }) : null,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        speedScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        rate: () => 1.5,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001125,
        multTip: () => ({ casterSpeed: 0.1125 }),
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
    heroSpecific: ['casterDefense'],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.7,
        flatTip: () => ({ casterDefense: 70 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 0.5 : 0.4,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * (soulburn ? 0.6 : 0.5),
        flatTip: (soulburn: boolean) => ({ casterDefense: soulburn ? 60 : 50 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isAOE: () => true,
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
        isAOE: () => true,
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
    heroSpecific: ['exclusiveEquipment2', 'casterHasStealth', 'casterCurrentHPPercent', 'targetHasBuff'],
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.4 : 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
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
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterHasStealth ? 0.6 : 0.3,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.6,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterCurrentHPPercent * 0.0035,
        multTip: () => ({ caster_left_hp_pc: 0.35 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),

  kitty_clarissa: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    baseAttack: 957,
    baseHP: 5057,
    baseDefense: 592,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.9,
        pow: () => 0.8,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.06,
        flatTip: () => ({ casterMaxHP: 6 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
        isSingle: () => true,

      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.05 : 0.8,
        pow: () => 0.95,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.15],
        isAOE: () => true,
      })
    }
  }),
  kizuna_ai: new Hero({
    element: HeroElement.fire,
    class: HeroClass.soul_weaver,
    baseAttack: 576,
    baseHP: 5700,
    baseDefense: 743,
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.14,
    barrierEnhance: 's3',
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
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
    heroSpecific: ['casterDefense'],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.7,
        flatTip: () => ({ casterDefense: 70 }),
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
    heroSpecific: ['casterMaxHP', 'casterCurrentHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.085 * inputValues.casterFinalMaxHP(artifact),
        flatTip: () => ({ casterMaxHP: 8.5 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.13 * inputValues.casterFinalMaxHP(artifact),
        flatTip: () => ({ casterMaxHP: 13 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        noCrit: true,
        rate: () => 0.3,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.53571 * Math.max(inputValues.casterFinalMaxHP(artifact) - inputValues.casterCurrentHP, 0),
        flatTip: () => ({ caster_lost_hp: 53.571 }),
        penetrate: () => 1.0,
        isSingle: () => true,
      })
    }
  }),
  laia: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 984,
    baseHP: 6266,
    baseDefense: 637,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.01 * inputValues.casterFinalMaxHP(artifact),
        flatTip: () => ({ casterMaxHP: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        noCrit: true,
        soulburn: true,
        rate: () => 0.3,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => (soulburn ? 0.32 : 0.2) * inputValues.casterFinalMaxHP(artifact),
        flatTip: (soulburn: boolean) => ({ casterMaxHP: soulburn ? 32 : 20 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
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
    heroSpecific: ['casterFullFightingSpirit', 'attackSkillStack'],
    heroSpecificMaximums: {'attackSkillStack': 3},
    attackIncrease: (inputValues: DamageFormData) => {
      let boost = 0.15;
      for (let i = 0; i < inputValues.molagoras2; i++) {
        boost += Heroes.landy.skills.s2.enhance[i];
      }

      return 1 + inputValues.attackSkillStack * boost;
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
        isAOE: () => true,
        rate: () => 0.9,
        pow: () => 1,
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterFullFightingSpirit ? 0.5 : 0,
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
    heroSpecific: ['casterSpeed', 'targetMaxHP', 'casterHasNeoPhantomSword'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.5 : 0.9,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterHasNeoPhantomSword ? inputValues.targetFinalMaxHP() * 0.3 : 0,
        flatTip: () => ({ targetMaxHP: 30 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
        ignoreDamageTransfer: (inputValues: DamageFormData) => inputValues.casterHasNeoPhantomSword ? true : false
      }),
      s2: new Skill({
        id: 's2',
        speedScaling: true,
        rate: () => 1.65,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.0015,
        multTip: () => ({ casterSpeed: 0.15 }),
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterHasNeoPhantomSword ? inputValues.targetFinalMaxHP() * 0.3 : 0,
        flatTip: () => ({ targetMaxHP: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
        ignoreDamageTransfer: (inputValues: DamageFormData) => inputValues.casterHasNeoPhantomSword
      })
    }
  }),
  last_rider_krau: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 839,
    baseHP: 6405,
    baseDefense: 752,
    heroSpecific: ['casterMaxHP', 'attackSkillStack', 'casterSpeed'],
    heroSpecificMaximums: {'attackSkillStack': 3},
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.1,
    barrierEnhance: 's2',
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.1 * inputValues.casterFinalMaxHP(artifact),
        flatTip: () => ({ casterMaxHP: 10 }),
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
        speedScaling: true,
        noCrit: true,
        rate: () => 0.3,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.06 * inputValues.casterFinalMaxHP(artifact),
        flatTip: () => ({ casterMaxHP: 6 }),
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.attackSkillStack * 0.2) + (inputValues.casterFinalSpeed() * 0.001125),
        multTip: () => ({ per_stack: 20, casterSpeed: 0.1125 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  leah: new Hero({
    element: HeroElement.earth,
    class: HeroClass.ranger,
    heroSpecific: ['casterSpeed'],
    baseAttack: 1081,
    baseHP: 4450,
    baseDefense: 504,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.9,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        name: 'leahExplosiveFire',
        speedScaling: true,
        rate: () => 1.2,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001,
        multTip: () => ({ casterSpeed: 0.1 }),
        enhanceFrom: 's1',
        s1Benefits: true,
        isSingle: () => true,
      }),
    }
  }),
  lena: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 951,
    baseHP: 5517,
    baseDefense: 583,
    heroSpecific: ['targetCurrentHPPercent'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.002,
        multTip: () => ({ target_lost_hp_pc: 0.2 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isAOE: () => true,
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
        isAOE: () => true,
      })
    }
  }),
  lethe: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 885,
    baseHP: 6149,
    baseDefense: 613,
    heroSpecific: ['casterMaxHP', 'exclusiveEquipment1'],
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
        name: 'lethe_call_of_the_abyss',
        hpScaling: true,
        rate: () => 0.3,
        pow: () => 1.3,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment1 ? 0.1 : 0,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.22,
        flatTip: () => ({casterMaxHP: 22}),
        penetrate: () => 1,
        noCrit: true,
        isExtra: true,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0.0, 0.1, 0, 0, 0.15],
        isAOE: () => true,
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
        isAOE: () => true,
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
  // TODO: refactor to make the lilias-only stuff less annoying
  lilias: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 821,
    baseHP: 6751,
    baseDefense: 648,
    heroSpecific: ['casterMaxHP', 'highestAllyAttack', 'exclusiveEquipment3'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        atk: (inputValues: DamageFormData) => {
          return inputValues.highestAllyAttack * (1 + (inputValues.highestAllyAttackUp ? BattleConstants.attackUp - 1 : 0)
                                                    + (inputValues.highestAllyAttackUpGreat ? BattleConstants.attackUpGreat - 1 : 0)
                                                    - (inputValues.highestAllyAttackDown ? BattleConstants.decreasedAttack : 0));
        },
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.2 : 0,
        noBuff: true,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        isAOE: () => true,
      })
    }
  }),

  lilibet: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6266,
    baseDefense: 627,
    heroSpecific: ['exclusiveEquipment1', 'exclusiveEquipment3'],
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
    heroSpecific: ['casterDefense'],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1 : 0.6,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * (soulburn ? 1.6 : 1.0),
        flatTip: (soulburn: boolean) => ({ casterDefense: (soulburn ? 160 : 100) }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 1.35,
        flatTip: () => ({ casterDefense: 135 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.elementalAdvantage ? 1.5 : 1,
        multTip: () => ({ elementalAdvantage: 50 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        isSingle: () => true,
      }),
      s3_splash: new Skill({
        id: 's3_splash',
        name: 's3_splash',
        rate: () => 0,
        pow: () => 0,
        afterMath: (hitType: HitType, inputValues: DamageFormData) => inputValues.elementalAdvantage ? new AftermathSkill({ attackPercent: 1.2 }) : null,
        noCrit: true,
        noMiss: true,
      })
    }
  }),
  lone_crescent_bellona: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    heroSpecific: ['attackSkillStack'],
    heroSpecificMaximums: {'attackSkillStack': 5},
    baseAttack: 1208,
    baseHP: 6488,
    baseDefense: 616,
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.attackSkillStack * 0.1,
    skills: {
      s1: new Skill({
        id: 's1',
        onlyCrit: () => true,
        rate: (soulburn: boolean) => soulburn ? 1.6 : 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
        soulburn: true
      }),
      s2: new Skill({
        id: 's2',
        onlyCrit: () => true,
        rate: () => 0.6,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        onlyCrit: () => true,
        rate: () => 1.7,
        pow: () => 1,
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
    heroSpecific: ['targetMaxHP', 'targetCurrentHPPercent', 'attackSkillStack'],
    heroSpecificMaximums: {'attackSkillStack': 5},
    attackIncrease: (inputValues: DamageFormData) => {
      let boost = 0.1;
      for (let i = 0; i < inputValues.molagoras2; i++) {
        boost += Heroes.lorina.skills.s2.enhance[i];
      }

      return 1 + inputValues.attackSkillStack * boost;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * 0.02,
        flatTip: () => ({ targetMaxHP: 2 }),
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.005,
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
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.2,
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
        isAOE: () => true,
      })
    }
  }),
  ludwig: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    baseAttack: 1412,
    baseHP: 4248,
    baseDefense: 645,
    heroSpecific: ['exclusiveEquipment1', 'exclusiveEquipment3', 'casterInvincible'],
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
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterInvincible ? 0.6 : 0.3,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isAOE: () => true,
      })
    }
  }),
  luluca: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1316,
    baseHP: 4777,
    baseDefense: 715,
    heroSpecific: ['targetCurrentHPPercent', 'skill3Stack'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * (1 + inputValues.skill3Stack * 0.2) * 0.375,
    barrierEnhance: 's2',
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.skill3Stack * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (1 - (inputValues.targetCurrentHPPercent / 100)) * 0.2,
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
        isAOE: () => true,
      })
    }
  }),
  luna: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6266,
    baseDefense: 627,
    heroSpecific: ['casterAboveHalfHP', 'numberOfHits'],
    attackIncrease: (inputValues: DamageFormData) => {
      if (!inputValues.casterAboveHalfHP) {
        return 1;
      }

      let mult = 1.2;
      for (let i = 0; i < inputValues.molagoras2; i++) {
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
    heroSpecific: ['casterCurrentHPPercent'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: (soulburn: boolean) => soulburn ? 1.3 : 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
        onlyCrit: (soulburn: boolean) => soulburn,
        soulburn: true
      }),
      s2: new Skill({
        id: 's2',
        onlyCrit: () => true,
        rate: () => 0.95,
        pow: () => 1,
        mult: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
          // let extra = 0;
          // for (let i = 0; i < inputValues.molagoras1; i++) {
          //   extra += Heroes.martial_artist_ken.skills.s1.enhance[i];
          // }
          return (1 + (100 - inputValues.casterCurrentHPPercent) * 0.004);
        },
        multTip: () => ({ caster_lost_hp_pc: 40 }),
        penetrate: () => 0.4,
        enhance: [0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        isAOE: () => true,
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
    heroSpecific: ['casterDefense'],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.75,
        flatTip: () => ({ casterDefense: 75 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        defenseScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.8,
        flatTip: () => ({ casterDefense: 80 }),
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
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.04 * inputValues.casterFinalMaxHP(artifact),
        flatTip: () => ({ casterMaxHP: 4 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 1.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.09 * inputValues.casterFinalMaxHP(artifact),
        flatTip: () => ({ casterMaxHP: 9 }),
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
        isAOE: () => true
      })
    }
  }),
  melissa: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1412,
    baseHP: 4248,
    baseDefense: 645,
    heroSpecific: ['exclusiveEquipment2', 'casterCurrentHPPercent'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1.1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.0035,
        multTip: () => ({ caster_lost_hp_pc: 0.35 }),
        enhance: [0.05, 0, 0.05, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.003,
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
  mercedes: new Hero({
    element: HeroElement.fire,
    class: HeroClass.mage,
    baseAttack: 1187,
    baseHP: 4491,
    baseDefense: 627,
    heroSpecific: ['casterHasImmensePower'],
    attackIncrease: (inputValues: DamageFormData) => inputValues.casterHasImmensePower ? 1.15 : 1,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.75,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isAOE: () => true,
      })
    }
  }),
  mercenary_helga: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1000,
    baseHP: 4895,
    baseDefense: 518,
    heroSpecific: ['skillTreeCompleted'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.skillTreeCompleted ? 0.1 : 0),
        multTip: () => ({ skill_tree: 10 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.55,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.skillTreeCompleted ? 0.05 : 0),
        multTip: () => ({ skill_tree: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  midnight_gala_lilias: new Hero({
    name: 'Midnight Gala Lilias',
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAtk: 1208,
    baseHP: 5178,
    baseDef: 508,
    heroSpecific: ['casterMaxHP', 'targetMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        onlyCrit: () => true,
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        onlyCrit: () => true,
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        penetrate: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
          const casterHP = inputValues.casterFinalMaxHP(artifact)
          const targetHP =inputValues.targetFinalMaxHP()
          return (casterHP < targetHP)
                 ? Math.min((targetHP - casterHP) * 0.0000625, 1)
                 : 0
        },
        penetrateTip: () => ({ caster_vs_target_hp_diff: 6.25 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
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
        pow: () => 1.3,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.7,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        ignoreDamageTransfer: () => true,
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
    heroSpecific: ['casterSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.5 : 1.8,
        pow: () => 0.85,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.0015,
        multTip: () => ({ casterSpeed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  mistychain: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1252,
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
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.20,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
    }
  }),
  mort: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 957,
    baseHP: 6148,
    baseDefense: 634,
    heroSpecific: ['exclusiveEquipment3', 'casterMaxHP'/*, 'casterEnraged'*/ ],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.08,
        flatTip: () => ({ casterMaxHP: 8 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.15,
        flatTip: () => ({ casterMaxHP: 15 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment3 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  mucacha: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1000,
    baseHP: 4895,
    baseDefense: 518,
    heroSpecific: ['casterSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        rate: () => 1.5,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isAOE: () => true,
      })
    }
  }),
  muse_rima: new Hero({
    element: HeroElement.ice,
    class: HeroClass.ranger,
    heroSpecific: ['skillTreeCompleted'],
    baseAttack: 822,
    baseHP: 4693,
    baseDefense: 561,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.8,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.skillTreeCompleted ? 0.05 : 0),
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
        isAOE: () => true,
      })
    }
  }),
  nahkwol: new Hero({
    name: 'Nahkwol',
    element: HeroElement.fire,
    class: HeroClass.ranger,
    baseAtk: 1003,
    baseHP: 5704,
    baseDef: 585,
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
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  navy_captain_landy: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 1134,
    baseDefense: 662,
    baseHP: 5825,
    heroSpecific: ['attackSkillStack'],
    heroSpecificMaximums: {'attackSkillStack': 5},
    attackIncrease: (inputValues: DamageFormData) => {
      return 1 + inputValues.attackSkillStack * 0.1;
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
        name: 'navy_captain_landy_salvo_fire',
        rate: () => 0.8,
        pow: () => 1.3,
        isExtra: true,
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1.05,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        penetrate: () => 0.6,
        isAOE: () => true,
      })
    }
  }),
  nemunas: new Hero({
    element: HeroElement.fire,
    class: HeroClass.ranger,
    baseAttack: 920,
    baseHP: 4855,
    baseDefense: 525,
    heroSpecific: ['targetMaxHP'],
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * (soulburn ? 0.085 : 0.05),
        flatTip: (soulburn: boolean) => ({ targetMaxHP: soulburn ? 8.5 : 5 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  new_moon_luna: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 1039,
    baseHP: 6034,
    baseDefense: 613,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
        enhance: [0.05, 0, 0.05, 0.05, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.2,
        flatTip: () => ({ casterMaxHP: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2_splash: new Skill({
        id: 's2_splash',
        name: 's2_splash',
        rate: () => 0,
        pow: () => 0,
        afterMath: (hitType: HitType, inputValues: DamageFormData) => new AftermathSkill({ hpPercent: 0.16 }),
        noCrit: true,
        noMiss: true,
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
        isAOE: () => true,
      })
    }
  }),
  operator_sigret: new Hero({
    element: HeroElement.dark,
    class: HeroClass.ranger,
    baseAttack: 1079,
    baseHP: 5502,
    baseDefense: 564,
    heroSpecific: ['targetHasBarrier', 'casterSpeed'],
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
        speedScaling: true,
        rate: () => 0.75,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.targetHasBarrier ? 1.0 : 0.5,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        rate: () => 1,
        pow: () => 1.1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001125,
        multTip: () => ({ casterSpeed: 0.1125 }),
        enhance: [0.05, 0, 0, 0, 0.15],
        isAOE: () => true,
      })
    }
  }),
  orte: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 857,
    baseHP: 4531,
    baseDefense: 483,
    heroSpecific: ['casterSpeed', 'casterPerception', 'targetSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.65,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => {
          const casterSpd = inputValues.casterFinalSpeed();
          const targetSpd = inputValues.targetFinalSpeed();

          const penDiff = (casterSpd - targetSpd) * 0.003;
          return Math.min(Math.max(0, penDiff) + 0.3, 0.7);
        },
        penetrateTip: () => ({ caster_target_spd_diff: 0.3 }),
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
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
    heroSpecific: ['casterSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.9,
        pow: () => 1.1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0, 0.05, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        speedScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001125,
        multTip: () => ({ casterSpeed: 0.1125 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        rate: () => 1.6,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.0015,
        multTip: () => ({ casterSpeed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        ignoreDamageTransfer: () => true,
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
    heroSpecific: ['casterDefense', 'casterFury'],
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.8,
        flatTip: () => ({ casterDefense: 80 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 1.3,
        flatTip: () => ({ casterDefense: 130 }),
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => {
          const targetDef = inputValues.targetFinalDefense();
          const casterDef = inputValues.casterFinalDefense();

          const penDiffMult = (casterDef - targetDef) * 0.00032;

          return Math.min(Math.max(0, penDiffMult), 0.6);
        },
        penetrateTip: () => ({caster_target_def_diff: 0.032}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      }),
    }
  }),
  pearlhorizon: new Hero({
    element: HeroElement.earth,
    class: HeroClass.mage,
    baseAttack: 921,
    baseHP: 4855,
    baseDefense: 631,
    heroSpecific: ['targetMaxHP', 'targetAsleep'],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.9,
        fixed: (hitType: HitType, inputValues: DamageFormData) => (inputValues.targetAsleep) ? inputValues.targetFinalMaxHP() * 0.2 : 0,
        fixedTip: (fixedDamage: number, inputValues: DamageFormData) => ({ targetMaxHP: inputValues.targetAsleep ? 20 : 0 }),
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
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      let boost = 1.0;
      for (let i = 0; i < inputValues.molagoras3; i++) {
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
        isAOE: () => true,
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
    heroSpecific: ['attackSkillStack'],
    heroSpecificMaximums: {'attackSkillStack': 3},
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.attackSkillStack * 0.15,
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
  pernilla: new Hero({
    element: HeroElement.dark,
    class: HeroClass.warrior,
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => hero.getAttack(artifact, inputValues, attackMultiplier, skill) * 0.7,
    barrierEnhance: 's2',
    baseAttack: 1144,
    baseHP: 4895,
    baseDefense: 543,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.65,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0, 0.15],
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
    heroSpecific: ['targetBurnDetonate', 'targetBombDetonate'],
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
        isAOE: () => true,
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        isAOE: () => true,
      }),
    }
  }),
  purrgis: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1119,
    baseHP: 6091,
    baseDefense: 594,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.05,
        flatTip: () => ({ casterMaxHP: 5 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        name: 's2_counter',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.05,
        flatTip: () => ({ casterMaxHP: 5 }),
        enhanceFrom: 's1',
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.05 : 0.8,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  pyllis: new Hero({
    element: HeroElement.dark,
    class: HeroClass.knight,
    baseAttack: 685,
    baseDefense: 703,
    baseHP: 6403,
    heroSpecific: ['casterDefense', 'casterAttackedStack'],
    heroSpecificMaximums: {'casterAttackedStack': 3},
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalDefense(Heroes.pyllis.defenseIncrease(inputValues)) * 0.6,
    defenseIncrease: (inputValues: DamageFormData) => {
      return inputValues.casterAttackedStack * 0.1;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense(Heroes.pyllis.defenseIncrease(inputValues)) * 0.5,
        flatTip: () => ({ casterDefense: 50, per_stack: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 1.3,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense(Heroes.pyllis.defenseIncrease(inputValues)) * 0.7,
        flatTip: () => ({ casterDefense: 70, per_stack: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  ragnvald: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.65,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
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
        isSingle: () => true
      }),
      s1_soulburn: new Skill({
        name: 's1_soulburn',
        rate: () => 1,
        pow: () => 1,
        enhanceFrom: 's1',
        isAOE: () => true,
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
    heroSpecific: ['casterSpeed', 'targetSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.9,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        penetrate: () => 0.2,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075 + inputValues.targetFinalSpeed() * 0.0015,
        multTip: () => ({ casterSpeed: 0.075, targetSpeed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  ras: new Hero({
    element: HeroElement.fire,
    class: HeroClass.knight,
    baseAttack: 758,
    baseHP: 5826,
    baseDefense: 672,
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.9,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.04,
        flatTip: () => ({ casterMaxHP: 4 }),
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.04,
        flatTip: () => ({ casterMaxHP: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      }),
    }
  }),
  ravi: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 966,
    baseHP: 7323,
    baseDefense: 657,
    heroSpecific: ['casterMaxHP', 'exclusiveEquipment1', 'exclusiveEquipment2'],
    flatAttackIncrease: (inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.08,
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.5 : 1,
        pow: () => 1,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment1 ? 0.1 : 0,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
        onlyCrit: () => true
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 0.95,
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isAOE: () => true,
        onlyCrit: () => true
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
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        canExtra: true,
        isSingle: () => true
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8, 
        pow: () => 1.3,
        isAOE: () => true
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1, 
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true
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
        rate: () => 1.2,
        pow: () => 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.4,
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
    baseAttack: 1316,
    baseHP: 4777,
    baseDefense: 715,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        afterMath: (hitType: HitType) => hitType !== HitType.miss ? new AftermathSkill(({ attackPercent: 0.5 })) : null,
        noCrit: true,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.35,
        pow: () => 1,
        penetrate: () => 1.0,
        noCrit: true,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true
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
    heroSpecific: ['targetBurnDetonate'],
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
        isAOE: () => true,
      })
    }
  }),
  revna: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1039,
    baseHP: 5517,
    baseDefense: 452,
    heroSpecific: ['casterPromotionStack', 'targetMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        pow: () => 1,
        rate: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterPromotionStack > 0 ? inputValues.targetFinalMaxHP() * 0.025 : 0,
        flatTip: () => ({ targetMaxHP: 2.5 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        pow: () => 1,
        rate: (soulburn: boolean) => soulburn ? 1.8 : 1.5,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterPromotionStack > 0 ? inputValues.targetFinalMaxHP() * 0.03 : 0,
        flatTip: () => ({ targetMaxHP: 3 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        soulburn: true,
        isSingle: () => true,
      })
    }
  }),
  righteous_thief_roozid: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 812,
    baseHP: 4370,
    baseDefense: 462,
    heroSpecific: ['casterSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        speedScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001125,
        multTip: () => ({ casterSpeed: 0.1125 }),
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
        isAOE: () => true,
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
    heroSpecific: ['alliesNumberOfBuffs'],
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
        fixed: (hitType: HitType, inputValues: DamageFormData) => (hitType !== HitType.miss) ? Math.min(5000 + (inputValues.alliesNumberOfBuffs * 625), 10000) : 0,
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
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.9,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.05,
        flatTip: () => ({ casterMaxHP: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.07,
        flatTip: () => ({casterMaxHP: 7}),
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
        rate: () => 2,
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
    heroSpecific: ['targetHasDebuff'],
    dot: [DoT.bomb],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasDebuff ? 1.1 : 1,
        multTip: () => ({ targetHasDebuff: 10 }),
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
        isAOE: () => true,
      })
    }
  }),
  roana: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 621,
    baseHP: 5474,
    baseDefense: 802,
    heroSpecific: ['casterMaxHP'],
    barrierSkills: ['S1', 'S3'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      const scale = [0, 0.05, 0, 0.1, 0, 0.1, 0];
      let boost = 1.0;
      for (let i = 0; i < inputValues.molagoras1; i++) {
        boost += scale[i];
      }

      return inputValues.casterFinalMaxHP(artifact) * 0.1 * boost;
    },
    barrier2: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      return inputValues.casterFinalMaxHP(artifact) * 0.15;
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 0.85,
        enhance: [0.05, 0.1, 0, 0.15, 0.15],
        isAOE: () => true,
      }),
    }
  }),

  roozid: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 812,
    baseHP: 4370,
    baseDefense: 462,
    heroSpecific: ['casterSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        speedScaling: true,
        rate: () => 1.2,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001125,
        multTip: () => ({ casterSpeed: 0.1125 }),
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
    heroSpecific: ['casterDefense'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalDefense(),
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense() * 0.7,
        flatTip: () => ({casterDefense: 70}),
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
    heroSpecific: ['casterHasFlameAlchemist', 'numberOfTargets'],
    attackIncrease: (inputValues: DamageFormData) => inputValues.casterHasFlameAlchemist ? 1.2 : 1,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.8,
        pow: () => 1,
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.casterHasFlameAlchemist ? 0.5 : 0,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.2,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
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
        isAOE: () => true,
      })
    }
  }),
  ruele_of_light: new Hero({
    element: HeroElement.light,
    class: HeroClass.soul_weaver,
    baseAttack: 621,
    baseHP: 5474,
    baseDefense: 802,
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.81,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.07,
        flatTip: () => ({casterMaxHP: 7}),
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
    heroSpecific: ['casterMaxHP', 'casterCurrentHP'],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        penetrate: () => 1.0,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.25 * Math.max(inputValues.casterFinalMaxHP(artifact) - inputValues.casterCurrentHP, 0),
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
    heroSpecific: ['skillTreeCompleted'],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        penetrate: () => 0.5,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted && inputValues.elementalAdvantage ? 1.2 : 1,
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
        isAOE: () => true,
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
        afterMath: () => new AftermathSkill({ attackPercent: 0.45 }),
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
        isAOE: () => true,
      })
    }
  }),
  shadow_knight_pyllis: new Hero({
    element: HeroElement.dark,
    class: HeroClass.knight,
    baseAttack: 685,
    baseDefense: 703,
    baseHP: 6403,
    heroSpecific: ['casterDefense', 'casterAttackedStack'],
    heroSpecificMaximums: {'casterAttackedStack': 3},
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalDefense(Heroes.shadow_knight_pyllis.defenseIncrease(inputValues)) * 0.6,
    defenseIncrease: (inputValues: DamageFormData) => {
      return inputValues.casterAttackedStack * 0.1;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        defenseScaling: true,
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense(Heroes.shadow_knight_pyllis.defenseIncrease(inputValues)) * 0.5,
        flatTip: () => ({ casterDefense: 50, per_stack: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        defenseScaling: true,
        rate: () => 1.3,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalDefense(Heroes.shadow_knight_pyllis.defenseIncrease(inputValues)) * 0.7,
        flatTip: () => ({ casterDefense: 70, per_stack: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      })
    }
  }),
  shepherd_jena: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    heroSpecific: ['skillTreeCompleted'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted ? 1.05 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? {skill_tree: 5} : null),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
        isAOE: () => true,
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
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.18,
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.025,
        flatTip: () => ({ casterMaxHP: 2.5 }),
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
    heroSpecific: ['exclusiveEquipment2'],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        isAOE: () => true,
      })
    }
  }),
  sea_phantom_politis: new Hero({
    element: HeroElement.dark,
    class: HeroClass.ranger,
    baseAttack: 993,
    baseHP: 6002,
    baseDefense: 611,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      })
    }
  }),
  serene_purity_adin: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    heroSpecific: ['skillTreeCompleted'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 0.85,
        pow: () => 1.05,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? {skill_tree: 10} : null),
        enhance: [0.05, 0, 0.1, 0, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.6,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? {skill_tree: 10} : null),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
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
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.7,
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
    heroSpecific: ['targetCurrentHPPercent'],
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
        name: 'sez_encroach',
        rate: () => 0.5,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.targetCurrentHPPercent) * 0.003,
        multTip: () => ({ target_lost_hp_pc: 0.3 }),
        enhanceFrom: 's1',
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 3.2 : 2.0,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.targetCurrentHPPercent) * (soulburn ? 0.007 : 0.003),
        multTip: (soulburn: boolean) => ({ target_lost_hp_pc: soulburn ? 0.7 : 0.3 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      explosion: new Skill({ // TODO: change this to be aftermath on s3 with an input for enemy killed? or not if it's aoe
        id: 'explosion',
        name: 'sez_explosion',
        rate: () => 0,
        pow: () => 0,
        afterMath: () => new AftermathSkill({ attackPercent: 1.5 }),
        noCrit: true,
        noMiss: true,
      })
    }
  }),
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
        isAOE: () => true,
      }),
    }
  }),
  shalltear: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 1177,
    baseHP: 5542,
    baseDefense: 553,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: (soulburn: boolean) => soulburn ? 1.5: 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
        soulburn: true
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  sharun: new Hero({
    element: HeroElement.earth,
    class: HeroClass.soul_weaver,
    baseAttack: 640,
    baseHP: 5340,
    baseDefense: 720,
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.1,
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
        isAOE: () => true,
      }),
    }
  }),
  sigret: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1228,
    baseHP: 5784,
    baseDefense: 553,
    heroSpecific: ['exclusiveEquipment1', 'targetNumberOfDebuffs'],
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
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => Math.min(0.3 + inputValues.targetNumberOfDebuffs * 0.1, 1.0),
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
    heroSpecific: ['casterSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.9,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      // TODO: set this back to s1_bis and fix mola
      s2: new Skill({
        id: 's2',
        name: 'silk_automatic_fire',
        s1Benefits: true,
        speedScaling: true,
        rate: () => 1.2,
        pow: () => 0.9,
        penetrate: () =>  0.2,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.95,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0.15],
        isAOE: () => true,
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
        name: 's1_extra_attack',
        rate: () => 0.5,
        pow: () => 1.3,
        enhanceFrom: 's1',
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.9,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
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
    heroSpecific: ['targetHasBuff', 'targetMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasBuff ? 1 : 1.2,
        multTip: () => ({ target_has_no_buff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * 0.04,
        flatTip: () => ({ targetMaxHP: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.6,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * 0.05,
        flatTip: () => ({ targetMaxHP: 5 }),
        afterMath: () => new AftermathSkill({ attackPercent: 0.4 }),
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
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.25,
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
        name: 's1_extra_attack',
        rate: () => 0.8,
        pow: () => 1.3,
        isAOE: () => true,
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
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.08,
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
    heroSpecific: ['targetStunned'],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 1,
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.targetStunned ? 1.0 : 0.3,
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
    heroSpecific: ['targetNumberOfDebuffs', 'numberOfDeaths', 'S3OnCooldown'],
    attackIncrease: (inputValues: DamageFormData) => {
      let buff = 0.07;
      for (let i = 0; i < inputValues.molagoras2; i++) {
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
        isSingle: (inputValues: DamageFormData) => !inputValues.S3OnCooldown,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.005, 0.01, 0.015],
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.targetNumberOfDebuffs * 0.2,
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
    heroSpecific: ['casterHasPossession'],
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
        name: 'ml_celine_nimble_sword',
        rate: () => 1,
        pow: () => 0.9,
        penetrate: () => 0.5,
        enhanceFrom: 's1',
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
    heroSpecific: ['numberOfTargets', 'targetIsHighestMaxHP', 'targetAttack'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
          switch (inputValues.numberOfTargets) {
          case 1: return 1.6;
          case 2: return 1.4;
          case 3: return 1.2;
          default: return 1;
          }
        },
        multTip: () => ({per_fewer_target: 20}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.95,
        pow: () => 1,
        penetrate: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact, heroAttack: number) => {
          if (!inputValues.targetIsHighestMaxHP) return 0;

          const targetAtk = inputValues.targetFinalAttack();

          const penDiff = (heroAttack - targetAtk) * 0.00035;

          return Math.min(Math.max(0, penDiff) + 0.3, 1);
        },
        penetrateTip: () => ({caster_target_atk_diff: 0.035}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
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

  summer_disciple_alexa: new Hero({
    element: HeroElement.ice,
    class: HeroClass.thief,
    baseAttack: 1081,
    baseHP: 4572,
    baseDefense: 494,
    heroSpecific: ['skillTreeCompleted', 'targetNumberOfDebuffs', 'targetMaxHP'],
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
        name: 's1_extra_attack',
        rate: () => 0.75,
        pow: () => 1,
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.skillTreeCompleted ? 0.1 : 0),
        multTip: () => ({skill_tree: 10}),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.targetNumberOfDebuffs * 0.15,
        multTip: () => ({per_target_debuff: 15}),
        // TODO: why is this flat2 instead of flat?
        flat2: (inputValues: DamageFormData) => inputValues.skillTreeCompleted ? (inputValues.targetFinalMaxHP() * 0.05) : 0,
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
    heroSpecific: ['targetBombDetonate'],
    dot: [DoT.bomb],
    innateAttackIncrease: (inputValues: DamageFormData) => {
      let boost = 0.35;
      for (let i = 0; i < inputValues.molagoras2; i++) {
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
        isAOE: () => true,
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
    heroSpecific: ['targetNumberOfBleeds'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetNumberOfBleeds > 0 ? 1.25 + (Math.min(inputValues.targetNumberOfBleeds, 5) - 1) * 0.25 : 1,
        multTip: () => ({ per_bleed: 25 }),
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        isSingle: () => true,
      }),
    }
  }),
  suthan: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    heroSpecific: ['attackSkillStack'],
    heroSpecificMaximums: {'attackSkillStack': 10},
    attackIncrease: (inputValues: DamageFormData) => {
      let boost = 0.025;
      for (let i = 0; i < inputValues.molagoras2; i++) {
        boost += Heroes.suthan.skills.s2.enhance[i];
      }
      return 1 + (boost * inputValues.attackSkillStack);
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
        isAOE: () => true,
      })
    }
  }),
  sven: new Hero({
    element: HeroElement.dark,
    class: HeroClass.thief,
    baseAttack: 1039,
    baseHP: 5517,
    baseDefense: 452,
    heroSpecific: ['casterCurrentHPPercent', 'targetCurrentHPPercent'],
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
        name: 's1_extra_attack',
        rate: () => 0.7,
        pow: () => 1,
        enhanceFrom: 's1',
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.003,
        multTip: () => ({ casterSpeed: 0.3 }),
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1 : 0.8,
        pow: () => 0.8,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.005 + (100 - inputValues.targetCurrentHPPercent) * 0.0015,
        multTip: () => ({caster_lost_hp_pc: 50, target_lost_hp_pc: 15}),
        enhance: [0.05, 0.05, 0.1, 0, 0.1, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  sylvan_sage_vivian: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 1359,
    baseHP: 4895,
    baseDefense: 652,
    heroSpecific: ['skill1Stack', 'numberOfTargets'],
    attackIncrease: (inputValues: DamageFormData) => 1 + inputValues.skill1Stack * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1.1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      // Separate skill because it goes AOE
      s1_soulburn: new Skill({
        id: 's1_soulburn',
        name: 's1_soulburn',
        rate: () => 1.1,
        pow: () => 1,
        enhanceFrom: 's1',
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.numberOfTargets - 1) * 0.1,
        multTip: () => ({ per_target: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      }),
    }
  }),
  taeyou: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    baseAttack: 1039,
    baseHP: 5340,
    baseDefense: 617,
    heroSpecific: ['casterSpeed'/*, 'casterEnraged'*/],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.65 : 0.98,
        pow: () => 0.9,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s1_extra: new Skill({
        id: 's1_extra',
        speedScaling: true,
        name: 's1_extra_attack',
        rate: () => 1.2,
        pow: () => 1.3,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        isExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        isAOE: () => true,
      }),
    }
  }),
  talaz: new Hero({
    element: HeroElement.ice,
    class: HeroClass.warrior,
    heroSpecific: ['targetProvoked'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (inputValues.targetProvoked ? 0.5 : 0),
        multTip: () => ({ targetProvoked: 50 }), // TODO: translate targetProvoked
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
    heroSpecific: ['casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.025,
        flatTip: () => ({ casterMaxHP: 2.5 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.3 : 1.5,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.05,
        flatTip: () => ({ casterMaxHP: 5 }),
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
    heroSpecific: ['casterCurrentHPPercent'],
    dot: [DoT.bleed],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.0015,
        multTip: () => ({ caster_lost_hp_pc: 15 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.25 : 1,
        pow: () => 1.05,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (100 - inputValues.casterCurrentHPPercent) * 0.002,
        multTip: () => ({ caster_lost_hp_pc: 20 }),
        enhance: [0.1, 0, 0, 0, 0.15],
        isAOE: () => true,
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.1,
        pow: () => 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        isAOE: () => true,
      })
    }
  }),
  tieria: new Hero({
    element: HeroElement.fire,
    class: HeroClass.warrior,
    baseAttack: 839,
    baseHP: 5517,
    baseDefense: 591,
    heroSpecific: ['targetMaxHP'],
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
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetFinalMaxHP() * (soulburn ? 0.06 : 0.04),
        flatTip: (soulburn: boolean) => ({ targetMaxHP: soulburn ? 6 : 4 }),
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
    heroSpecific: ['casterSpeed'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => {
      let boost = 1.0;
      for (let i = 0; i < inputValues.molagoras2; i++) {
        boost += Heroes['top_model_luluca'].skills.s2.enhance[i];
      }

      return 55 * boost * 60;
    },
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        ignoreDamageTransfer: () => true,
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        enhance: [0.05, 0.1, 0, 0.1, 0.15],
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2 : 1.6,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.0015,
        multTip: () => ({ casterSpeed: 0.15 }),
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
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 1,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.04,
        flatTip: () => ({ casterMaxHP: 4 }),
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
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.12,
    heroSpecific: ['targetCurrentHPPercent', 'casterFightingSpirit', 'casterMaxHP'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: (soulburn: boolean) => soulburn ? 1.7 : 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + (1 - (inputValues.targetCurrentHPPercent / 100)) * 0.3,
        multTip: () => ({ target_lost_hp_pc: 30 }),
        isSingle: () => true,
        soulburn: true
      }),
      s1_bis: new Skill({
        name: 'ml_kayron_flash_slash',
        id: 's1_bis',
        rate: () => 0.85,
        pow: () => 1,
        enhanceFrom: 's1',
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        fixed: (hitType: HitType, inputValues: DamageFormData) => (hitType !== HitType.miss) ? (2000 + Math.min(80 * inputValues.casterFightingSpirit, 8000)) : 0,
        fixedTip: (fixedDamage: number) => ({ caster_rage_flat: fixedDamage }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      }),
    }
  }),
  tywin: new Hero({
    element: HeroElement.ice,
    class: HeroClass.knight,
    baseAttack: 821,
    baseHP: 6751,
    baseDefense: 648,
    heroSpecific: ['casterMaxHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.8,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.04,
        flatTip: () => ({ casterMaxHP: 4 }),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        isAOE: () => true,
      })
    }
  }),

  unbound_knight_arowell: new Hero({
    element: HeroElement.light,
    class: HeroClass.knight,
    baseAttack: 758,
    baseHP: 5826,
    baseDefense: 672,
    heroSpecific: ['casterMaxHP', 'skillTreeCompleted'],
    barrierSkills: ['Passive', 'S3'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.15,
    barrier2: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.2,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.05,
        flatTip: () => ({casterMaxHP: 5}),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        // rate: () => 0.75, // This looks like it was just updated on the sheet as well
        hpScaling: true,
        rate: () => 0.7,
        pow: () => 0.95,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.15,
        flatTip: () => ({casterMaxHP: 15}),
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted ? 1.1 : 1,
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
    heroSpecific: ['casterMaxHP', 'casterHasBzzt', 'targetInjuries'],
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => (soulburn ? 0.8 : 0.5),
        pow: () => 1,
        fixed: (hitType: HitType, inputValues: DamageFormData) => inputValues.casterHasBzzt ? 2000 : 0,
        fixedTip: () => ({ caster_has_bzzt: 2000 }),
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * (soulburn ? 0.16 : 0.1),
        flatTip: (soulburn: boolean) => ({ casterMaxHP: soulburn ? 16 : 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        fixed: (hitType: HitType, inputValues: DamageFormData) => inputValues.casterHasBzzt ? 2000 : 0,
        fixedTip: () => ({ caster_has_bzzt: 2000 }),
        afterMath: () => new AftermathSkill({ injuryPercent: 0.6 }),
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.25,
        flatTip: () => ({ casterMaxHP: 25 }),
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
    heroSpecific: ['numberOfTargets', 'skillTreeCompleted'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { skill_tree: 10 } : null),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.8,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
          switch (inputValues.numberOfTargets) {
          case 3: return 1.2;
          case 2: return 1.4;
          case 1: return 1.6;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 20 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.8,
        pow: () => 1.05,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted ? 1.1 : 1,
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
    heroSpecific: ['targetBombDetonate'],
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
    heroSpecific: ['skillTreeCompleted'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted ? (1.1 + (inputValues.elementalAdvantage ? 0.25 : 0)) : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? ({
          skill_tree: 10,
          ...(inputValues.elementalAdvantage ? { elementalAdvantage: 25 } : {}),
        }) : null),
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.05, 0.1],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 2.2 : 1.5,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted && inputValues.elementalAdvantage ? 1.25 : 1,
        multTip: () => ({ elementalAdvantage: 25 }),
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
    heroSpecific: ['exclusiveEquipment2', 'casterSpeed'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        rate: () => 0.9,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.00075,
        multTip: () => ({ casterSpeed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 0.7,
        pow: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        speedScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.1 : 0.85,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFinalSpeed() * 0.001125,
        multTip: () => ({ casterSpeed: 0.1125 }),
        exclusiveEquipmentMultiplier: (inputValues: DamageFormData) => inputValues.exclusiveEquipment2 ? 0.1 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),

  violet: new Hero({
    element: HeroElement.earth,
    class: HeroClass.thief,
    baseAttack: 1228,
    baseHP: 6266,
    baseDefense: 473,
    heroSpecific: ['casterFocus', 'casterPerception'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 1 + inputValues.casterFocus * 0.15,
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
        isAOE: () => true,
      }),
      s2_wave_2: new Skill({
        id: 's2_wave_2',
        name: 's2_wave_2',
        rate: () => 0.55,
        pow: () => 0.9,
        enhanceFrom: 's2',
        isAOE: () => true,
      }),
      s2_wave_3: new Skill({
        id: 's2_wave_3',
        name: 's2_wave_3',
        rate: () => 0.3,
        pow: () => 0.9,
        enhanceFrom: 's2',
        isAOE: () => true,
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetTargeted ? 1.35 : 1,
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
        rate: () => 2,
        pow: () => 0.8,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),
  wandering_prince_cidd: new Hero({
    element: HeroElement.light,
    class: HeroClass.mage,
    baseAttack: 1021,
    baseHP: 5474,
    baseDefense: 610,
    heroSpecific: ['targetBombDetonate'],
    dot: [DoT.bomb],
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
        name: 'wandering_prince_cidd_continuous_strike',
        rate: () => 0.6,
        pow: () => 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0,
        pow: () => 0,
        detonate: [DoT.bomb],
        detonation: () => 1.1,
        isSingle: () => false,
      }),
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
        isAOE: () => true,
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
        name: 'yoonryoung_slash',
        rate: () => 0.5,
        pow: () => 1,
        enhanceFrom: 's1',
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
    heroSpecific: ['exclusiveEquipment2', 'targetSilenced'],
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
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 2,
        pow: () => 0.95,
        penetrate: (soulburn: boolean, inputValues: DamageFormData) => inputValues.targetSilenced ? 0.7 : 0,
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        isSingle: () => true,
      })
    }
  }),

  yulha: new Hero({
    element: HeroElement.earth,
    class: HeroClass.knight,
    baseAttack: 894,
    baseHP: 6840,
    baseDefense: 694,
    heroSpecific: ['casterMaxHP', 'casterCurrentHP'],
    barrier: (hero: Hero, skill: Skill, artifact: Artifact, inputValues: DamageFormData, attackMultiplier: number) => inputValues.casterFinalMaxHP(artifact) * 0.35,
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({casterMaxHP: 10}),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => 0.31 * Math.max(inputValues.casterFinalMaxHP(artifact) - inputValues.casterCurrentHP, 0),
        flatTip: () => ({caster_lost_hp: 31}),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noCrit: true,
        ignoreDamageTransfer: () => true,
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
    heroSpecific: ['exclusiveEquipment3'],
    skills: {
      s1: new Skill({
        id: 's1',
        speedScaling: true,
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.15 : 0.9,
        pow: () => 0.8,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        isAOE: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.8,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => {
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
        isAOE: () => true,
      })
    }
  }),
  zahhak: new Hero({
    element: HeroElement.earth,
    class: HeroClass.warrior,
    baseAttack: 1177,
    baseHP: 5542,
    baseDefense: 553,
    heroSpecific: ['targetHasBuff'],
    skills: {
      s1: new Skill({
        id: 's1',
        soulburn: true,
        rate: (soulburn: boolean) => soulburn ? 1.8 : 1.1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasBuff ? 1.3 : 1,
        multTip: () => ({ targetHasBuff: 30 }),
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
    heroSpecific: ['skillTreeCompleted', 'targetHasBuff'],
    skills: {
      s1: new Skill({
        id: 's1',
        rate: () => 1,
        pow: () => 1,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted && !inputValues.targetHasBuff ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { target_has_no_buff: 10 } : null),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s2: new Skill({
        id: 's2',
        rate: () => 1.5,
        pow: () => 1.05,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted && !inputValues.targetHasBuff ? 1.1 : 1,
        multTip: (inputValues: DamageFormData) => (inputValues.skillTreeCompleted ? { target_has_no_buff: 10 } : null),
        enhance: [0.1, 0, 0, 0, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1.5,
        pow: () => 0.95,
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.skillTreeCompleted && !inputValues.targetHasBuff ? 1.1 : 1,
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
    heroSpecific: ['casterMaxHP', 'nonAttackSkillStack'],
    heroSpecificMaximums: {'nonAttackSkillStack': 8},
    skills: {
      s1: new Skill({
        id: 's1',
        hpScaling: true,
        rate: () => 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.1,
        flatTip: () => ({ casterMaxHP: 10 }),
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
        rate: 0.5,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.casterFinalMaxHP(artifact) * 0.12,
        flatTip: () => ({ casterMaxHP: 12 }),
        mult: (molagoras: Record<string, number>, inputValues: DamageFormData) => {
          let extra = 0;
          for (let i = 0; i < inputValues.molagoras2; i++) {
            extra += Heroes.zeno.skills.s2.enhance[i];
          }

          return 1 + inputValues.nonAttackSkillStack * (0.07 + extra);
        },
        multTip: (inputValues: DamageFormData) => {
          let extra = 0;
          for (let i = 0; i < inputValues.molagoras2; i++) {
            extra += Heroes.zeno.skills.s2.enhance[i] * 100;
          }

          return { per_stack: 7 + extra };
        },
        enhance: [0.05, 0, 0.1, 0, 0.15],
        isAOE: () => true,
      })
    }
  }),
  zerato: new Hero({
    element: HeroElement.ice,
    class: HeroClass.mage,
    baseAttack: 1159,
    baseHP: 4733,
    baseDefense: 627,
    heroSpecific: ['targetHasDebuff'],
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
        mult: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetHasDebuff ? 1.3 : 1,
        multTip: () => ({ targetHasDebuff: 30 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 1,
        pow: () => 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        isAOE: () => true,
      })
    }
  }),
  zio: new Hero({
    element: HeroElement.dark,
    class: HeroClass.mage,
    heroSpecific: ['targetCurrentHP'],
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
        name: 'zio_disappear',
        rate: () => 1,
        pow: () => 1,
        penetrate: () => 0.5,
        enhanceFrom: 's1',
        isSingle: () => true,
      }),
      s3: new Skill({
        id: 's3',
        rate: () => 0.2,
        pow: () => 1,
        flat: (soulburn: boolean, inputValues: DamageFormData, artifact: Artifact) => inputValues.targetCurrentHP * 0.1875,
        flatTip: () => ({ targetCurrentHP: 18.75 }),
        penetrate: () => 1,
        noCrit: true,
        isSingle: () => true,
      }),
    }
  }),
};
