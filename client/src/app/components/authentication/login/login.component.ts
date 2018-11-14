import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email:'',
    password:''
  }

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.authService.loggedIn) {
      console.log("Logged In User...");
      this.router.navigate(['/']);
    }
  }

  onLogin(user) {
    if (!user.valid) {
      console.log("Invalid form");
      return;
    }
    this.authService.login(user.value.email, user.value.password);
  }

}
