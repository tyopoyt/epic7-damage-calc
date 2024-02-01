const elements = {
  extra_dual_or_counter: {
    ref: 'extra_dual_or_counter',
    id: 'extra-dual-or-counter',
    label: 'Extra, Dual, or Counter attack',
    type: 'checkbox',
    value: () => {
      return document.getElementById('extra-dual-or-counter')?.checked
    }
  },
  nb_targets: {
    ref: 'nb_targets',
    id: 'nb-targets',
    label: 'Number of enemies',
    type: 'slider',
    min: 1,
    max: 9,
    default: 4,
    readonly: true,
    value: () => Number(document.getElementById('nb-targets').value)
  },
  nb_hits: {
    ref: 'nb_hits',
    id: 'nb-hits',
    label: 'Number of hits',
    type: 'slider',
    min: 1,
    max: 3,
    default: 1,
    readonly: true,
    value: () => Number(document.getElementById('nb-hits').value)
  },
  target_attack: {
    ref: 'target_attack',
    id: 'target-attack',
    label: 'Target Attack',
    type: 'slider',
    min: 200,
    max: 10000,
    default: 2000,
    value: () => {
      let atkMod = 1
      + Number(elements.target_atk_up.value() ? 0.5 : 0)
      + Number(elements.target_atk_up_great.value() ? 0.75 : 0)
      + Number(elements.target_atk_down.value() ? -0.5 : 0)
      + Number(document.getElementById('target-vigor').checked ? 0.3 : 0);

      return Number(document.getElementById('target-attack').value) * atkMod;
    }
  },
  target_atk_up: {
    ref: 'target_atk_up',
    id: 'target-atk-up',
    label: 'Target has Increased Attack',
    type: 'checkbox',
    value: () => document.getElementById('target-atk-up').checked,
    icon: './assets/buffs/attack-buff.png'
  },
  target_atk_up_great: {
    ref: 'target_atk_up_great',
    id: 'target-atk-up-great',
    label: 'Target has Increased Attack (Great)',
    type: 'checkbox',
    value: () => document.getElementById('target-atk-up-great').checked,
    icon: './assets/buffs/greater-attack-buff.png'
  },
  target_atk_down: {
    ref: 'target_atk_down',
    id: 'target-atk-down',
    label: 'Target has Decreased Attack',
    type: 'checkbox',
    value: () => document.getElementById('target-atk-down').checked,
    icon: './assets/debuffs/attack-debuff.png'
  },
  target_current_hp: { // TODO: Translate to other languages
    ref: 'target_current_hp',
    id: 'target-current-hp',
    label: 'Target\'s Current HP',
    type: 'slider',
    min: 1000,
    max: 50000,
    default: () => {
      const defPreset = document.getElementById('def-preset');
      return defPreset.value ? defPreset.options[defPreset.selectedIndex].dataset.hp : 10000;
    },
    value: () => Number(document.getElementById('target-current-hp').value)
  },
  target_max_hp: {
    ref: 'target_max_hp',
    id: 'target-max-hp',
    label: 'Target\'s Max HP',
    type: 'slider',
    min: 1000,
    max: 50000,
    default: () => {
      const defPreset = document.getElementById('def-preset');
      return defPreset.value ? defPreset.options[defPreset.selectedIndex].dataset.hp : 10000;
    },
    value: () => {
      const defPreset = document.getElementById('def-preset');
      return (defPreset.value === 'caides-13') ? Number(document.getElementById('target-max-hp').value / 2) : Number(document.getElementById('target-max-hp').value);
    }

  },
  target_injuries: {
    ref: 'target_injuries',
    id: 'target-injuries',
    label: 'Target\'s Injuries',
    type: 'slider',
    min: 0,
    max: 50000,
    default: () => 0,
    value: () => Number(document.getElementById('target-injuries').value)
  },
  target_is_highest_max_hp: {
    ref: 'target_is_highest_max_hp',
    id: 'target-is-highest-max-hp',
    label: 'Target is Highest max HP',
    type: 'checkbox',
    value: () => document.getElementById('target-is-highest-max-hp').checked
  },
  target_hp_pc: {
    ref: 'target_hp_pc',
    id: 'target-hp-pc',
    label: 'Target\'s HP %',
    type: 'slider',
    percent: true,
    min: 1,
    max: 100,
    default: 100,
    readonly: true,
    value: () => Number(document.getElementById('target-hp-pc').value)
  },
  target_hp: {
    ref: 'target_hp',
    id: 'target-hp',
    label: 'Targets\'s HP',
    type: 'slider',
    min: 1000,
    max: 50000,
    default: 10000,
    value: () => Number(document.getElementById('target-hp').value)
  },
  target_speed: {
    ref: 'target_speed',
    id: 'target-speed',
    label: 'Targets\'s Speed',
    type: 'slider',
    min: 70,
    max: 350,
    default: 150,
    value: () => Number(document.getElementById('target-speed').value)
  },
  target_nb_buff: {
    ref: 'target_nb_buff',
    id: 'target-nb-buff',
    label: 'Buffs on Targets',
    type: 'slider',
    min: 0,
    max: 9,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('target-nb-buff').value)
  },
  target_nb_debuff: {
    ref: 'target_nb_debuff',
    id: 'target-nb-debuff',
    label: 'Debuffs on Targets',
    type: 'slider',
    min: 0,
    max: 10,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('target-nb-debuff').value)
  },
  target_has_buff: {
    ref: 'target_has_buff',
    id: 'target-has-buff',
    label: 'Target has buffs',
    type: 'checkbox',
    value: () => document.getElementById('target-has-buff').checked
  },
  target_has_debuff: {
    ref: 'target_has_debuff',
    id: 'target-has-debuff',
    label: 'Target has debuffs',
    type: 'checkbox',
    value: () => document.getElementById('target-has-debuff')?.checked
  },
  target_has_bleed: {
    ref: 'target_has_bleed',
    id: 'target-has-bleed',
    label: 'Target has Bleed',
    type: 'checkbox',
    value: () => document.getElementById('target-has-bleed').checked,
    icon: './assets/bleed-debuff.png'
  },
  target_has_sleep: {
    ref: 'target_has_sleep',
    id: 'target-has-sleep',
    label: 'Target has Sleep',
    type: 'checkbox',
    value: () => document.getElementById('target-has-sleep').checked,
    icon: './assets/debuffs/sleep-debuff.png'
  },
  target_has_provoke: {
    ref: 'target_has_provoke',
    id: 'target-has-provoke',
    label: 'Target is Provoked',
    type: 'checkbox',
    value: () => document.getElementById('target-has-provoke').checked,
    icon: './assets/debuffs/provoke-debuff.png'
  },
  target_has_target: {
    ref: 'target_has_target',
    value: () => document.getElementById('target').checked,
  },
  target_is_stunned: {
    ref: 'target_is_stunned',
    id: 'target-is-stunned',
    label: 'Target is stunned',
    type: 'checkbox',
    value: () => document.getElementById('target-is-stunned').checked,
    icon: './assets/debuffs/stun-debuff.png'
  },
  target_silenced: {
    ref: 'target_silenced',
    id: 'target-silenced',
    label: 'Target is Silenced',
    type: 'checkbox',
    value: () => document.getElementById('target-silenced').checked,
    icon: './assets/debuffs/silence-debuff.png'
  },
  target_has_barrier: {
    ref: 'target_has_barrier',
    id: 'target-has-barrier',
    label: 'Target has Barrier',
    type: 'checkbox',
    value: () => document.getElementById('target-has-barrier').checked,
    icon: './assets/buffs/barrier-buff.png'
  },
  target_magic_nailed: {
    ref: 'target_magic_nailed',
    id: 'target-magic-nailed',
    label: 'Magic Nail on Target',
    type: 'checkbox',
    value: () => document.getElementById('target-magic-nailed').checked,
    icon: './assets/debuffs/nail-debuff.png'
  },
  target_nb_bleed: {
    ref: 'target_nb_bleed',
    id: 'target-nb-bleed',
    label: 'Number of Bleed on target',
    type: 'slider',
    min: 0,
    max: 9,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('target-nb-bleed').value),
    icon: './assets/debuffs/bleed-debuff.png'
  },
  target_bleed_detonate: {
    ref: 'target_bleed_detonate',
    id: 'target-bleed-detonate',
    label: 'Bleed effects to Detonate',
    type: 'slider',
    min: 0,
    max: 10,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('target-bleed-detonate').value),
    icon: './assets/debuffs/bleed-debuff.png'
  },
  target_burn_detonate: {
    ref: 'target_burn_detonate',
    id: 'target-burn-detonate',
    label: 'Burn effects to Detonate',
    type: 'slider',
    min: 0,
    max: 10,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('target-burn-detonate').value),
    icon: './assets/debuffs/burn-debuff.png'
  },
  target_bomb_detonate: {
    ref: 'target_bomb_detonate',
    id: 'target-bomb-detonate',
    label: 'Bomb effects to Detonate',
    type: 'slider',
    min: 0,
    max: 10,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('target-bomb-detonate').value),
    icon: './assets/debuffs/bomb-debuff.png'
  },
  caster_max_hp: {
    ref: 'caster_max_hp',
    id: 'caster-max-hp',
    label: 'Caster\'s Max HP',
    type: 'slider',
    min: 1000,
    max: 50000,
    default: 10000,
    value: () => {
      if (currentHero.hp) {
        return currentHero.getHP();
      }

      const artifactObject = artifacts[currentArtifact.id];
      const artifactHP = (artifactObject?.type === artifactDmgType.health_only && artifactObject.scale?.length) ? artifactObject.scale[Math.floor(inputValues['artifact-lvl']/3)] : (artifactObject?.maxHP || 1);

      return Number(document.getElementById('caster-max-hp').value) * artifactHP;
    }
  },
  caster_hp_pc: {
    ref: 'caster_hp_pc',
    id: 'caster-hp-pc',
    label: 'Caster\'s HP %',
    type: 'slider',
    percent: true,
    min: 1,
    max: 100,
    default: 100,
    readonly: true,
    value: () => Number(document.getElementById('caster-hp-pc').value)
  },
  caster_hp: {
    ref: 'caster_hp',
    id: 'caster-hp',
    label: 'Caster\'s HP',
    type: 'slider',
    min: 1000,
    max: 50000,
    default: 10000,
    value: () => Number(document.getElementById('caster-hp').value)
  },
  caster_elemental_wisdom_stack: {
    ref: 'caster_elemental_wisdom_stack',
    id: 'caster-elemental-wisdom-stack',
    label: 'Elemental Wisdom Stack',
    type: 'slider',
    min: 0,
    max: 3,
    default: 0,
    value: () => Number(document.getElementById('caster-elemental-wisdom-stack').value)
  },
  soulburn_stack: {
    ref: 'soulburn_stack',
    id: 'soulburn-stack',
    label: 'Soulburn Stack',
    type: 'slider',
    min: 0,
    max: 2,
    default: 0,
    value: () => Number(document.getElementById('soulburn-stack').value)
  },
  caster_hp_above_50pc: {
    ref: 'caster_hp_above_50pc',
    id: 'caster-hp-above-50pc',
    label: 'Caster\'s HP above 50%',
    type: 'checkbox',
    value: () => document.getElementById('caster-hp-above-50pc').checked,
    default: true,
  },
  caster_below_30_percent_hp: {
    ref: 'caster_below_30_percent_hp',
    id: 'caster-below-30-percent-hp',
    label: 'Caster\'s HP below 30%',
    type: 'checkbox',
    value: () => document.getElementById('caster-below-30-percent-hp').checked,
    default: false,
  },
  target_defense: {
    ref: 'target_defense',
    id: 'def',
    label: 'Defense',
    type: 'slider',
    min: 200,
    max: 5000,
    default: 750,
    value: () => Number(document.getElementById('def').value) * (getGlobalDefMult() + inputValues.defPcUp / 100),
  },
  caster_defense: {
    ref: 'caster_defense',
    id: 'caster-defense',
    label: 'Caster\'s Defense',
    type: 'slider',
    min: 200,
    max: 5000,
    default: 750,
    value: () => {
      if (currentHero.def) {
        return currentHero.getDef();
      }
      return Number(document.getElementById('caster-defense').value)
      * (1 + (elements.caster_defense_up.value() ? battleConstants.defUp : 0)
         + (document.getElementById('vigor').checked ? battleConstants.vigor - 1 : 0)
         + (document.getElementById('caster-fury')?.checked ? battleConstants['caster-fury'] - 1 : 0)
         + (document.getElementById('caster-has-trauma')?.checked ? battleConstants['trauma'] : 0));
    }
  },
  caster_defense_up: {
    ref: 'caster_defense_up',
    id: 'caster-defense-up',
    label: 'Increased Defense',
    type: 'checkbox',
    value: () => document.getElementById('caster-defense-up').checked,
    icon: './assets/buffs/defense-buff.png'
  },
  caster_speed: {
    ref: 'caster_speed',
    id: 'caster-speed',
    label: 'Caster\'s Speed',
    type: 'slider',
    min: 70,
    max: 350,
    default: 150,
    value: () => {
      if (currentHero.spd) {
        return currentHero.getSpd();
      }

      let spdUp = 1;

      if (currentHero.spdUp) {
        spdUp = currentHero.spdUp();
      }

      return Number(document.getElementById('caster-speed').value) * (elements.caster_speed_up.value() ? battleConstants.spdUp : 1) * spdUp;
    }
  },
  caster_speed_up: {
    ref: 'caster_speed_up',
    id: 'caster-speed-up',
    label: 'Increased Speed',
    type: 'checkbox',
    value: () => document.getElementById('caster-speed-up').checked,
    icon: './assets/buffs/speed-buff.png'
  },
  caster_nb_buff: {
    ref: 'caster_nb_buff',
    id: 'caster-nb-buff',
    label: 'Buffs on Caster',
    type: 'slider',
    min: 0,
    max: 9,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('caster-nb-buff').value)
  },
  allies_nb_buff: {
    ref: 'allies_nb_buff',
    id: 'allies-nb-buff',
    label: 'Buffs on All Allies',
    type: 'slider',
    min: 0,
    max: 25,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('allies-nb-buff').value)
  },
  caster_turn: {
    ref: 'caster_turn',
    id: 'caster-turn',
    label: 'Caster\'s Turn',
    type: 'checkbox',
    value: () => document.getElementById('caster-turn').checked
  },
  caster_has_buff: {
    ref: 'caster_has_buff',
    id: 'caster-has-buff',
    label: 'Caster has buff',
    type: 'checkbox',
    value: () => {
      let casterBuffChecked = false;
      for (const casterBuff of casterBuffs) {
        if (document.getElementById(casterBuff)?.checked) {
          casterBuffChecked = true;
          break;
        }
      }

      casterBuffElement = $('#caster-has-buff');
      if (casterBuffChecked) {
        casterBuffElement.prop('checked', true);
        casterBuffElement.attr('disabled', true);
      } else {
        casterBuffElement.removeAttr('disabled');
      }

      return casterBuffElement.prop('checked');
    }
  },
  caster_has_bzzt: {
    ref: 'caster_has_bzzt',
    id: 'caster-has-bzzt',
    label: 'Caster has Bzzt!',
    type: 'checkbox',
    value: () => document.getElementById('caster-has-bzzt').checked,
    icon: './assets/buffs/bzzt-buff.png'
  },
  caster_has_cascade: {
    ref: 'caster_has_cascade',
    id: 'caster-has-cascade',
    label: 'Cascade',
    type: 'checkbox',
    value: () => document.getElementById('caster-has-cascade').checked,
    icon: './assets/buffs/cascade-buff.png'
  },
  caster_has_debuff: {
    ref: 'caster_has_debuff',
    id: 'caster-has-debuff',
    label: 'Caster has debuffs',
    type: 'checkbox',
    value: () => document.getElementById('caster-has-debuff').checked
  },
  caster_has_flame_alchemist: {
    ref: 'caster_has_flame_alchemist',
    id: 'caster-has-flame-alchemist',
    label: 'Caster has Flame Alchemist',
    type: 'checkbox',
    value: () => document.getElementById('caster-has-flame-alchemist').checked,
    icon: './assets/buffs/flame-alchemist-buff.png'
  },
  caster_has_stars_blessing: {
    ref: 'caster_has_stars_blessing',
    id: 'caster-has-stars-blessing',
    label: "Caster has Star's Blessing",
    type: 'checkbox',
    default: true,
    value: () => document.getElementById('caster-has-stars-blessing').checked,
    icon: './assets/buffs/stars-blessing-buff.png'
  },
  caster_has_multilayer_barrier: {
    ref: 'caster_has_multilayer_barrier',
    id: 'caster-has-multilayer-barrier',
    label: 'Caster has Multilayer Barrier',
    type: 'checkbox',
    value: () => document.getElementById('caster-has-multilayer-barrier').checked,
    icon: './assets/buffs/multilayer-barrier-buff.png'
  },
  caster_has_neo_phantom_sword: {
    ref: 'caster_has_neo_phantom_sword',
    id: 'caster-has-neo-phantom-sword',
    label: 'Caster has Neo Phantom Sword',
    type: 'checkbox',
    value: () => document.getElementById('caster-has-neo-phantom-sword')?.checked,
    icon: './assets/buffs/neo-phantom-sword-buff.png'
  },
  caster_full_focus: {
    ref: 'caster_full_focus',
    id: 'caster-full-focus',
    label: 'Full Focus',
    type: 'checkbox',
    value: () => document.getElementById('caster-full-focus').checked
  },
  caster_full_fighting_spirit: {
    ref: 'caster_full_fighting_spirit',
    id: 'caster-full-fighting-spirit',
    label: 'Full Fighting Spirit',
    type: 'checkbox',
    value: () => document.getElementById('caster-full-fighting-spirit').checked
  },
  caster_nb_focus: {
    ref: 'caster_nb_focus',
    id: 'caster-nb-focus',
    label: 'Focus',
    type: 'slider',
    min: 0,
    max: 5,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('caster-nb-focus').value)
  },
  caster_fighting_spirit: {
    ref: 'caster_fighting_spirit',
    id: 'caster-fighting-spirit',
    label: 'Fighting Spirit',
    type: 'slider',
    min: 0,
    max: 100,
    default: 0,
    step: 5,
    readonly: true,
    value: () => Number(document.getElementById('caster-fighting-spirit').value)
  },
  caster_invincible: {
    ref: 'caster_invincible',
    id: 'caster-invincible',
    label: 'Caster is Invincible',
    type: 'checkbox',
    value: () => document.getElementById('caster-invincible').checked,
    icon: './assets/buffs/invincible-buff.png'
  },
  caster_perception: {
    ref: 'caster_perception',
    id: 'caster-perception',
    label: 'Caster has Perception',
    type: 'checkbox',
    value: () => document.getElementById('caster-perception') ? document.getElementById('caster-perception').checked : false,
    icon: './assets/buffs/perception-buff.png'
  },
  caster_possession: {
    ref: 'caster_possession',
    id: 'caster-possession',
    label: 'Caster has Possession',
    type: 'checkbox',
    value: () => document.getElementById('caster-possession') ? document.getElementById('caster-possession').checked : false,
    icon: './assets/buffs/possession-buff.png'
  },
  caster_vigor: {
    value: () => document.getElementById('vigor') ? document.getElementById('vigor').checked : false,
  },
  caster_enrage: {
    ref: 'caster_enrage',
    id: 'caster-enrage',
    label: 'Caster has Rage',
    type: 'checkbox',
    value: () => document.getElementById('caster-enrage') ? document.getElementById('caster-enrage').checked : false,
    icon: './assets/buffs/rage-buff.png'
  },
  caster_fury: {
    ref: 'caster_fury',
    id: 'caster-fury',
    label: 'Caster has Fury',
    type: 'checkbox',
    value: () => document.getElementById('caster-fury') ? document.getElementById('caster-fury').checked : false,
    icon: './assets/buffs/rage-buff.png'
  },
  caster_immense_power: {
    ref: 'caster_immense_power',
    id: 'caster-immense-power',
    label: 'Caster has Immense Power',
    type: 'checkbox',
    value: () => document.getElementById('caster-immense-power')
      ? document.getElementById('caster-immense-power').checked
      : false,
  },
  caster_has_trauma: {
    ref: 'caster_has_trauma',
    id: 'caster-has-trauma',
    label: 'Caster has Trauma',
    type: 'checkbox',
    value: () => document.getElementById('caster-has-trauma')
      ? document.getElementById('caster-has-trauma').checked
      : false,
    icon: './assets/debuffs/trauma-debuff.png'
  },
  caster_stealth: {
    ref: 'caster_stealth',
    id: 'caster-stealth',
    label: 'Caster has Stealth',
    type: 'checkbox',
    value: () => document.getElementById('caster-stealth').checked,
    icon: './assets/buffs/stealth-buff.png'
  },
  critical_hit_stack: {
    ref: 'critical_hit_stack',
    id: 'critical-hit-stack',
    label: 'Critical Hit Stack',
    type: 'slider',
    min: 0,
    max: 50,
    default: 0,
    value: () => Number(document.getElementById('critical-hit-stack').value)
  },
  critical_hit_stack_12: {
    ref: 'critical_hit_stack_12',
    id: 'critical-hit-stack-12',
    label: 'Critical Hit Stack',
    type: 'slider',
    min: 0,
    max: 12,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('critical-hit-stack-12').value)
  },
  critical_hit_stack_8: {
    ref: 'critical_hit_stack_8',
    id: 'critical-hit-stack-8',
    label: 'Critical Hit Stack',
    type: 'slider',
    min: 0,
    max: 8,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('critical-hit-stack-8').value)
  },
  critical_hit_stack_6: {
    ref: 'critical_hit_stack_6',
    id: 'critical-hit-stack-6',
    label: 'Critical Hit Stack',
    type: 'slider',
    min: 0,
    max: 6,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('critical-hit-stack-6').value)
  },
  non_attack_skill_stack_8: {
    ref: 'non_attack_skill_stack_8',
    id: 'stack-non-attack-skill-8',
    label: 'Non-Attack Skill Stack',
    type: 'slider',
    min: 0,
    max: 8,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('stack-non-attack-skill-8').value)
  },
  non_attack_skill_stack_10: {
    ref: 'non_attack_skill_stack_10',
    id: 'stack-non-attack-skill-10',
    label: 'Non-Attack Skill Stack',
    type: 'slider',
    min: 0,
    max: 10,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('stack-non-attack-skill-10').value)
  },
  single_attack_stack_3: {
    ref: 'single_attack_stack_3',
    id: 'single-stack-skill-3',
    label: 'Single Attack Stack',
    type: 'slider',
    min: 0,
    max: 3,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('single-stack-skill-3').value)
  },
  dual_attack_stack_5: {
    ref: 'dual_attack_stack_5',
    id: 'dual-stack-skill-5',
    label: 'Dual Attack Stack',
    type: 'slider',
    min: 0,
    max: 5,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('dual-stack-skill-5').value)
  },
  attack_skill_stack_3: {
    ref: 'attack_skill_stack_3',
    id: 'stack-attack-skill-3',
    label: 'Attack Stack',
    type: 'slider',
    min: 0,
    max: 3,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('stack-attack-skill-3').value)
  },
  attack_skill_stack_5: {
    ref: 'attack_skill_stack_5',
    id: 'stack-attack-skill-5',
    label: 'Attack Stack',
    type: 'slider',
    min: 0,
    max: 5,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('stack-attack-skill-5').value)
  },
  attack_skill_stack_10: {
    ref: 'attack_skill_stack_10',
    id: 'stack-attack-skill-10',
    label: 'Attack Stack',
    type: 'slider',
    min: 0,
    max: 10,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('stack-attack-skill-10').value)
  },
  non_attack_skill_stack_3: {
    ref: 'non_attack_skill_stack_3',
    id: 'stack-non-attack-skill-3',
    label: 'Non-Attack Skill Stack',
    type: 'slider',
    min: 0,
    max: 3,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('stack-non-attack-skill-3').value)
  },
  turn_stack: {
    ref: 'turn_stack',
    id: 'turn-stack',
    label: 'Turn Stack',
    type: 'slider',
    min: 0,
    max: 20,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('turn-stack').value)
  },
  turn_stack_3: {
    ref: 'turn_stack_3',
    id: 'turn-stack-3',
    label: 'Turn Stack',
    type: 'slider',
    min: 0,
    max: 3,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('turn-stack-3').value)
  },
  turn_stack_10: {
    ref: 'turn_stack_10',
    id: 'turn-stack-10',
    label: 'Turn Stack',
    type: 'slider',
    min: 0,
    max: 10,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('turn-stack-10').value)
  },
  aoe_stack_5: {
    ref: 'aoe_stack_5',
    id: 'aoe-stack-5',
    label: 'AoE Attack Stack',
    type: 'slider',
    min: 0,
    max: 5,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('aoe-stack-5').value)
  },
  caster_attacked_stack_3: {
    ref: 'caster_attacked_stack_3',
    id: 'caster-attacked-stack-3',
    label: 'Caster Attacked Stack',
    type: 'slider',
    min: 0,
    max: 3,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('caster-attacked-stack-3').value)
  },
  caster_attacked_stack_5: {
    ref: 'caster_attacked_stack_5',
    id: 'caster-attacked-stack-5',
    label: 'Caster Attacked Stack',
    type: 'slider',
    min: 0,
    max: 5,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('caster-attacked-stack-5').value)
  },
  dead_people: {
    ref: 'dead_people',
    id: 'dead-people',
    label: 'People who died',
    type: 'slider',
    min: 0,
    max: 8,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('dead-people').value)
  },
  enemy_counters: {
    ref: 'enemy_counters',
    id: 'enemy-counters',
    label: 'Enemy Counter-attacks',
    type: 'slider',
    min: 0,
    max: 4,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('enemy-counters').value)
  },
  enemy_number_of_debuffs: {
    ref: 'enemy_number_of_debuffs',
    id: 'enemy-number-of-debuffs',
    label: 'Number of Debuffs on Enemies',
    type: 'slider',
    min: 0,
    max: 10,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('enemy-number-of-debuffs').value)
  },
  highest_ally_attack: {
    ref: 'highest_ally_attack',
    id: 'highest-ally-attack',
    label: 'Highest Ally Attack',
    type: 'slider',
    min: 200,
    max: 10000,
    default: 4000,
    value: () => Number(document.getElementById('highest-ally-attack').value)
        * (elements.ally_atk_up.value() ? 1.5 : 1)
        * (elements.ally_atk_up_great.value() ? 1.75 : 1),
  },
  ally_atk_up: {
    ref: 'ally_atk_up',
    id: 'ally-atk-up',
    label: 'Ally has Increased Attack',
    type: 'checkbox',
    value: () => document.getElementById('ally-atk-up').checked,
    icon: './assets/buffs/attack-buff.png'
  },
  ally_atk_up_great: {
    ref: 'ally_atk_up_great',
    id: 'ally-atk-up-great',
    label: 'Ally has Increased Attack (Great)',
    type: 'checkbox',
    value: () => document.getElementById('ally-atk-up-great').checked,
    icon: './assets/buffs/greater-attack-buff.png'
  },
  skill_tree_completed: {
    ref: 'skill_tree_completed',
    id: 'skill-tree-completed',
    label: 'Skill Tree Completed',
    type: 'checkbox',
    default: true,
    value: () => document.getElementById('skill-tree-completed').checked,
  },
  s3_on_cooldown: {
    ref: 's3_on_cooldown',
    id: 's3-on-cooldown',
    label: 'S3 on Cooldown',
    type: 'checkbox',
    default: true,
    value: () => document.getElementById('s3-on-cooldown').checked,
  },
  s3_stack: {
    ref: 's3_stack',
    id: 's3-stack',
    label: 'S3 Stack',
    type: 'slider',
    min: 0,
    max: 3,
    default: 0,
    readonly: true,
    value: () => Number(document.getElementById('s3-stack').value)
  },
  all_allies_fire: {
    ref: 'all_allies_fire',
    id: 'all-allies-fire',
    label: 'All Allies Fire',
    type: 'checkbox',
    value: () => document.getElementById('all-allies-fire').checked,
  },
  exclusive_equipment_1: {
    ref: 'exclusive_equipment_1',
    id: 'exclusive-equipment-1',
    label: 'Exclusive Equipment #1',
    type: 'checkbox',
    value: () => document.getElementById('exclusive-equipment-1').checked,
  },
  exclusive_equipment_2: {
    ref: 'exclusive_equipment_2',
    id: 'exclusive-equipment-2',
    label: 'Exclusive Equipment #2',
    type: 'checkbox',
    value: () => document.getElementById('exclusive-equipment-2').checked,
  },
  exclusive_equipment_3: {
    ref: 'exclusive_equipment_3',
    id: 'exclusive-equipment-3',
    label: 'Exclusive Equipment #3',
    type: 'checkbox',
    value: () => document.getElementById('exclusive-equipment-3').checked,
  },
  torrent_set_stack: {
    ref: 'torrent_set_stack',
    id: 'torrent-set-stack',
    label: 'Torrent Set',
    type: 'slider',
    min: 1,
    max: 3,
    default: 1,
    readonly: true,
    value: () => Number(document.getElementById('torrent-set-stack').value)
  },
  beehoo_passive: {
    ref: 'beehoo_passive',
    id: 'beehoo-passive',
    label: 'Beehoo on team',
    type: 'checkbox',
    default: () => hero.value === 'beehoo',
    value: () => document.getElementById('beehoo-passive').checked,
    icon: './assets/heroes/beehoo-icon.png'
  },
  enemy_defeated: {
    ref: 'enemy_defeated',
    id: 'enemy-defeated',
    label: 'Caster defeated an enemy',
    type: 'checkbox',
    default: true,
    value: () => document.getElementById('enemy-defeated').checked
  },
};

