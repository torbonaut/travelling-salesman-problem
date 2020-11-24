import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {DoctorsState} from '../../store/doctors.state';
import {BehaviorSubject, Observable} from 'rxjs';
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
  dialogTitle: string;
  dialogContent: string;
  dialogDisplay$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  toggleWaypoint(doctor: Doctor): void {
    this.store.dispatch(new DoctorsToggleWaypoint(doctor.id));
  }

  showInfoDialog(doctor: Doctor): void {
    this.dialogTitle = doctor.title + ' ' + doctor.lastname + ', ' + doctor.firstname;
    this.dialogContent = `Yolo`;
    this.dialogDisplay$.next(true);
  }

  hideInfoDialog($event: CustomEvent): void {
    console.log('Yolo Hide!');
    this.dialogDisplay$.next(false);
  }
}
