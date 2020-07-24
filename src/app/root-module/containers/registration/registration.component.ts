import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ROUTES_STRINGS } from '../../../constants/routing';
import { User } from '../../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private toastrService: ToastrService,
              private router: Router,
              private title: Title) {
    title.setTitle('Registration');
  }

  public ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required])
    });
  }

  public register(): void {
    const registerData = this.registerForm.getRawValue();
    this.registerForm.disable();
    this.authService.registerUser(registerData).pipe(
      finalize(() => this.registerForm.enable())
    ).subscribe( (user: User) => {
      if (user.name === registerData.name) {
        const message = `User name: ${user.name}<br/>User email: ${user.email}`;
        this.toastrService.info(message, null, {
          enableHtml: true,
          extendedTimeOut: 300000,
          closeButton: true,
          tapToDismiss: false
        });
        this.router.navigate([ROUTES_STRINGS.HOME]);
      }
    }, error => {
      if (!error.ok) {
        this.toastrService.error('404');
      }
    });
  }

  private forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User[]) => {
          if (user.length !== 0) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }

}
