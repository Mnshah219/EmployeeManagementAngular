import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { NgForm } from '@angular/forms';
import { EmployeeDetails } from 'src/models/employeeDetail.model';
import { Employee } from 'src/models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
})
export class NewEmployeeComponent implements OnInit {
  fname: string;
  lname: string;
  age: number;
  email: string;
  gender: boolean;
  password: string;
  department: string;
  designation: string;
  joiningDate: Date;
  leavingDate: Date;
  salary: number;
  isLoading: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCreate(form: NgForm) {
    this.isLoading = true;
    if (form.value.joiningDate && form.value.leavingDate) {
      this.joiningDate = new Date(form.value.joiningDate);
      this.leavingDate = new Date(form.value.leavingDate);
      if (this.joiningDate > this.leavingDate) {
        alert('Leaving Date should not be before joining date');
        return;
      }
    }

    this.fname = form.value.fname;
    this.lname = form.value.lname;
    this.age = Number(form.value.age);
    this.gender = Boolean(form.value.gender);
    this.email = form.value.email;
    this.password = form.value.password;
    this.salary = Number(form.value.salary);
    this.joiningDate = form.value.joiningDate
      ? new Date(form.value.joiningDate)
      : null;
    this.leavingDate = form.value.leavingDate
      ? new Date(form.value.leavingDate)
      : null;
    this.department = form.value.department;
    this.designation = form.value.designation;
    const employeeDetails: EmployeeDetails = new EmployeeDetails(
      this.department,
      this.designation,
      this.salary,
      this.joiningDate,
      this.leavingDate
    );
    const employee: Employee = new Employee(
      null,
      this.fname,
      this.lname,
      this.email,
      this.password,
      this.age,
      this.gender,
      employeeDetails
    );
    this.employeeService.onCreateEmployee(employee).subscribe(
      (response) => {
        this.isLoading = false;
        alert('New User Created!');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.isLoading = false;
        if (error.message && error.message.includes('Http failure reponse')) {
          alert(
            'Cannot reach to server..Please check your netowrk connection nd try again'
          );
          this.router.navigate(['/dashboard']);
        } else if (error.error.comments) {
          alert(error.error.comments);
        } else {
          this.router.navigate(['/']);
        }
      }
    );

    console.log(form);
  }
}
