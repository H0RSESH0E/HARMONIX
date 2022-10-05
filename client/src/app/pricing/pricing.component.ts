import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
    @Output() registerToggle = new EventEmitter();

  constructor() { }
  fortissimoPrice: number = 29;
  fortePrice: number = 15;

  ngOnInit(): void {
  }

  registerMode() {
    this.registerToggle.emit(true);
  }
}
