import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DamageCalculatorComponent } from './components/damage-calculator/damage-calculator.component';
import { DismissibleComponent } from './components/ui-elements/dismissible/dismissible.component';
import { EffectivenessCheckerComponent } from './components/effectiveness-checker/effectiveness-checker.component';
import { EHPCalculatorComponent } from './components/ehp-calculator/ehp-calculator.component';
import { FlagComponent } from './components/ui-elements/flag/flag.component';
import { HeaderCardComponent } from './components/ui-elements/header-card/header-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NumberInputGroupComponent } from './components/ui-elements/number-input-group/number-input-group.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SlideInputComponent } from './components/ui-elements/slide-input/slide-input.component';
import { SpeedTunerComponent } from './components/speed-tuner/speed-tuner.component';
import { TranslationPipe } from './pipes/translation.pipe';
import { TypeofPipe } from './pipes/typeof.pipe';
import { CompareComponent } from './components/compare/compare.component';
import { NgChartsModule } from 'ng2-charts';
import { DamageGraphComponent } from './components/damage-graph/damage-graph.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    DamageCalculatorComponent,
    DismissibleComponent,
    EffectivenessCheckerComponent,
    EHPCalculatorComponent,
    FlagComponent,
    HeaderCardComponent,
    NavbarComponent,
    NumberInputGroupComponent,
    PageNotFoundComponent,
    SlideInputComponent,
    SpeedTunerComponent,
    TranslationPipe,
    TypeofPipe,
    CompareComponent,
    DamageGraphComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatRadioModule,
    MtxTooltipModule
  ],
  exports: [
    TranslationPipe
  ],
  providers: [
    {provide: 'googleTagManagerId', useValue: 'GTM-M7H68RW'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
