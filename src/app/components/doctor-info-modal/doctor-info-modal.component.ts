import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Doctor} from '../../models/doctor.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-doctor-info-modal',
  templateUrl: './doctor-info-modal.component.html',
  styleUrls: ['./doctor-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorInfoModalComponent implements OnInit {
  @Input() selectedDoctor$: Observable<Doctor>;
  doctor$: Observable<Doctor>;
  display$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.doctor$ = this.selectedDoctor$.pipe(
      tap( (doctor: Doctor) => {
        this.display$.next(true);
        this.cd.detectChanges();
      })
    );
  }

  closeDialog(): void {
    this.display$.next(false);
    this.cd.detectChanges();
  }
}
