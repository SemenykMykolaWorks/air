import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

import { ROUTES_STRINGS } from '../../../constants/routing';
import { AuthService } from '../../services/auth.service';
import { fadeStateTrigger } from '../../animations/fade.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeStateTrigger]
})
export class AppComponent {
  @HostBinding('@fade') a = true;
  constructor(public authService: AuthService,
              private router: Router) {
    let urlToRedirect: string;
    this.authService.isLoggedIn$.pipe(
      tap((isLoggedIn: boolean): void => {
        if (!isLoggedIn && location.pathname === `/${ROUTES_STRINGS.REGISTRATION}`) {
          urlToRedirect = `/${ROUTES_STRINGS.MAIN}`;
        }
        if (!isLoggedIn && location.pathname !== `/${ROUTES_STRINGS.REGISTRATION}`) {
          this.router.navigate([ROUTES_STRINGS.LOGIN]);
          urlToRedirect = `/${ROUTES_STRINGS.MAIN}`;
        }
        if (!isLoggedIn && location.pathname !== `/${ROUTES_STRINGS.REGISTRATION}` &&
          location.pathname !== `/${ROUTES_STRINGS.LOGIN}`) {
          this.router.navigate([ROUTES_STRINGS.LOGIN], {
            queryParams: {
              accessDenied: true
            }
          });
          urlToRedirect = `/${ROUTES_STRINGS.MAIN}`;
        }
      }),
      filter(result => result)
    ).subscribe((): void => {
      if (urlToRedirect) {
        this.router.navigateByUrl(urlToRedirect);
        urlToRedirect = null;
      }
    });
  }
}
