import {DoctorsStateDefaults, DoctorsStateModel} from './doctors-state.model';
import {Injectable, OnDestroy} from '@angular/core';
import {Action, Actions, NgxsOnInit, ofActionSuccessful, Selector, State, StateContext, Store} from '@ngxs/store';
import {
  DoctorsHydrateCoordinates,
  DoctorsLoad,
  DoctorsSetPosition,
  DoctorsToggleWaypoint
} from './doctors-state.actions';
import {DoctorsService} from '../services/doctors.service';
import {catchError, tap} from 'rxjs/operators';
import {Doctor} from '../models/doctor.model';
import {OpenRouteService} from '../services/open.route.service';
import {forkJoin, of, Subscription} from 'rxjs';

@State<DoctorsStateModel>({
  name: 'Doctors',
  defaults: DoctorsStateDefaults
})
@Injectable()
export class DoctorsState implements NgxsOnInit {
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
  static selectedDoctors(state: DoctorsStateModel): Doctor[] {
    return state.items.filter( (doctor: Doctor) => doctor.isWaypoint === true);
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

    this.actions.pipe(
      ofActionSuccessful(DoctorsLoad)
    ).subscribe( () => this.store.dispatch(new DoctorsHydrateCoordinates()));

    if (state.loadedItems === false) {
      this.store.dispatch(new DoctorsLoad());
    }
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
    console.log(state);
    const doctors: Doctor[] = [...state.items];
    const observables = [];
    const items: Doctor[] = [];
    ctx.patchState({ loadingCoordinates: true });

    doctors.forEach( (doctor: Doctor) => {
      observables.push(this.openRouteService
        .getCoordinatsByAddress(doctor.street + ', ' + doctor.postalCode + ' ' + doctor.city)
      );
    });

    return forkJoin(observables)
        .pipe(
          catchError( err => {
            ctx.patchState({ loadedCoordinates: false, loadingCoordinates: false });
            return err;
          }),
          tap((result: any) => {
            doctors.forEach( (doctor: Doctor, index: number) => {
              const boundingBox = result[index]?.bbox;
              const lat = boundingBox[1] + (boundingBox[3] - boundingBox[1]) / 2;
              const long = boundingBox[0] + (boundingBox[2] - boundingBox[0]) / 2;
              const newD: Doctor = { ...doctor, lat, long };
              items.push(newD);
            });
            ctx.setState( { ...state, items: [...items], loadingCoordinates: false, loadedCoordinates: true });
          })
        );
  }

  @Action(DoctorsToggleWaypoint)
  toggleWaypoint(ctx: StateContext<DoctorsStateModel>, action: DoctorsToggleWaypoint): void {
    const state = ctx.getState();
    const items = [...state.items];
    const doctor = { ...items.find( (item: Doctor) => item.id === action.doctorId) };
    const index = items.findIndex( (d: Doctor) => d.id === action.doctorId);
    doctor.isWaypoint = !doctor.isWaypoint;
    items[index] = {...doctor};
    ctx.patchState({ items: [...items] });
  }

  @Action(DoctorsSetPosition)
  setPosition(ctx: StateContext<DoctorsStateModel>, action: DoctorsSetPosition): any {
    const state = ctx.getState();
    const otherDoctors = [...state.items.filter( (item: Doctor) => item.id !== action.doctorId )];
    const updatedDoctor = { ...state.items.find( (item: Doctor) => item.id === action.doctorId ) };
    updatedDoctor.position = action.position;
    const updatesDoctors = [...otherDoctors, updatedDoctor];
    ctx.patchState({ items: updatesDoctors });
  }
}
