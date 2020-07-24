import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../root-module/services/auth.service';
import { LocalStorageService } from '../../../root-module/services/local-storage.service';
import { USER_KEY } from '../../../constants/api';
import { ROUTES_STRINGS } from '../../../constants/routing';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public date: Date = new Date();
  public userName = '';
  public URLS = ROUTES_STRINGS;

  constructor(private authService: AuthService,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.userName = this.localStorageService.get(USER_KEY);
  }

  public onLogout(): void {
    this.authService.logout();
  }

}
