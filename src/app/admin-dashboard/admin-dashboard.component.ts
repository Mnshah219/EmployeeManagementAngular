import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Subscription } from 'rxjs';
import { Employee } from 'src/models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  employees: Employee[];
  search: string = '';
  p: number = 1;
  count: number = 5;

  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) {}

  get employeesToDisplay() {
    return this.employees.filter((employee) => {
      if (employee.fname.toLowerCase().includes(this.search.toLowerCase()))
        return true;
      else return false;
    });
  }

  onDelete(id) {
    if (
      !confirm(
        'Are you sure you want to procced?This action cannot be reversed.'
      )
    )
      return;
    this.employeeService.onDeleteEmployee(id).subscribe(
      (response) => {
        alert('Employee Deleted');
      },
      (error) => {
        console.log(error);
        if (error.message && error.message.includes('Http failure reponse'))
          alert(
            'Cannot reach to server, Please check your network connection.Deletion failed!'
          );
        else this.router.navigate(['/']);
      }
    );
  }

  ngOnInit(): void {
    this.subscription = this.employeeService.employeeSub.subscribe(
      (employees) => {
        console.log('from dashboard', this.employees);
        this.employees = employees;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
