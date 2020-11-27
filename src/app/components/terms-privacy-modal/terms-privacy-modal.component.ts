import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-terms-privacy-modal',
  templateUrl: './terms-privacy-modal.component.html',
  styleUrls: ['./terms-privacy-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TermsPrivacyModalComponent implements OnInit {
  @Input()
  display$: BehaviorSubject<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.display$.next(false);
  }
}
