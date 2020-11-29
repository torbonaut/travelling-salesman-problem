import {Action, Selector, State, StateContext} from '@ngxs/store';
import {SettingsStateDefaults, SettingsStateModel} from './settings-state.model';
import {Injectable} from '@angular/core';
import {
  SettingsSetHomeLatitude,
  SettingsSetHomeLongitude,
  SettingsSetHomeTitle,
  SettingsSetLiveMode
} from './settings-state.actions';

@State({
  name: 'Settings',
  defaults: SettingsStateDefaults
})
@Injectable()
export class SettingsState {
  @Selector()
  static settings(state: SettingsStateModel): SettingsStateModel {
    return state;
  }

  @Selector()
  static homeTitle(state: SettingsStateModel): string {
    return state.homeTitle;
  }

  @Selector()
  static homeLatitude(state: SettingsStateModel): number {
    return state.homeLatitude;
  }

  @Selector()
  static homeLongitude(state: SettingsStateModel): number {
    return state.homeLongitude;
  }

  @Selector()
  static liveMode(state: SettingsStateModel): boolean {
    return state.liveMode;
  }

  @Action(SettingsSetHomeTitle)
  setHomeTitle(ctx: StateContext<SettingsStateModel>, action: SettingsSetHomeTitle): any {
    ctx.patchState({ homeTitle: action.title });
  }

  @Action(SettingsSetHomeLatitude)
  setHomeLat(ctx: StateContext<SettingsStateModel>, action: SettingsSetHomeLatitude): any {
    ctx.patchState( { homeLatitude: action.latitude});
  }

  @Action(SettingsSetHomeLongitude)
  setHomeLong(ctx: StateContext<SettingsStateModel>, action: SettingsSetHomeLongitude): any {
    ctx.patchState({ homeLongitude: action.longitude });
  }

  @Action(SettingsSetLiveMode)
  setLiveMode(ctx: StateContext<SettingsStateModel>, action: SettingsSetLiveMode): any {
    ctx.patchState( { liveMode: action.mode });
  }
}
