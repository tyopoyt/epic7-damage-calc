import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speed-tuner',
  templateUrl: './speed-tuner.component.html',
  styleUrls: ['./speed-tuner.component.scss']
})
export class SpeedTunerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(" hi i'm speed tuner")
  }

}
