import {Doctor} from '../models/doctor.model';

export class DoctorDto {
  public static getFullName(doctor: Doctor): string {
    return doctor.title + ' ' + doctor.firstname + ' ' + doctor.lastname;
  }

  public static getFullNameLastnameFirst(doctor: Doctor): string {
    return doctor.title + ' ' + doctor.lastname + ', ' + doctor.firstname;
  }
}
