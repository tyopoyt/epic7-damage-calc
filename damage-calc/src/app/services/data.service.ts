import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { DamageFormData } from '../models/forms';
import { Artifact } from '../models/artifact';
import { Target } from '../models/target';
import { heroes } from '../../assets/data/heroes';

import * as _ from 'lodash-es'
import { BehaviorSubject } from 'rxjs';
import { DamageService } from './damage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // TODO: make sure these all have correct initial values when queryparams are implemented
  damageInputValues: DamageFormData = new DamageFormData({});
  damageInputChanged: EventEmitter<void> = new EventEmitter();

  // TODO: update the defaults here when possible
  currentHero: Hero = heroes.crescent_moon_rin;  // Default to abigail when more things are working
  currentArtifact: Artifact = new Artifact({});
  currentTarget: Target = new Target(this.currentArtifact, this.damageInputValues, 1);  

  // TODO: refactor these to be more readable
  battleConstants: Record<string, number> = {
    'dmgConst': 1.871,
    'elemAdv': 1.1,
    'atkDown': 0.5, 
    'atkUp': 1.5, 
    'atkUpGreat': 1.75, 
    'vigor': 1.3,
    'critDmgUp': 0.5,
    'rageSet': 0.3,
    'torrentSet': 0.1,
    'penSet': 0.15,
    'defUp': 0.6,
    'defDown': -0.7,
    'targetVigor': 0.3,
    'target': 1.15,
    'caster-fury': 1.3,
    'spdUp': 1.3, 
    'casterRage': 1.1,
    'perception': 0.15
  };
  
  heroConstants: Record<string, number> = {
    'beehooBurnMult': 1.3
  };
  
  // Used for the caster_has_buff field
  casterBuffs = [
    'atk-up', 'vigor', 'atk-up-great', 'crit-dmg-up', 'caster-defense-up', 'caster-speed-up',
    'caster-has-flame-alchemist', 'caster-has-multilayer-barrier', 'caster-invincible',
    'caster-perception', 'caster-enrage', 'caster-fury', 'caster-stealth'
  ];

  attackModifiers = [
    'atkDown', 'atkUp', 'atkUpGreat', 'vigor'
  ]
  
  damageMultSets = [
    'rageSet', 'torrentSet'
  ]

  displayConstants = {
    'font-family': '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
  };

  constructor() {
    this.initialSetup();
  }

  async initialSetup() {
  }

  updateDamageInputValues(updates: Record<string, any>) {
    for (const [field, data] of Object.entries(updates)) {
      this.setProperty(this.damageInputValues, field as keyof DamageFormData, data);
    }
    this.damageInputChanged.emit();
  }

  molagoras(): Record<string, number> {
    const molagoras: Record<string, number> = {};

    for (let i = 1; i < 4; i++) {
      if (_.get(this.currentHero.skills, `s${i}`)) {
        molagoras[`s${i}`] = this.damageInputValues[`molagoraS${i}` as keyof DamageFormData] as number;
      }
    }
    
    console.log('molas:', molagoras)

    return molagoras;
  }

  // Helper function to update the value of a form input
  setProperty<T, K extends keyof T>(object: T, property: K, value: any) {
    object[property] = value; 
  }
}
