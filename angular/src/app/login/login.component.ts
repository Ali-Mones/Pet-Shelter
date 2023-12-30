import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationApiService } from '../services/authentication-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(private api: AuthenticationApiService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    this.api.login(this.loginForm.value).subscribe((response) => {
      if (response.accept) {
        document.cookie = `token=${response.token}; path=/;`
        document.location.href = "/";
      } else {
        alert("Login failed");
      }
    });
  }

}
