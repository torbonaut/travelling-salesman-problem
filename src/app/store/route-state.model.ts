import {RouteWaypoint} from '../models/route.model';

export interface RouteStateModel {
  waypoints: RouteWaypoint[];
}

export const RouteStateModelDefaults = {
  waypoints: []
};
