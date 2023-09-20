import { Injectable, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { DamageFormData } from '../models/forms';
import { Artifact } from '../models/artifact';
import { Target } from '../models/target';
import { heroes } from '../../assets/data/heroes.js';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  heroes: Record<string, Hero> = {};
  artifacts: Record<string, Artifact> = {};

  // TODO: update the defaults here when possible
  currentHero: Hero = {} as Hero;
  currentArtifact: Artifact = {} as Artifact;
  currentTarget: Target = {} as Target;

  damageInputValues: DamageFormData = new DamageFormData({});

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
    //TODO: these both actually need to be js (ts) since there will be defined functions

    // const heroesFile = await fetch(`../../assets/data/heroes.js`);
    // this.heroes = await heroesFile.json();

    // const artifactsFile = await fetch(`../../assets/artifacts.json`);
    // this.artifacts = await artifactsFile.json();
    // this.currentHero
    console.log('here')
    console.log(this.heroes)
  }
}
