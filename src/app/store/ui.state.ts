import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UiStateModel, UiStateModelDefaults} from './ui-state.model';
import {Injectable} from '@angular/core';
import {UiToggleMenu} from './ui-state.actions';

@State({
  name: 'UI',
  defaults: UiStateModelDefaults
})
@Injectable()
export class UiState {
  @Selector()
  static menuOpen(state: UiStateModel): boolean {
    return state.menuOpen;
  }

  @Action(UiToggleMenu)
  toggleMenu(ctx: StateContext<UiStateModel>, action: UiToggleMenu): any {
    const state = ctx.getState();
    ctx.patchState({ menuOpen: !state.menuOpen });
  }
}
