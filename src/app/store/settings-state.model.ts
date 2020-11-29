export interface SettingsStateModel {
  homeTitle: string;
  homeLatitude: number;
  homeLongitude: number;
  liveMode: boolean;
}

export const SettingsStateDefaults: SettingsStateModel = {
  homeTitle: 'Home',
  homeLatitude: 46.630080,
  homeLongitude: 14.311530,
  liveMode: false
};
