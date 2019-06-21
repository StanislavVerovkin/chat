import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']) {
        this.snackBar.open('Please login to chat', 'Close', {duration: 5000});
      } else if (params['registered']) {
        this.snackBar.open('You can connect to chat with your data', 'Close', {duration: 5000});
      }
    });
  }

  getErrorMessageEmail() {
    return this.form.controls.email.hasError('required') ? 'You must enter an email' :
      this.form.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    return this.form.controls.password.hasError('required') ? 'You must enter a password' : '';
  }

  onSubmit(user) {
    this.authService.login(user)
      .subscribe(() => {
        this.router.navigate(['/chat']);
      });
  }
}
