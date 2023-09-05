import { Injectable, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { DamageFormData } from '../models/forms';
import { Artifact } from '../models/artifact';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  heroes: Record<string, Hero> = {};
  artifacts: Record<string, Artifact> = {};

  damageInputValues: DamageFormData = new DamageFormData({});

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
    'casterRage': 1.1
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

  displayConstants = {
    'font-family': '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
  };

  constructor() { }

  async ngOnInit() {
    //TODO: these both actually need to be js (ts) since there will be defined functions

    const heroesFile = await fetch(`../../assets/heroes.json`);
    this.heroes = await heroesFile.json();

    const artifactsFile = await fetch(`../../assets/artifacts.json`);
    this.artifacts = await artifactsFile.json();

    console.log(this.heroes)
  }
}
