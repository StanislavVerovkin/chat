import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
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

  getErrorMessageName() {
    return this.form.controls.name.hasError('required') ? 'You must enter a name' : '';
  }

  onSubmit(user) {
    this.authService.register(user)
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        });
      });
  }
}
