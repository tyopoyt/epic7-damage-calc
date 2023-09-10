import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { FlagComponent } from './components/ui-elements/flag/flag.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DamageCalculatorComponent } from './components/damage-calculator/damage-calculator.component';
import { TranslationPipe } from './pipes/translation.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { SpeedTunerComponent } from './components/speed-tuner/speed-tuner.component';
import { EffectivenessCheckerComponent } from './components/effectiveness-checker/effectiveness-checker.component';
import { EHPCalculatorComponent } from './components/ehp-calculator/ehp-calculator.component';
import { SlideInputComponent } from './components/ui-elements/slide-input/slide-input.component';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { NumberInputGroupComponent } from './components/ui-elements/number-input-group/number-input-group.component';
import { MatButtonModule } from '@angular/material/button';
import { HeaderCardComponent } from './components/ui-elements/header-card/header-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DismissibleComponent } from './components/ui-elements/dismissible/dismissible.component';

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
    EHPCalculatorComponent,
    SlideInputComponent,
    NumberInputGroupComponent,
    HeaderCardComponent,
    DismissibleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatCheckboxModule
  ],
   providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
