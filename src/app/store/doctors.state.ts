import {DoctorsStateDefaults, DoctorsStateModel} from './doctors-state.model';
import {Injectable, OnDestroy} from '@angular/core';
import {Action, Actions, NgxsOnInit, ofActionSuccessful, Selector, State, StateContext, Store} from '@ngxs/store';
import {DoctorsHydrateCoordinates, DoctorsLoad} from './doctors-state.actions';
import {DoctorsService} from '../services/doctors.service';
import {catchError, tap} from 'rxjs/operators';
import {Doctor} from '../models/doctor.model';
import {OpenRouteService} from '../services/open.route.service';
import {Subscription} from 'rxjs';

@State<DoctorsStateModel>({
  name: 'doctors',
  defaults: DoctorsStateDefaults
})
@Injectable()
export class DoctorsState implements NgxsOnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  constructor(
    private doctorsService: DoctorsService,
    private openRouteService: OpenRouteService,
    private store: Store,
    private actions: Actions
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

  @Selector()
  static coordinatesLoaded(state: DoctorsStateModel): boolean {
    return state.loadedCoordinates;
  }

  ngxsOnInit(ctx?: StateContext<any>): any {
    const state: DoctorsStateModel = ctx.getState();
    if (state.loadedItems !== true) {
      this.store.dispatch(new DoctorsLoad());
    }

    this.subscriptions.add(
      this.actions.pipe(
        ofActionSuccessful(DoctorsLoad)
      ).subscribe( () => {
        console.log('KNJD');
        this.store.dispatch(new DoctorsHydrateCoordinates());
      })
    );
  }

  @Action(DoctorsLoad)
  load(ctx: StateContext<DoctorsStateModel>, action: DoctorsLoad): any {
    ctx.patchState({ loadingItems: true });
    return this.doctorsService.load().pipe(
      tap( (data) => {
        ctx.patchState({ items: data, loadingItems: false, loadedItems: true });
      }),
      catchError( (error: any) => {
        ctx.patchState({ loadingItems: false });
        return error;
      })
    );
  }

  @Action(DoctorsHydrateCoordinates)
  hydrateCoordinates(ctx: StateContext<DoctorsStateModel>, action: DoctorsHydrateCoordinates): any {
    const state = ctx.getState();
    ctx.patchState({ loadingCoordinates: true });
    const newDoctors: Doctor[] = [];
    state.items.forEach( (doctor: Doctor) => {
      this.openRouteService
        .getCoordinatsByAddress(doctor.street + ', ' + doctor.postalCode + ' ' + doctor.city)
        .toPromise()
        .then( (response) => {
          const boundingBox: number[] = response.bbox;
          const lat: number = boundingBox[1] + (boundingBox[3] - boundingBox[1]) / 2;
          const long: number = boundingBox[0] + (boundingBox[2] - boundingBox[0]) / 2;
          const doctorWithCoordinates: Doctor = { ...doctor, lat, long };
          newDoctors.push(doctorWithCoordinates);
        });
    });
    console.log(newDoctors);
    ctx.patchState( { items: [...newDoctors], loadingCoordinates: false, loadedCoordinates: true });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
