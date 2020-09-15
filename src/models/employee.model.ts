import { EmployeeDetails } from './employeeDetail.model';

export class Employee {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  dob: Date;
  gender: boolean;
  employeeDetail: EmployeeDetails;

  constructor(
    id: number,
    fname: string,
    lname: string,
    email: string,
    password: string,
    dob: Date,
    gender: boolean,
    employeeDetail: EmployeeDetails
  ) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.gender = gender;
    this.employeeDetail = employeeDetail;
  }
}
