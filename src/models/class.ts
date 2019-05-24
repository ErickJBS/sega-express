export class Class {
  public subject_name: string;
  public salon_id: string;
  public day: number;
  public hour: number;
  public duration: number;

  constructor(subject_name: string, salon_id: string, day: number, hour: number, duration: number) {
    this.subject_name = subject_name;
    this.salon_id = salon_id;
    this.day = day;
    this.hour = hour;
    this.duration = duration;
  }
}
