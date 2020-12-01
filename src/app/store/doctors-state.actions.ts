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

export class DoctorsSetPosition {
  static readonly type = '[Doctors] Set Position'
  constructor(public doctorId: number, public position: number) {}
}
