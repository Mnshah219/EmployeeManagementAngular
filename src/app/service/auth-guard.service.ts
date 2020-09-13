import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  user: User;

  constructor(private authService: AuthService) {
    authService.subject.subscribe((user) => {
      this.user = user;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url === '/dashboard' && this.user.role === 'admin') return true;
    else if (state.url === '/home' && this.user.role === 'user') return true;
    else if (state.url === '/create' && this.user.role == 'admin') return true;
    else if (state.url.includes('/update') && this.user.role == 'admin')
      return true;
    else return false;
  }
}
