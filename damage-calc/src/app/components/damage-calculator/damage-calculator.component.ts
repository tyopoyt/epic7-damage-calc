import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-damage-calculator',
  templateUrl: './damage-calculator.component.html',
  styleUrls: ['./damage-calculator.component.scss']
})
export class DamageCalculatorComponent implements OnInit {

  constructor (private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    this.route.params.subscribe(param => {
      console.log(param)
    })

    this.router.events.subscribe(event =>
      console.log(event))
  }

}
