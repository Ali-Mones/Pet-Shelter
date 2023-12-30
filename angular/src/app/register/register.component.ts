import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationApiService } from '../services/authentication-api.service';
import { SignupRequest } from '../models/SignupRequest';

type User = "ADOPTER" | "CARETAKER" | "MANAGER";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route: Router, private api: AuthenticationApiService) { }
  
  ngOnInit(): void {
    const confirmPassword = this.registerForm.controls.confirmPassword as FormControl;
    confirmPassword.setValidators([Validators.required, this.passwordMatchValidator]);
  }
  
  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => control.value === this.registerForm.value.password ? null : { passwordMismatch: true };

  passwordStrengthValidator: ValidatorFn =  (control: AbstractControl): ValidationErrors | null => {
    return /[A-Z]+/.test(control.value) &&  /[a-z]+/.test(control.value) && /[0-9]+/.test(control.value) ? null : { weakPassword: true };
  };

  registerForm = new FormGroup({
    type: new FormControl<User>("ADOPTER", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.maxLength(45)]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(45)]),
    phoneNumber: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{11}$")]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]),
    confirmPassword: new FormControl(""),
    shelterId: new FormControl<number | null>(null),
  });

  onRegister() {

    const request: SignupRequest = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      phone: this.registerForm.value.phoneNumber!,
      password: this.registerForm.value.password!,
      userType: this.registerForm.value.type!,
      shelterId: this.registerForm.value.shelterId!,
    }

    this.api.signup(request).subscribe((response) => {
      if (response.accept) {
        this.route.navigateByUrl('/auth/login');
      } else {
        alert("Registration failed");
      }
    });
  }

  handleChange(event: string) {
    console.log(event);
    this.registerForm.controls.type.setValue(event as User);
  }
}
