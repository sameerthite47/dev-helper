import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User = {};
  private token: string;
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http:HttpClient,
    private router:Router,
    private jwtHelper: JwtHelperService
  ) { 
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email:string, password:string) {
    const data = { email:email, password:password }
    return this.http.post<{token?:string, message?:string }>(environment.apiUrl + '/users/login', data)
      .subscribe(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.token = response.token;
          const decodedUser = this.decodeUserFromToken(response.token);
          this.setCurrentUser(decodedUser);
          // return this.loggedIn;
          this.authStatusListener.next(this.loggedIn);
          this.router.navigate(['/']);
        } else {
          return response.message;
        }
      });
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token);
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser.id;
    this.currentUser.name = decodedUser.name;
    this.currentUser.email = decodedUser.email;
    // decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    // delete decodedUser.role;
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = {};
    this.router.navigate(['/']);
  }
}
