import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type User = "adopter" | "staff" | "manager";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route: Router) { }
  
  ngOnInit(): void {
    const confirmPassword = this.registerForm.controls.confirmPassword as FormControl;
    confirmPassword.setValidators([Validators.required, this.passwordMatchValidator]);
  }
  
  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => control.value === this.registerForm.value.password ? null : { passwordMismatch: true };

  passwordStrengthValidator: ValidatorFn =  (control: AbstractControl): ValidationErrors | null => {
    return /[A-Z]+/.test(control.value) &&  /[a-z]+/.test(control.value) && /[0-9]+/.test(control.value) ? null : { weakPassword: true };
  };

  registerForm = new FormGroup({
    type: new FormControl<User>("adopter", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.maxLength(45)]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(45)]),
    phoneNumber: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{11}$")]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]),
    confirmPassword: new FormControl(""),
  });

  onRegister() {
    console.log(this.registerForm.value);
    this.route.navigateByUrl('/auth/login');
  }
}
