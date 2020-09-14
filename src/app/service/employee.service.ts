import { Injectable } from '@angular/core';
import { Employee } from 'src/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouteReuseStrategy } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: Employee[];
  errorMessage: string = null;
  employeeSub: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(
    null
  );

  getEmployees() {
    return this.employees.slice();
  }

  getEmployeeById(id) {
    let employeeList = this.getEmployees();
    return employeeList.find((employee) => {
      return employee.id === id;
    });
  }

  onCreateEmployee(employee: Employee) {
    return this.http.post(`${environment.apiUrl}/api/create`, employee).pipe(
      tap((response: { comments: string; id: number }) => {
        employee.id = response.id;
        this.employees.push(employee);
        this.employeeSub.next(this.getEmployees());
      })
    );
  }

  onUpdateEmployee(employee: Employee) {
    return this.http.post(`${environment.apiUrl}/api/employee`, employee).pipe(
      tap(() => {
        for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i].id === employee.id) {
            this.employees[i] = employee;
          }
        }
        this.employeeSub.next(this.getEmployees());
      })
    );
  }

  onDeleteEmployee(id) {
    return this.http.delete(`${environment.apiUrl}/api/delete/` + id).pipe(
      tap((resData) => {
        this.employees = this.employees.filter((employee) => {
          if (employee.id === id) return false;
          else return true;
        });
        this.employeeSub.next(this.getEmployees());
      })
    );
  }

  constructor(private http: HttpClient, private router: Router) {
    http.get<Employee[]>(`${environment.apiUrl}/api/employees`).subscribe(
      (responseData) => {
        console.log(responseData);
        this.employees = responseData;
        this.employeeSub.next(this.employees.slice());
      },
      (error) => {
        console.log(error);
        if (error.message && error.message.includes('Http failure reponse'))
          this.errorMessage =
            'Cannot reach server..Please check your network connection and try again';
        else router.navigate(['/']);
      }
    );
  }
}
