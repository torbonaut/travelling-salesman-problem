import {Doctor} from './doctor.model';

export interface RouteWaypoint {
  order?: number;
  doctor: Doctor;
}
