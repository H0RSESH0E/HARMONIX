import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.css']
})
export class LearnMoreComponent implements OnInit {

  constructor() { }

  registerMode = false;

  ngOnInit(): void {
  }

  enableRegisterToggle(event: boolean) {
    this.registerMode = event;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
