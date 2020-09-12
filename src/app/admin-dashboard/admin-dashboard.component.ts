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

  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) {}

  onDelete(index) {
    if (
      !confirm(
        'Are you sure you want to procced?This action cannot be reversed.'
      )
    )
      return;
    this.employeeService.onDeleteEmployee(index).subscribe(
      (response) => {
        alert('Employee Delete');
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
        this.employees = employees;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
