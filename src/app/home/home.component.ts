import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggedInEmployee: Employee = null;
  errorMessage: string;

  get joiningDate() {
    if (this.loggedInEmployee.employeeDetail.joiningDate) {
      let dt: Date = new Date(this.loggedInEmployee.employeeDetail.joiningDate);
      return dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear();
    } else return null;
  }

  get leavingDate() {
    if (this.loggedInEmployee.employeeDetail.leavingDate) {
      let dt: Date = new Date(this.loggedInEmployee.employeeDetail.leavingDate);
      return dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear();
    } else return null;
  }
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.errorMessage = null;
    this.http.get<Employee>('http://localhost:8080/api/employee').subscribe(
      (response) => {
        this.loggedInEmployee = response;
        console.log(this.loggedInEmployee);
      },
      (error) => {
        if (error.message && error.message.includes('Http failure reponse'))
          //problem with internet or server down
          this.errorMessage = 'Cannot reach server..please try again later';
        else this.router.navigate(['/']); //unauthorized or expired token
        console.log(error);
      }
    );
  }
}
