import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Languages } from 'src/app/models/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-speed-tuner',
  templateUrl: './speed-tuner.component.html',
  styleUrls: ['./speed-tuner.component.scss']
})
export class SpeedTunerComponent implements OnInit {

  constructor(public screenService: ScreenService,
              public languageService: LanguageService,
              private route: ActivatedRoute
            ) { }

  ngOnInit(): void {
    const langParam = this.route.snapshot.paramMap.get('lang') || 'us';
    this.languageService.setLanguage(Languages[langParam])
  }

}