elements.caster_speed.sub_elements = [elements.caster_speed_up];
elements.caster_defense.sub_elements = [elements.caster_defense_up];
elements.highest_ally_attack.sub_elements = [elements.ally_atk_up, elements.ally_atk_up_great];
elements.target_attack.sub_elements = [elements.target_atk_up, elements.target_atk_up_great, elements.target_atk_down];

const slide = (fieldId) => {
  const slideValue = document.getElementById(`${fieldId}-slide`).value;
  document.getElementById(fieldId).value = slideValue;
  if (fieldId === 'target-max-hp') {
    oneshotInput.value = slideValue;
    debounce('updateOneshotLine', updateOneshotLine);
  }
  resetPreset(fieldId);
  resolve();
};

const update = (fieldId) => {
  const slider = document.getElementById(`${fieldId}-slide`);
  const inputValue = Number(document.getElementById(fieldId).value);
  const sliderMin = Number(slider.getAttribute('min'));
  const sliderMax = Number(slider.getAttribute('max'));
  if (inputValue < sliderMin) {
    slider.value = sliderMin;
  } else if (inputValue > sliderMax) {
    slider.value = sliderMax;
  } else {
    slider.value = inputValue;
  }

  if (fieldId === 'target-max-hp') {
    oneshotInput.value = inputValue;
    debounce('updateOneshotLine', updateOneshotLine);
  }

  resolve();
};

