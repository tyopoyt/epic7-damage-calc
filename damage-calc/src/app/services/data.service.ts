import { EventEmitter, Injectable } from '@angular/core';
import { Hero, HeroClass, HeroElement } from '../models/hero';
import { DamageFormData, FormDefaults } from '../models/forms';
import { Artifact } from '../models/artifact';
import { Target } from '../models/target';
import { Heroes } from '../../assets/data/heroes';

import * as _ from 'lodash-es'
import { BehaviorSubject } from 'rxjs';
import { Artifacts } from 'src/assets/data/artifacts';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  damageInputValues: DamageFormData = new DamageFormData({});
  damageInputChanged: EventEmitter<void> = new EventEmitter();

  currentHeroID = new BehaviorSubject<string>('abigail')
  currentHero = new BehaviorSubject<Hero>(Heroes.abigail);
  currentArtifactID = new BehaviorSubject<string>('noProc')
  currentArtifact = new BehaviorSubject<Artifact>(Artifacts.noProc);
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
    'decreasedAttack', 'attackUp', 'attackUpGreat', 'casterVigor', 'casterEnraged', 'casterHasStarsBlessing'
  ]
  
  damageMultSets = [
    'rageSet', 'torrentSet'
  ]

  displayConstants = {
    'font-family': '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
  };

  buffModifiedSpecific = [
    'casterSpeed', 'targetSpeed', 'casterDefense', 'targetDefense', 'targetAttack', 'highestAllyAttack'
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

  constructor (private router: Router, private activatedRoute: ActivatedRoute) {}

  updateDamageInputValues(updates: Record<string, any>) {
    for (const [field, data] of Object.entries(updates)) {
      this.setProperty(this.damageInputValues, field as keyof DamageFormData, data);
    }
    this.damageInputChanged.emit();
  }

  updateSelectedHero(hero: string) {
    this.currentHeroID.next(hero);
    this.currentHero.next(Heroes[hero]);

    if (this.currentArtifact.value.exclusive !== HeroClass.common && this.currentArtifact.value.exclusive !== this.currentHero.value.class) {
      this.updateSelectedArtifact(Artifacts.noProc.id)
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

  updateDamageQueryParams(params: Record<string, boolean | string | number> ) {
    const queryParams: Record<string, boolean | string | number> = {}
    for (const param of Object.entries(params)) {
      if (typeof param[1] !== 'function') {
        if (typeof param[1] === 'boolean' && param[1] !== (FormDefaults[param[0]]?.default || false)) {
          queryParams[param[0]] = param[1];
        } else if (typeof param[1] === 'number' && param[1] !== (FormDefaults[param[0]]?.defaultValue || 0)) {
          queryParams[param[0]] = param[1];
        } else {
          const id = _.get(param[1], 'id');
          if (id && id !== 'manual') {
            queryParams[param[0]] = id;
          }
        }
      }
    }

    // console.log(queryParams)
    // this.router.navigate(
    //   [], 
    //   {
    //     relativeTo: this.activatedRoute,
    //     queryParams, 
    //     queryParamsHandling: 'merge', // remove to replace all query params by provided
    //   });
  }

  // Helper function to update the value of a form input
  setProperty<T, K extends keyof T>(object: T, property: K, value: any) {
    object[property] = value; 
  }
}
