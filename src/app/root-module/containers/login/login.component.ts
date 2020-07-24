import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ROUTES_STRINGS } from '../../../constants/routing';
import { User } from '../../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public accessDenied = 'accessDenied';

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private title: Title,
              private meta: Meta) {
    title.setTitle('Login');
    meta.addTags([
      { name: 'keywords', content: 'login,input,system' },
      { name: 'description', content: 'Login page' }
    ]);
  }

  public ngOnInit(): void {

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params[this.accessDenied]) {
          this.toastrService.error('You must be logged in to use the system.');
        }
      });

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  public login(): void {
    const loginData = this.loginForm.getRawValue();
    this.loginForm.disable();
    this.authService.login(loginData).pipe(
      finalize(() => this.loginForm.enable())
    ).subscribe((user: User[]) => {
      if (user.length !== 0) {
        if (user[0].password === loginData.password) {
          const message = `User name: ${user[0].name}<br/>User email: ${user[0].email}`;
          this.toastrService.info(message, null, {
            enableHtml: true,
            extendedTimeOut: 300000,
            closeButton: true,
            tapToDismiss: false
          });
          this.router.navigate([ROUTES_STRINGS.HOME]);
        } else {
          this.toastrService.error('Password is incorrect');
        }
      } else {
        this.toastrService.error('This user does not exist');
      }
    }, error => {
      if (!error.ok) {
        this.toastrService.error(error);
      }
    });
  }

}
