import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {DoctorsState} from '../../store/doctors.state';
import {Observable} from 'rxjs';
import {Doctor} from '../../models/doctor.model';
import {DoctorsToggleWaypoint} from '../../store/doctors-state.actions';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorsListComponent implements OnInit {
  @Select(DoctorsState.allDoctors) allDoctors$: Observable<Doctor[]>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  toggleWaypoint(doctor: Doctor): void {
    this.store.dispatch(new DoctorsToggleWaypoint(doctor.id));
  }
}
