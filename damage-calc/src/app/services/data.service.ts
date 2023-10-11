import { EventEmitter, Injectable } from '@angular/core';
import { Hero, HeroClass, HeroElement } from '../models/hero';
import { DamageFormData } from '../models/forms';
import { Artifact } from '../models/artifact';
import { Target } from '../models/target';
import { Heroes } from '../../assets/data/heroes';

import * as _ from 'lodash-es'
import { BehaviorSubject } from 'rxjs';
import { Artifacts } from 'src/assets/data/artifacts';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // TODO: make sure these all have correct initial values when queryparams are implemented
  damageInputValues: DamageFormData = new DamageFormData({});
  damageInputChanged: EventEmitter<void> = new EventEmitter();

  // TODO: update the defaults here when possible
  currentHeroID = new BehaviorSubject<string>('abigail')
  currentHero = new BehaviorSubject<Hero>(Heroes.abigail);  // Default to abigail when more things are working
  currentArtifactID = new BehaviorSubject<string>('no_proc')
  currentArtifact = new BehaviorSubject<Artifact>(Artifacts.no_proc);
  currentTarget: Target = new Target();
  
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
    'decreasedAttack', 'attackUp', 'attackUpGreat', 'casterVigor'
  ]
  
  damageMultSets = [
    'rageSet', 'torrentSet'
  ]

  displayConstants = {
    'font-family': '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
  };

  buffModifiedSpecific = [
    'casterSpeed', 'targetSpeed', 'casterDefense', 'targetDefense', 'targetAttack'
  ]

  HPIncreaseArtifacts = [
    'prayer_of_solitude'
  ]

  advantageousElementMap = {
    [HeroElement.fire]: HeroElement.earth,
    [HeroElement.ice]: HeroElement.fire,
    [HeroElement.earth]: HeroElement.ice,
    [HeroElement.dark]: HeroElement.light,
    [HeroElement.light]: HeroElement.dark,
  }

  constructor() {
    this.initialSetup();
  }

  // TODO: remove this if no longer needed
  async initialSetup() {
    return;
  }

  updateDamageInputValues(updates: Record<string, any>) {
    console.log(updates)
    for (const [field, data] of Object.entries(updates)) {
      this.setProperty(this.damageInputValues, field as keyof DamageFormData, data);
    }
    this.damageInputChanged.emit();
  }

  updateSelectedHero(hero: string) {
    this.currentHeroID.next(hero);
    this.currentHero.next(Heroes[hero]);

    if (this.currentArtifact.value.exclusive !== HeroClass.common && this.currentArtifact.value.exclusive !== this.currentHero.value.class) {
      this.updateSelectedArtifact(Artifacts.no_proc.id)
    }
  }

  updateSelectedArtifact(artifact: string) {
    this.currentArtifactID.next(artifact);
    this.currentArtifact.next(Artifacts[artifact]);
  }

  molagoras(): Record<string, number> {
    const molagoras: Record<string, number> = {};

    for (let i = 1; i < 4; i++) {
      if (_.get(this.currentHero.value.skills, `s${i}`)) {
        molagoras[`s${i}`] = this.damageInputValues[`molagoras${i}` as keyof DamageFormData] as number;
      }
    }

    return molagoras;
  }

  advantageousElement(hero: Hero = this.currentHero.value) {
    return this.advantageousElementMap[hero.element];
  }

  // Helper function to update the value of a form input
  setProperty<T, K extends keyof T>(object: T, property: K, value: any) {
    object[property] = value; 
  }
}