const updateMolaBonus = (skillId) => {
  const hero = document.getElementById('hero').value;
  const skill = heroes[hero].skills[skillId];
  const enhancement = Number(document.getElementById(`molagora-${skillId}`).value);
  let val = 0;
  for (let i = 0; i < enhancement; i++) {
    val += skill.enhance[i] * 100;
  }
  document.getElementById(`molagora-${skillId}-percent`).textContent = val.toString();
};

const plus = (fieldId) => {
  const input = document.getElementById(fieldId);
  const max = input.getAttribute('max');
  const inc = Number(document.getElementById(`${fieldId}-slide`).getAttribute('step') || 1);
  if (max === null || Number(max) > input.value) {
    input.value = Number(input.value) + inc;
    update(fieldId);
    resetPreset(fieldId);
    resolve();
  }
};

const minus = (fieldId) => {
  const input = document.getElementById(fieldId);
  const min = input.getAttribute('min');
  const inc = Number(document.getElementById(`${fieldId}-slide`).getAttribute('step') || 1);
  if (min === null || Number(min) < input.value) {
    input.value = Number(input.value) - inc;
    update(fieldId);
    resetPreset(fieldId);
    resolve();
  }
};

// These mola functions are used in HTML Strings so eslint doesn't see it 
/* eslint-disable no-unused-vars  */
const slideMola = (skillId) => {
  slide(`molagora-${skillId}`);
  updateMolaBonus(skillId);
};

