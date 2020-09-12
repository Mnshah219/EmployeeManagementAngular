import { Injectable } from '@angular/core';
import { Employee } from 'src/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouteReuseStrategy } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  onCreateEmployee(employee: Employee) {
    return this.http.post('http://localhost:8080/api/create', employee).pipe(
      tap(() => {
        this.employees.push(employee);
        this.employeeSub.next(this.getEmployees());
      })
    );
  }

  onDeleteEmployee(index) {
    return this.http
      .delete('http://localhost:8080/api/delete/' + this.employees[index].id)
      .pipe(
        tap((resData) => {
          this.employees.splice(index, 1);
          this.employeeSub.next(this.getEmployees());
        })
      );
  }

  constructor(private http: HttpClient, private router: Router) {
    http.get<Employee[]>('http://localhost:8080/api/employees').subscribe(
      (responseData) => {
        console.log(responseData);
        this.employees = responseData;
        this.employeeSub.next(this.employees.slice());
      },
      (error) => {
        if (error.message && error.message.includes('Http failure reponse'))
          this.errorMessage =
            'Cannot reach server..Please check your network connection and try again';
        else router.navigate(['/']);
      }
    );
  }
}
