import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, private router:Router){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.authService.loggedIn;
    if (!isAuth) {
      this.router.navigate(['/']);
    }
    return isAuth;
  }
}
