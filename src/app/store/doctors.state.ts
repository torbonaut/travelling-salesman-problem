import {DoctorsStateDefaults, DoctorsStateModel} from './doctors-state.model';
import {Injectable} from '@angular/core';
import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import {DoctorsLoad} from './doctors-state.actions';
import {DoctorsService} from '../services/doctors.service';
import {catchError, tap} from 'rxjs/operators';
import {Doctor} from '../models/doctor.model';

@State<DoctorsStateModel>({
  name: 'doctors',
  defaults: DoctorsStateDefaults
})
@Injectable()
export class DoctorsState implements NgxsOnInit {

  constructor(
    private doctorsService: DoctorsService,
    private store: Store
  ) {}

  @Selector()
  static allDoctors(state: DoctorsStateModel): Doctor[] {
    return state.items;
  }

  @Selector()
  static doctorById(state: DoctorsStateModel): any {
    return (id: number) => {
      return state.items.filter((doctor: Doctor) => doctor.id === id);
    };
  }

  ngxsOnInit(ctx?: StateContext<any>): any {
    this.store.dispatch(new DoctorsLoad());
  }

  @Action(DoctorsLoad)
  load(ctx: StateContext<DoctorsStateModel>, action: DoctorsLoad): any {
    ctx.patchState({ loading: true });
    return this.doctorsService.load().pipe(
      tap( (data) => {
        console.log(data);
        ctx.patchState({ items: data });
      }),
      catchError( (error: any) => {
        ctx.patchState({ loading: false });
        return error;
      })
    );
  }
}
