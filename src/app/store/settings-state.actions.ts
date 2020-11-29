export class SettingsSetHomeTitle {
  static readonly type = '[Settings] set home title';
  constructor(public title: string) {}
}

export class SettingsSetHomeLatitude {
  static readonly type = '[Settings] set home latitude';
  constructor(public latitude: number) {}
}

export class SettingsSetHomeLongitude {
  static readonly type = '[Settings] set home longitude';
  constructor(public longitude: number) {}
}

export class SettingsSetLiveMode {
  static readonly type = '[Settings] set live mode';
  constructor(public mode: boolean) {}
}
