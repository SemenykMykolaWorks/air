import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
  }

  public redirectToLoginPage(): void {
    this.authService.logout();
  }

}
