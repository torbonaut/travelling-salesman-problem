import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Doctor} from '../models/doctor.model';

@Injectable()
export class DoctorsService {
  public load(): Observable<Doctor[]> {
    return of([
      {
        id: 1,
        name: 'Dr. Isabella Lindner-Rodler',
        street: 'St. Veiter Ring 21',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 513232',
        lat: 123,
        long: 23
      },
      {
        id: 2,
        name: 'Dr. Peter Mitterer',
        street: 'Fleischmarkt 9/2',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 56302',
        lat: 123,
        long: 23
      },
      {
        id: 3,
        name: 'Dr. med. Univ. Günther Schmoly',
        street: 'Mozartstraße 34',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 211800',
        lat: 123,
        long: 23
      },
      {
        id: 4,
        name: 'Dr. Claudia Mayr-Wiltschnigg',
        street: 'Lodengasse 37',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 210012',
        lat: 123,
        long: 23
      },
      {
        id: 5,
        name: 'Dr. Herbert Oberweger',
        street: 'Auer-von-Welsbach-Straße 42',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 418970',
        lat: 123,
        long: 23
      },
      {
        id: 6,
        name: 'Dr. Wolfgang Kühnl',
        street: 'Koschatstraße 8',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 501789',
        lat: 123,
        long: 23
      },
      {
        id: 7,
        name: 'Dr. Doris Koschier',
        street: 'Adolf-Kolping-Gasse 18',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 511110',
        lat: 123,
        long: 23
      },
      {
        id: 8,
        name: 'Dr. Evelyn Steinhart',
        street: 'Ebenthalerstraße 57',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 347003',
        lat: 123,
        long: 23
      },
      {
        id: 9,
        name: 'Dr. Wolfgang Herbert Hackl',
        street: 'Getreidegasse 4',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 515053',
        lat: 123,
        long: 23
      },
      {
        id: 10,
        name: 'Dr. Alexander Perchtold',
        street: 'Auer-von-Welsbach-Straße 27',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 43177',
        lat: 123,
        long: 23
      },
      {
        id: 11,
        name: 'Dr. Maja Brigitte Kerber',
        street: 'St. Veiter Straße 69',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 440494',
        lat: 123,
        long: 23
      },
      {
        id: 12,
        name: 'Dr. med. Erfried Pichler',
        street: 'Herbertstraße 10',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 511573',
        lat: 123,
        long: 23
      },
      {
        id: 13,
        name: 'Dr. Andrea Haas-Jölli',
        street: 'Dr-Hermann-Gasse',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 514430',
        lat: 123,
        long: 23
      },
      {
        id: 14,
        name: 'Dr. Kergi Leitgeb',
        street: 'Siebenhügelstraße 13/5',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0699 81436405',
        lat: 123,
        long: 23
      },
      {
        id: 15,
        name: 'Dr. Dietmar Schumnik',
        street: 'Villacherstraße 47',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 23354',
        lat: 123,
        long: 23
      },
      {
        id: 16,
        name: 'Dr. Ralf Berger',
        street: 'Ebenthalerstraße 198',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 340440',
        lat: 123,
        long: 23
      },
      {
        id: 17,
        name: 'Dr. Silvia Kuschnig-Roth',
        street: 'Carolinenstraße 8',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 281485',
        lat: 123,
        long: 23
      },
      {
        id: 18,
        name: 'Dr. med. Univ. Edith Bauer',
        street: 'Rosentalerstraße 94',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0463 21596',
        lat: 123,
        long: 23
      },
      {
        id: 19,
        name: 'Dr. Gerhard Weinzierl',
        street: 'Humboldtstraße 47',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0699 12704212',
        lat: 123,
        long: 23
      },
      {
        id: 20,
        name: 'Dr. Sieglinde Sorschag',
        street: 'St. Veiterstraße 41',
        postalCode: '9020',
        city: 'Klagenfurt',
        country: 'Austria',
        phone: '0664 4427605',
        lat: 123,
        long: 23
      }
    ]);
  }
}
