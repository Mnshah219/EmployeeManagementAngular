import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  constructor(private authService: AuthService, private router: Router) {
    this.errorMessage = null;
    this.isLoading = false;
  }

  ngOnInit(): void {
    console.log('login component created');
  }
  onSubmit(form: NgForm) {
    const email: string = form.value.email;
    const password: string = form.value.password;

    // form.reset();
    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      (response) => {
        this.errorMessage = null;
        this.isLoading = false;
        if (response.role == 'user') this.router.navigate(['/home']);
        else this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.errorMessage = error.error.comments
          ? error.error.comments
          : 'An unknow error occured..Please try again';
      }
    );
    form.reset();
  }
}
