import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

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
      .subscribe((data) => {
        this.router.navigate(['/chat']);
      });
  }
}
