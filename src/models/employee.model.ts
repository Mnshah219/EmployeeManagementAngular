import { EmployeeDetails } from './employeeDetail.model';

export class Employee {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  age: number;
  employeeDetail: EmployeeDetails;

  constructor(
    id: number,
    fname: string,
    lname: string,
    email: string,
    password: string,
    age: number,
    employeeDetail: EmployeeDetails
  ) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
    this.age = age;
    this.employeeDetail = employeeDetail;
  }
}
