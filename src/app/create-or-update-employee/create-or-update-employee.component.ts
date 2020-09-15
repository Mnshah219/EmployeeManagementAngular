import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/models/employee.model';
import { EmployeeService } from '../service/employee.service';
import { NgForm } from '@angular/forms';
import { EmployeeDetails } from 'src/models/employeeDetail.model';

@Component({
  selector: 'app-create-or-update-employee',
  templateUrl: './create-or-update-employee.component.html',
  styleUrls: ['./create-or-update-employee.component.css'],
})
export class CreateOrUpdateEmployeeComponent implements OnInit {
  createMode: boolean = null;
  employee: Employee;
  id: number;
  isLoading: boolean = false;
  departmentList: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    this.departmentList = [
      'Software',
      'Accounts',
      'Human Resources',
      'Research & Development',
      'Marketing',
    ];
  }

  ngOnInit(): void {
    if (this.router.url.includes('/create')) this.createMode = true;
    else this.createMode = false;
    if (!this.createMode) {
      this.id = +this.route.snapshot.params['id'];
      if (this.id === null || typeof this.id !== 'number') {
        alert('No such employee exist');
        this.router.navigate(['/dashboard']);
      } else {
        this.employee = this.employeeService.getEmployeeById(this.id);
        if (!this.employee) {
          alert('No such employee exist');
          this.router.navigate(['/dashboard']);
        }
      }
    } else {
      let employeeDetails: EmployeeDetails = new EmployeeDetails(
        null,
        null,
        null,
        null,
        null
      );
      this.employee = new Employee(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        employeeDetails
      );
    }
  }

  onClick(form: NgForm) {
    if (this.createMode) this.onCreate(form);
    else this.onUpdate(form);
  }

  onCreate(form: NgForm) {
    this.isLoading = true;
    let joiningDate = new Date(form.value.joiningDate);
    let leavingDate = new Date(form.value.leavingDate);
    let currentDate = new Date();
    if (joiningDate && leavingDate) {
      if (
        joiningDate > leavingDate ||
        joiningDate > currentDate ||
        leavingDate > currentDate
      ) {
        alert('Leaving Date should not be before joining date');
        this.isLoading = false;
        return;
      }
    } else if (joiningDate) {
      if (joiningDate > currentDate) {
        alert('Joining date must be on or before today');
        this.isLoading = false;
        return;
      }
    } else if (leavingDate) {
      if (leavingDate > currentDate) {
        alert('Leaving date must be on or before today');
        this.isLoading = false;
        return;
      }
    }

    if (form.value.dob) {
      if (new Date(form.value.dob) > new Date()) {
        alert('Date of birth must be before today');
        this.isLoading = false;
        return;
      }
    }

    this.employee.fname = form.value.fname;
    this.employee.lname = form.value.lname;
    this.employee.dob = form.value.dob ? new Date(form.value.dob) : null;
    this.employee.gender = Boolean(form.value.gender);
    this.employee.email = form.value.email;
    this.employee.password = form.value.password;
    this.employee.employeeDetail.salary = Number(form.value.salary);
    this.employee.employeeDetail.joiningDate = form.value.joiningDate
      ? new Date(form.value.joiningDate)
      : null;
    this.employee.employeeDetail.leavingDate = form.value.leavingDate
      ? new Date(form.value.leavingDate)
      : null;
    this.employee.employeeDetail.department = form.value.department;
    this.employee.employeeDetail.designation = form.value.designation;
    this.employeeService.onCreateEmployee(this.employee).subscribe(
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
  }

  getMonth(month: number) {
    month += 1;
    return String(month).length === 1 ? '0' + String(month) : String(month);
  }
  getDate(date: number) {
    return String(date).length === 1 ? '0' + String(date) : String(date);
  }

  get joiningDate() {
    let jd = new Date(this.employee.employeeDetail.joiningDate);
    if (jd) {
      return (
        jd.getFullYear() +
        '-' +
        this.getMonth(jd.getMonth()) +
        '-' +
        this.getDate(jd.getDate())
      );
    } else return null;
  }

  get leavingDate() {
    let jd = new Date(this.employee.employeeDetail.leavingDate);
    if (jd) {
      return (
        jd.getFullYear() +
        '-' +
        this.getMonth(jd.getMonth()) +
        '-' +
        this.getDate(jd.getDate())
      );
    } else return null;
  }

  get dob() {
    let jd = new Date(this.employee.dob);
    console.log(this.employee);
    if (jd) {
      return (
        jd.getFullYear() +
        '-' +
        this.getMonth(jd.getMonth()) +
        '-' +
        this.getDate(jd.getDate())
      );
    } else return null;
  }

  onUpdate(form: NgForm) {
    this.isLoading = true;
    let joiningDate = new Date(form.value.joiningDate);
    let leavingDate = new Date(form.value.leavingDate);
    let currentDate = new Date();
    if (joiningDate && leavingDate) {
      if (
        joiningDate > leavingDate ||
        joiningDate > currentDate ||
        leavingDate > currentDate
      ) {
        alert('Leaving Date should not be before joining date');
        this.isLoading = false;
        return;
      }
    } else if (joiningDate) {
      if (joiningDate > currentDate) {
        alert('Joining date must be on or before today');
        this.isLoading = false;
        return;
      }
    } else if (leavingDate) {
      if (leavingDate > currentDate) {
        alert('Leaving date must be on or before today');
        this.isLoading = false;
        return;
      }
    }
    if (form.value.dob) {
      if (new Date(form.value.dob) > new Date()) {
        alert('Date of birth must be before today');
        this.isLoading = false;
        return;
      }
    }

    this.employee.fname = form.value.fname;
    this.employee.lname = form.value.lname;
    this.employee.dob = form.value.dob ? new Date(form.value.dob) : null;
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
    this.employeeService.onUpdateEmployee(this.employee).subscribe(
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
  }
}
