import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  imageIndex = 0;

  constructor() { }

  ngOnInit(): void {
    this.imageIndex = Math.floor(Math.random() * 15)
  }

}
