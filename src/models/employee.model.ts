import { EmployeeDetails } from './employeeDetail.model';

export class Employee {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  age: number;
  gender: boolean;
  employeeDetail: EmployeeDetails;

  constructor(
    id: number,
    fname: string,
    lname: string,
    email: string,
    password: string,
    age: number,
    gender: boolean,
    employeeDetail: EmployeeDetails
  ) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
    this.age = age;
    this.gender = gender;
    this.employeeDetail = employeeDetail;
  }
}
