import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-terms-privacy-modal',
  templateUrl: './terms-privacy-modal.component.html',
  styleUrls: ['./terms-privacy-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsPrivacyModalComponent implements OnInit {
  display$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.display$.next(false);
  }
}
