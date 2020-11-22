import {Action, Selector, State, StateContext} from '@ngxs/store';
import {RouteStateModel, RouteStateModelDefaults} from './route-state.model';
import {Injectable} from '@angular/core';
import {RouteAddWaypoint} from './route-state.actions';
import {RouteWaypoint} from '../models/route.model';

@State({
  name: 'route',
  defaults: RouteStateModelDefaults
})
@Injectable()
export class RouteState {
  @Selector()
  static route(state: RouteStateModel): RouteWaypoint[] {
    return state.waypoints;
  }

  @Action(RouteAddWaypoint)
  addWaypoint(ctx: StateContext<RouteStateModel>, action: RouteAddWaypoint): any {
    const state = ctx.getState();
    const waypoints: RouteWaypoint[] = [...state.waypoints, {
      doctor: action.doctor
    }];
    ctx.patchState({ waypoints });
  }
}
