import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {Select, Store} from '@ngxs/store';
import {UiToggleMenu} from './store/ui-state.actions';
import {UiState} from './store/ui.state';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'travelling-salesman-problem';
  @Select(UiState.menuOpen) menuOpen$: Observable<boolean>;
  displayTermsPrivacyModal$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private primeNGConfig: PrimeNGConfig,
    private store: Store
  ) {  }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
  }

  uiToggleMenu(): void {
    this.store.dispatch(new UiToggleMenu());
  }

  showTermsPrivacyModal(): void {
    this.displayTermsPrivacyModal$.next(true);
  }
}
