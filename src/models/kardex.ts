export class Kardex {
  public subject_name: string;
  public grade: number;
  public semester: number;

  constructor(semester: number, subject_name: string, grade: number) {
    this.subject_name = subject_name;
    this.semester = semester;
    this.grade = grade;
  }
}
