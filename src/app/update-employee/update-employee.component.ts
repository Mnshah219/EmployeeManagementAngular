import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/models/employee.model';
import { EmployeeService } from '../service/employee.service';
import { NgForm } from '@angular/forms';
import { NewEmployeeComponent } from '../new-employee/new-employee.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  index: number;
  employee: Employee;
  isLoading: boolean = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.index = +this.route.snapshot.params['id'];
    console.log(
      this.index,
      typeof this.index,
      this.employeeService.getEmployees().length
    );
    if (
      this.index === null ||
      typeof this.index !== 'number' ||
      this.index > this.employeeService.getEmployees().length - 1
    ) {
      alert('No such employee exist');
      this.router.navigate(['/dashboard']);
    } else {
      this.employee = this.employeeService.getEmployees()[this.index];
    }
  }

  onUpdate(form: NgForm) {
    this.isLoading = true;
    if (form.value.joiningDate && form.value.leavingDate) {
      let joiningDate = new Date(form.value.joiningDate);
      let leavingDate = new Date(form.value.leavingDate);
      if (joiningDate > leavingDate) {
        this.isLoading = false;
        alert('Leaving Date should not be before joining date');
        return;
      }
    }
    this.employee.fname = form.value.fname;
    this.employee.lname = form.value.lname;
    this.employee.age = Number(form.value.age);
    this.employee.gender = Boolean(form.value.gender);
    this.employee.email = form.value.email;
    this.employee.password = form.value.password;
    this.employee.employeeDetail.salary = Number(form.value.salary);
    this.employee.employeeDetail.department = form.value.department;
    this.employee.employeeDetail.designation = form.value.designation;
    this.employee.employeeDetail.joiningDate = form.value.joiningDate
      ? new Date(form.value.joiningDate)
      : null;
    this.employee.employeeDetail.leavingDate = form.value.leavingDate
      ? new Date(form.value.leavingDate)
      : null;
    this.employeeService.onUpdateEmployee(this.index, this.employee).subscribe(
      (response) => {
        this.isLoading = false;
        alert('User Updated!');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
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
