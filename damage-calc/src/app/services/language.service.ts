import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language, languages } from '../models/languages';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: BehaviorSubject<Language> = new BehaviorSubject(languages.en)

  constructor() { }
}
