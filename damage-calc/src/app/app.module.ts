import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { FlagComponent } from './components/flag/flag.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DamageCalculatorComponent } from './components/damage-calculator/damage-calculator.component';
import { TranslationPipe } from './pipes/translation.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { SpeedTunerComponent } from './components/speed-tuner/speed-tuner.component';
import { EffectivenessCheckerComponent } from './components/effectiveness-checker/effectiveness-checker.component';
import { EHPCalculatorComponent } from './components/ehp-calculator/ehp-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    FlagComponent,
    NavbarComponent,
    DamageCalculatorComponent,
    TranslationPipe,
    PageNotFoundComponent,
    SpeedTunerComponent,
    EffectivenessCheckerComponent,
    EHPCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
