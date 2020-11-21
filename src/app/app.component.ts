import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {Store} from '@ngxs/store';
import {DoctorsHydrateCoordinates, DoctorsLoad} from './store/doctors-state.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'travelling-salesman-problem';

  constructor(
    private primeNGConfig: PrimeNGConfig,
    private store: Store
  ) {  }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
  }

  loadDoctors(): void {
    this.store.dispatch(new DoctorsLoad());
  }

  loadCoordinates(): void {
    this.store.dispatch(new DoctorsHydrateCoordinates());
  }
}
