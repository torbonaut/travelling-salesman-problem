import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {RouteState} from '../../store/route.state';
import {Observable} from 'rxjs';
import {RouteWaypoint} from '../../models/route.model';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteListComponent implements OnInit {
  @Select(RouteState.route) route$: Observable<RouteWaypoint[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