const plusMola = (skillId) => {
  plus(`molagora-${skillId}`);
  updateMolaBonus(skillId);
};

const minusMola = (skillId) => {
  minus(`molagora-${skillId}`);
  updateMolaBonus(skillId);
};
/* eslint-enable */

const resetPreset = (fieldId) => {
  if (fieldId === 'def') {
    $('#def-preset').selectpicker('val', '');
  } else if (fieldId === 'atk' || fieldId === 'crit') {
    $('#atk-preset').selectpicker('val', '');
  } else if (['dmg-reduc', 'dmg-trans', 'def-pc-up'].includes(fieldId)) {
    $('#dmg-reduc-preset').selectpicker('val', '');
  }
};

try {
  document.getElementById('def-pc-up').onchange = () => {
    resetPreset('def-pc-up');
  };
  document.getElementById('dmg-reduc').onchange = () => {
    resetPreset('dmg-reduc');
  };
  document.getElementById('dmg-trans').onchange = () => {
    resetPreset('dmg-trans');
  };
} catch (error) {
  // pass
}


const showHeroInfo = (hero) => {
  const block = document.getElementById('hero-info');
  block.innerHTML = '';

  if (hero.info) {
    block.innerHTML = `<div class="alert alert-info alert-dismissible fade show" role="alert">
                      ${hero.info}
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                   </div>`;
  }
};

