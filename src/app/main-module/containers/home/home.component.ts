import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sliderData: any = [];

  constructor(public homeService: HomeService) { }

  public ngOnInit(): void {
    this.homeService.getHome().subscribe( item => {
      this.sliderData = item;
    });
  }

}
