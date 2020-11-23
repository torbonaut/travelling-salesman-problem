export class DoctorsLoad {
  static readonly type = '[Doctors] Load';
}

export class DoctorsHydrateCoordinates {
  static readonly type = '[Doctors] Hydrate Coordinates';
}

export class DoctorsToggleWaypoint {
  static readonly type = '[Doctors] Toggle Waypoint';
  constructor(public doctorId: number) {}
}
