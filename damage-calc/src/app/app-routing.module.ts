import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DamageCalculatorComponent } from './components/damage-calculator/damage-calculator.component';

const routes: Routes = [
  {
    path: '',
    component: DamageCalculatorComponent
  },
  {
    path: ':lang',
    component: DamageCalculatorComponent
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
