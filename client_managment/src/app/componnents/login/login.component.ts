import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {FormGroup, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginService} from '../login.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  setAuthorizeToken(token) {
    localStorage.setItem('token', token.token);
  }
  saveAuthorizeToken(token) {}
  onSubmit(): void {
    if (this.loginForm.valid) {
      // Handle form submission logic here
      console.log(this.loginForm.value);
      this.loginService.postLogin(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('loginSucsses');
          console.log(res);
          this.setAuthorizeToken(res);
          this.router.navigate(['home'], {relativeTo: this.route});
        },
        error: (res) => console.log('errro'),
      });
    } else {
      // Mark form fields as touched to display validation errors
      this.loginForm.markAllAsTouched();
    }
  }
}