const build = (hero) => {
  showHeroInfo(hero);
  const specificBlock = document.getElementById('custom-block');
  if (hero.dot?.includes(dot.burn)) {
    if (hero.form) {
      hero.form.push(elements.beehoo_passive);
    } else {
      hero.form = [elements.beehoo_passive];
    }
  }
  if (hero.form) {
    specificBlock.innerHTML = '';
    for (let elem of hero.form) {
      buildElement(elem, specificBlock);
    }
    specificBlock.parentElement.style.display = 'block';
  } else {
    specificBlock.parentElement.style.display = 'none';
  }

  const molagoraBlock = document.getElementById('molagora-block');
  molagoraBlock.innerHTML = '';
  for (let id of Object.keys(hero.skills)) {
    const skill = hero.skills[id];
    if (skill.enhance) {
      $(molagoraBlock).append(`<div class="form-group flex-centered row col-sm-12">
                        <label for="molagora-${id}" class="col-sm-12 col-md-1 col-form-label form-control-sm text-center mola-skill-label"><h5>${skillLabel(id)}</h5></label>
                        <div class="input-group input-group-sm col-md-2 col-sm-12">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-secondary" type="button" id="molagora-${id}-minus" onclick="minusMola('${id}')">&minus;</button>
                            </div>
                            <input type="number" class="form-control text-center" id="molagora-${id}" min="0" max="${skill.enhance.length}" value="${skill.enhance.length}" readonly onkeyup="update('molagora-${id}')">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" id="molagora-${id}-plus" onclick="plusMola('${id}')">&plus;</button>
                            </div>
                        </div>
                        <input id="molagora-${id}-slide" type="range" min="0" max="${skill.enhance.length}" class="custom-range col-md-${skill.enhance.length} col-sm-12 mt-3 mt-md-0 ml-2 ml-md-0" value="${skill.enhance.length}" oninput="slideMola('${id}')" />
                        <div class="col text-right molagora-badge">
                            <span class="badge badge-pill badge-dark">+<span id="molagora-${id}-percent">0</span>%</span>
                        </div>
                    </div>`);
      updateMolaBonus(id);
    }
  }
  
  document.getElementById('elem-adv-icon').innerHTML = antiElemIcon(hero.element);
};

