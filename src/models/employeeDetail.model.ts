export class EmployeeDetails {
  department: string;
  designation: string;
  salary: number;
  joiningDate: Date;
  leavingDate: Date;

  constructor(
    department: string,
    designation: string,
    salary: number,
    joiningDate: Date,
    leavingDate: Date
  ) {
    this.department = department;
    this.designation = designation;
    this.salary = salary;
    this.joiningDate = joiningDate;
    this.leavingDate = leavingDate;
  }
}
