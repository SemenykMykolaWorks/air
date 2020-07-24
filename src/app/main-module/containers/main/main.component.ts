import { Component, HostBinding, OnInit } from '@angular/core';
import { fadeStateTrigger } from '../../../root-module/animations/fade.animation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeStateTrigger]
})
export class MainComponent implements OnInit {
  @HostBinding('@fade') a = true;
  constructor() { }

  public ngOnInit(): void {
  }

}