const showArtifactInfo = (artifact) => {
  const block = document.getElementById('artifact-info');
  block.innerHTML = '';

  if (artifact.info) {
    block.innerHTML = `<div class="alert alert-info alert-dismissible fade show" role="alert">
                      <b>${artifactName(artifact.id)}</b>: ${artifact.info}
                   </div>`;
  }
};

const buildArtifact = (artifact) => {
  if (artifact) showArtifactInfo(artifact);
  const specificBlock = document.getElementById('artifact-custom-block');
  if (artifact && !artifact.form && !artifact.info) {
    specificBlock.innerHTML = '';
  }

  // add beehoo passive to arti if not already going to be added to hero
  if (!heroes[hero.value].dot?.includes(dot.burn) && artifact.dot?.includes(dot.burn)) {
    if (artifact.form) {
      artifact.form.push(elements.beehoo_passive);
    } else {
      artifact.form = [elements.beehoo_passive];
    }
  }

  if (!artifact || (!artifact.scale && !artifact.form?.length && !artifact.info)) {
    document.getElementById('artifact-block').style.display = 'none';
    return;
  }
  document.getElementById('artifact-block').style.display = 'block';
  document.getElementById('artifact-lvl-block').style.display = (artifact.scale !== undefined) ? 'block' : 'none';

  if (artifact.form) {
    specificBlock.innerHTML = '';
    for (let elem of artifact.form) {
      buildElement(elem, specificBlock);
    }
    specificBlock.style.display = 'block';
  } else {
    specificBlock.style.display = 'none';
  }
};

const refreshArtifactList = (hero) => {
  const artiSelector = document.getElementById('artifact');
  for (const artiOpt of artiSelector.querySelectorAll('option')) {
    if (!artiOpt.value) continue;
    const artiExclusive = artifacts[artiOpt.value].exclusive;
    const artiHeroExclusive = artifacts[artiOpt.value].hero_exclusive;
    artiOpt.disabled = (artiExclusive && artiExclusive !== hero.classType) || (artiHeroExclusive && !artiHeroExclusive.includes(hero.name));
  }
  if (artiSelector.options[artiSelector.selectedIndex].disabled) {
    artiSelector.value = '';
  }

  $('#artifact').selectpicker('refresh');
};

