export class Student {
  public student_id: string;
  public student_fullName: string;

  /*constructor(student_id: string, student_name: string, student_lastName: string, student_mothersLastName: string) {
    this.student_id = student_id;
    this.student_fullName = `${student_name} ${student_lastName} ${student_mothersLastName}`;
  }*/

  constructor(student_id: any, student_name: string, student_lastName: string, student_mothersLastName: string) {
    this.student_id = student_id;
    this.student_fullName = `${student_name} ${student_lastName} ${student_mothersLastName}`;
  }
}
