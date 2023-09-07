import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DamageCalculatorComponent } from './components/damage-calculator/damage-calculator.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EffectivenessCheckerComponent } from './components/effectiveness-checker/effectiveness-checker.component';
import { SpeedTunerComponent } from './components/speed-tuner/speed-tuner.component';
import { EHPCalculatorComponent } from './components/ehp-calculator/ehp-calculator.component';

const routes: Routes = [
  //TODO: handle old zh urls (zhCN => cn, zhTW => tw)
  {
    path: '',
    component: DamageCalculatorComponent
  },
  {
    path: ':lang/',
    component: DamageCalculatorComponent
  },
  {
    path: ':lang/effectiveness',
    component: EffectivenessCheckerComponent
  },
  {
    path: 'effectiveness',
    component: EffectivenessCheckerComponent
  },
  {
    path: ':lang/speed-tuner',
    component: SpeedTunerComponent
  },
  {
    path: 'speed-tuner',
    component: SpeedTunerComponent
  },
  {
    path: ':lang/ehp-calculator',
    component: EHPCalculatorComponent
  },
  {
    path: 'ehp-calculator',
    component: EHPCalculatorComponent
  },

  // .html, index, and extra paths are provided for compatability with any bookmarks people may have saved from previous calculator version
  {
    path: 'index',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'index.html',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: ':lang/index',
    redirectTo: ':lang',
    pathMatch: 'full'
  },
  {
    path: ':lang/index.html',
    redirectTo: ':lang',
    pathMatch: 'full'
  },
  {
    path: 'effectiveness/effectiveness',
    redirectTo: 'effectiveness',
    pathMatch: 'full'
  },
  {
    path: 'effectiveness/effectiveness.html',
    redirectTo: 'effectiveness',
    pathMatch: 'full'
  },
  {
    path: ':lang/effectiveness.html',
    redirectTo: ':lang/effectiveness',
    pathMatch: 'full'
  },
  {
    path: 'speed-tuner/speed-tuner',
    redirectTo: 'speed-tuner',
    pathMatch: 'full'
  },
  {
    path: 'speed-tuner/speed-tuner.html',
    redirectTo: 'speed-tuner',
    pathMatch: 'full'
  },
  {
    path: ':lang/speed-tuner.html',
    redirectTo: ':lang/speed-tuner',
    pathMatch: 'full'
  },
  {
    path: 'ehp-calculator/ehp-calculator',
    redirectTo: 'ehp-calculator',
    pathMatch: 'full'
  },
  {
    path: 'ehp-calculator/ehp-calculator.html',
    redirectTo: 'ehp-calculator',
    pathMatch: 'full'
  },
  {
    path: ':lang/ehp-calculator.html',
    redirectTo: ':lang/ehp-calculator',
    pathMatch: 'full'
  },

  {
    path: ':lang',
    redirectTo: ':lang/',
    pathMatch: 'full'
  },

  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