const buildElement = (elem, parent) => {
  if (elem.type === 'slider') {
    //TODO: fix the ugly elem.icon lines
    const defaultVal = typeof elem.default === 'function' ? elem.default() : elem.default;
    $(parent).append(`<div id="${elem.id}-block" class="stat-block">
                        <div class="form-group row col-sm-12">
                            <label for="crit" class="col-md-9 col-form-label form-control-sm">
                                <h5>${elem.icon ? '<img src="' + (['jp', 'kr', 'zh', 'zhTW', 'br'].some(locale => window.location.href.includes(`/${locale}`)) ? '.' : '') + elem.icon + '" width="20" height="20" /> ' : ''}${formLabel(elem.ref)}</h5>
                            </label>
                            <div class="input-group input-group-sm col-md-3">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary" type="button" id="${elem.id}-minus" onclick="minus('${elem.id}')">&minus;</button>
                                </div>
                                <input type="number" class="form-control text-center" id="${elem.id}" min="${elem.min}" max="${elem.max}" value="${defaultVal}" ${elem.readonly ? 'readonly' : ''} onkeyup="update('${elem.id}')">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="${elem.id}-plus" onclick="plus('${elem.id}')">&plus;</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row col-sm-12">
                            <input type="range" class="custom-range" id="${elem.id}-slide" min="${elem.min}" max="${elem.max}" value="${defaultVal}" step="${elem.step || 1}" oninput="slide('${elem.id}')">
                        </div>
                    </div>`);
    if (elem.id === 'target-max-hp') {
      oneshotInput.value = defaultVal;
      debounce('updateOneshotLine', updateOneshotLine);
    }
  } else if (elem.type === 'checkbox') {
    $(parent).append(`<div class="form-group col-sm-12">
                              <div class="custom-control custom-checkbox custom-control-inline buff-block">
                                  <input class="custom-control-input" type="checkbox" id="${elem.id}" value="1" onchange="resolve()" ${(typeof elem.default === 'function' ? elem.default() : elem.default === true) ? 'checked' : ''}>
                                  <label class="custom-control-label" for="${elem.id}">
                                    ${elem.icon ? '<img src="' + (['jp', 'kr', 'zh', 'zhTW', 'br'].some(locale => window.location.href.includes(`/${locale}`)) ? '.' : '') + elem.icon + '" width="20" height="20" />' : ''} ${formLabel(elem.ref)}
                                  </label>
                              </div>
                        </div>`);
  }

  if (elem.sub_elements) {
    for (let sub_elem of elem.sub_elements) {
      buildElement(sub_elem, parent);
    }
  }
};

const elemIcon = (elem) => {
  return `<img src='${['jp', 'kr', 'zh', 'zhTW', 'br'].some(locale => window.location.href.includes(`/${locale}`)) ? '.' : ''}./assets/elements/${elem}.png' width='20', height='20' alt='${elem}' />`;
};

const antiElemIcon = (elem) => {
  switch (elem) {
  case element.ice: return elemIcon(element.fire);
  case element.fire: return elemIcon(element.earth);
  case element.earth: return elemIcon(element.ice);
  case element.light: return elemIcon(element.dark);
  case element.dark: return elemIcon(element.light);
  }
};

const classIcon = (type) => {
  return `<img src='${['jp', 'kr', 'zh', 'zhTW', 'br'].some(locale => window.location.href.includes(`/${locale}`)) ? '.' : ''}./assets/classes/${type.replace('_', '-')}.png' width='18', height='18' alt='${type}' />`;
};

const dedupeForm = (hero, artifact) => {
  const heroElIds = (hero.form || []).map(element => element.id);
  const artiElIds = (artifact.form || []).map(element => element.id);
  const intersect = heroElIds.filter(id => artiElIds.includes(id));
  if (intersect.length > 0) {
    artifact.form = artifact.form.filter(element => !intersect.includes(element.id));
  }
};

const updateGraphSkillSelect = () => {
  const skillSelect = document.getElementById('chart-skill');
  const skill = heroes[inputValues.hero]?.skills[skillSelect.options[skillSelect.selectedIndex]?.value.replace('_soulburn', '') || 's1'];
  const soulburn = skillSelect.options[skillSelect.selectedIndex]?.value.endsWith('_soulburn');
  const onlyCrit = typeof(skill.onlyCrit) === 'function' ? skill.onlyCrit(soulburn) : skill.onlyCrit;

  if (skill.onlyMiss) {
    damageToUse = 'miss';
    $('#miss-hit').removeAttr('disabled');

    $('#normal-hit').attr('disabled', true);
    $('#crit-hit').attr('disabled', true);
    $('#crush-hit').attr('disabled', true);
  } else if (skill.noCrit) {
    damageToUse = 'normal';
    $('#crit-hit').attr('disabled', true);
    $('#crush-hit').attr('disabled', true);


    $('#miss-hit').removeAttr('disabled');
    $('#normal-hit').removeAttr('disabled');
  } else if (onlyCrit) {
    damageToUse = 'crit';
    $('#crit-hit').removeAttr('disabled');
    $('#miss-hit').removeAttr('disabled');

    $('#normal-hit').attr('disabled', true);
    $('#crush-hit').attr('disabled', true);
  } else {
    damageToUse = 'crit';

    $('#normal-hit').removeAttr('disabled');
    $('#crit-hit').removeAttr('disabled');
    $('#crush-hit').removeAttr('disabled');
    $('#miss-hit').removeAttr('disabled');
  }

  if (skill.noMiss) {
    $('#miss-hit').attr('disabled', true);
  }
        
  $(`#${damageToUse}-hit`).prop('checked', true);
};

