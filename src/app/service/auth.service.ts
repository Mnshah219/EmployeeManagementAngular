import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean;
  private isAdmin: boolean;
  public subject: BehaviorSubject<User>;
  private expirationTimer;
  constructor(private http: HttpClient, private router: Router) {
    this.subject = new BehaviorSubject<User>(null);
  }

  login(email: string, password: string) {
    return this.http
      .post<{ jwt: string; role: string; expires: number }>(
        'http://localhost:8080/api/authenticate',
        {
          userName: email,
          password,
        }
      )
      .pipe(
        tap((resData) => {
          const user: User = new User(
            email,
            resData.role,
            resData.jwt,
            resData.expires
          );
          console.log(user);
          localStorage.setItem('userData', JSON.stringify(user));
          this.autoLogout(user.expires - Date.now());
          this.subject.next(user);
        })
      );
  }

  autoLogin() {
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (!storedUser) return;
    const user = new User(
      storedUser.email,
      storedUser.role,
      storedUser.jwt,
      storedUser.expires
    );
    if (user.token) {
      this.autoLogout(user.expires - Date.now());
      this.subject.next(user);
    }
    if (user.role === 'user') this.router.navigate(['/home']);
    else this.router.navigate(['/dashboard']);
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem('userData');
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
    this.router.navigate(['']);
  }

  autoLogout(expiresAt: number) {
    this.expirationTimer = setTimeout(() => {
      console.log('logging out ');
      this.logout();
    }, expiresAt);
  }
}
