import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'travelling-salesman-problem';

  constructor(
    private primeNGConfig: PrimeNGConfig
  ) {  }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
  }
}