// jQuery's $(() => {}) was not firing at the right time in Firefox, so use standard DOMContentLoaded
// window.addEventListener('DOMContentLoaded', () => {
buildInitialForm = () => {
  try {
    const heroSelector = document.getElementById('hero');
    const artiSelector = document.getElementById('artifact');
    const chartSkillSelector = document.getElementById('chart-skill');
    Object.keys(heroes).map((id => {
      $(heroSelector).append(`<option value="${id}" data-tokens="${heroNicknames(id)}" data-content="${elemIcon(heroes[id].element)}${classIcon(heroes[id].classType)}<span>${heroName(id)}</span>">${heroName(id)}</option>`);
    }));
    $(heroSelector).selectpicker('refresh');

    $(artiSelector).append(`<option value="">${artifactName('no_proc')}</option>`);
    $(artiSelector).append('<option data-divider="true"></option>');
    Object.keys(artifacts).map((id => {
      $(artiSelector).append(`<option value="${id}">${artifactName(id)}</option>`);
    }));

    // This is a bit clunky but the #1 alphabetical hero changes so rarely it's not much of an issue. So far it only changed from Achates to Abigail.
    // Unless they release a hero calld Aardvark or something it's not that likely to change again...
    const lang = document.getElementById('root').getAttribute('lang');
    s1Text = 'S1';
    s3Text = 'S3';
    if (lang !== 'en') {
      s1Text = i18n[lang].skills['s1'];
      s3Text = i18n[lang].skills['s3'];
    }
    $(chartSkillSelector).append(`<option value="s1" data-content="<span>${s1Text}</span>">${s1Text}</option>`);
    $(chartSkillSelector).append(`<option value="s3" data-content="<span>${s3Text}</span>">${s3Text}</option>`);
    $(chartSkillSelector).selectpicker('refresh');

    chartSkillSelector.onchange = () => {
      if (document.getElementById('damage-chart-container').style.display !== 'none') {
        // This one doesn't need to be debounced because it would be pretty difficult to change the select option quickly
        updateGraphSkillSelect();
        if (!loadingQueryParams) {
          updateQueryParams();
        }
        calculateChart(inputValues);
      }
    };

    heroSelector.onchange = () => {
      const hero = heroes[heroSelector.value];
      const artifact = { ...artifacts[artiSelector.value] };
      dedupeForm(hero, artifact);
      build(hero);
      refreshArtifactList(hero);
      buildArtifact(artifact);
      resolve();

      if (currentHero) {
        if (!loadingQueryParams) {
          deleteParams(heroes[currentHero.id].form?.map(element => element.id));
        }

        window.dataLayer.push({
          'event': 'select_hero',
          'hero': hero.name
        });
        refreshCompareBadge();
  
        $(chartSkillSelector).find('option').remove();
        Object.keys(heroes[currentHero.id].skills).map((id => {
          const skill = heroes[currentHero.id].skills[id];
          // use != to also catch null
          if (skill.rate != undefined) {
            skillText = skill.name ? skill.name : skillLabel(id);
            $(chartSkillSelector).append(`<option value="${id}" data-content="<span>${skillText}</span>">${skillText}</option>`);
          }

          if (skill.soulburn) {
            skillText = skill.name ? skill.name : skillLabel(id, true);
            $(chartSkillSelector).append(`<option value="${id}_soulburn" data-content="<span>${skillText}</span>">${skillText}</option>`);
          }
        }));
        $(chartSkillSelector).selectedIndex = 0;
        $(chartSkillSelector).selectpicker('refresh');
        chartSkillSelector.onchange();
      }
    };

    const defPresetSelector = document.getElementById('def-preset');
    defPresetSelector.onchange = () => {
      const selected = defPresetSelector.options[defPresetSelector.selectedIndex];
      if (selected.value) {
        document.getElementById('def').value = selected.dataset.def;
        update('def');
        const hpInput = document.getElementById(elements.target_max_hp.id);
        if (hpInput) {
          hpInput.value = selected.dataset.hp;
          update(elements.target_max_hp.id);
        }
        oneshotInput.value = selected.dataset.hp;
        window.dataLayer.push({
          'event': 'select_preset_def',
          'def_unit': selected.value
        });
      } else {
        // To ensure caides damage reduction is removed when switching to manual
        resolve();
      }
    };

    const dmgReducPresetSelector = document.getElementById('dmg-reduc-preset');
    dmgReducPresetSelector.onchange = () => {
      const selected = dmgReducPresetSelector.options[dmgReducPresetSelector.selectedIndex];
      if (selected.value) {
        if (selected.dataset.reduc !== undefined) {
          document.getElementById('dmg-reduc').value = selected.dataset.reduc;
          update('dmg-reduc');
        }
        if (selected.dataset.trans !== undefined) {
          document.getElementById('dmg-trans').value = selected.dataset.trans;
          update('dmg-trans');
        }
        if (selected.dataset.defup !== undefined) {
          document.getElementById('def-pc-up').value = selected.dataset.defup;
          update('def-pc-up');
        
        }
        window.dataLayer.push({
          'event': 'select_preset_dmg_red',
          'dmg_red': selected.value
        });
      }
    };

    const atkPresetSelector = document.getElementById('atk-preset');
    atkPresetSelector.onchange = () => {
      const selected = atkPresetSelector.options[atkPresetSelector.selectedIndex];
      if (selected.value) {
        document.getElementById('atk').value = selected.dataset.atk;
        document.getElementById('crit').value = selected.dataset.crit;
        update('atk');
        update('crit');
      }
    };

    artiSelector.onchange = () => {
      if (currentArtifact?.id && !loadingQueryParams) {
        deleteParams(artifacts[currentArtifact.id].form?.map(element => element.id));
      }

      const hero = heroes[heroSelector.value];
      const artifact = {...artifacts[artiSelector.value]};
      dedupeForm(hero, artifact);
      buildArtifact(artifact);
      resolve();
      window.dataLayer.push({
        'event': 'select_artifact',
        'artifact': artifact.name,
        'hero': heroes[heroSelector.value]?.name || 'None'
      });
    };

    const hero = heroes[heroSelector.value];
    build(hero);
    refreshArtifactList(hero);
    buildArtifact(artifacts[artiSelector.value]);
    refreshCompareBadge();
  } catch (e) {
    // pass
  }

  resolve();
  $('[data-toggle="tooltip"]').tooltip();
  const dmgBlock = $('#damage-block');
  dmgBlock.on('focus', '[data-toggle="popover"]', (event) => {
    $(event.target).popover('show');
  });
  dmgBlock.on('blur', '[data-toggle="popover"]', (event) => {
    $(event.target).popover('hide');
  });
};
// });

function initTheme() {
  const darkThemeSelected =
      localStorage.getItem('dark-switch') !== null &&
      localStorage.getItem('dark-switch') === 'dark';
  darkSwitch.checked = darkThemeSelected;
  darkThemeSelected
    ? document.body.setAttribute('data-theme', 'dark')
    : document.body.removeAttribute('data-theme');
}

let darkSwitch;

function applyTheme() {
  if (darkSwitch.checked) {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('dark-switch', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
    localStorage.removeItem('dark-switch');
  }
}

(function() {
  darkSwitch = document.getElementById('dark-switch');
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener('change', () => {
      applyTheme();
      window.dataLayer.push({
        'event': 'toggle_dark_mode',
        'dark_mode': darkSwitch.checked ? 'on' : 'off'
      });
    });
  }
})();
