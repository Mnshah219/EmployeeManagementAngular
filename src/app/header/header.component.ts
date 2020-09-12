import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  userSub: Subscription;
  user: User = null;

  constructor(private authService: AuthService) {
    this.isAuthenticated = false;
  }
  onLogOut() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.userSub = this.authService.subject.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
