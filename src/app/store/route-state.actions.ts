import {Doctor} from '../models/doctor.model';

export class RouteAddWaypoint {
  static readonly type = '[Route] Add Waypoint';
  constructor(public doctor: Doctor) {}
}

export class RouteRemoveWaypoint {
  static readonly type = '[Route] Remove Waypoint';
  constructor(public position: number) {}
}
