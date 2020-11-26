import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {DoctorsState} from '../../store/doctors.state';
import {Observable, Subject} from 'rxjs';
import {Doctor} from '../../models/doctor.model';
import {DoctorsToggleWaypoint} from '../../store/doctors-state.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorsListComponent implements OnInit {
  @Select(DoctorsState.allDoctors) allDoctors$: Observable<Doctor[]>;
  sortedDoctors$: Observable<Doctor[]>;
  selectedDoctor$: Subject<Doctor> = new Subject();

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.sortedDoctors$ = this.allDoctors$.pipe(
      map( (doctors: Doctor[]) => {
        const d: Doctor[] = [...doctors];
        return d.sort( (a: Doctor, b: Doctor) => a.lastname.localeCompare(b.lastname));
      })
    );
  }

  toggleWaypoint(doctor: Doctor): void {
    this.store.dispatch(new DoctorsToggleWaypoint(doctor.id));
  }

  showInfoDialog(doctor: Doctor): void {
    this.selectedDoctor$.next(doctor);
  }

}
