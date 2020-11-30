import {ChangeDetectionStrategy, NgZone, Component, OnInit} from '@angular/core';
import {Icon, icon, latLng, Layer, LeafletEvent, marker, tileLayer} from 'leaflet';
import {environment} from '../../../environments/environment';
import {Select} from '@ngxs/store';
import {DoctorsState} from '../../store/doctors.state';
import {Observable, Subject} from 'rxjs';
import {Doctor} from '../../models/doctor.model';
import {OpenRouteService} from '../../services/open.route.service';
import {SettingsState} from '../../store/settings.state';
import {SettingsStateModel} from '../../store/settings-state.model';
import {switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {OpenRouteJob, OpenRouteVehicle} from '../../models/open-route.model';
import {DoctorDto} from '../../dto/doctor.dto';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  @Select(DoctorsState.allDoctors) allDoctors$: Observable<Doctor[]>;
  @Select(SettingsState.settings) settings$: Observable<SettingsStateModel>;
  @Select(DoctorsState.selectedDoctors) selectedDoctors$: Observable<Doctor[]>;
  selectedDoctor$: Subject<Doctor> = new Subject();
  route$: Observable<any>;

  mapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: environment.defaultZoom,
    center: latLng(environment.centerLat, environment.centerLong)
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=' + environment.openCycleMapApiKey,
        { maxZoom: 18, attribution: '...' })
    }
  };

  constructor(
    private zone: NgZone,
    private openRouteService: OpenRouteService
  ) { }

  ngOnInit(): void {
    this.route$ = this.selectedDoctors$.pipe(
      withLatestFrom(this.settings$),
      switchMap( ([selectedDoctors, settings]) => {
        const vehicle: OpenRouteVehicle = {
          id: 1,
          description: 'Fahrrad',
          start: [settings.homeLongitude, settings.homeLatitude],
          end: [settings.homeLongitude, settings.homeLatitude],
          profile: 'driving-car'
        };

        const jobs: OpenRouteJob[] = [];
        selectedDoctors.forEach( (doctor: Doctor) => {
          const newJob: OpenRouteJob = {
            id: doctor.id,
            location: [doctor.long, doctor.lat],
            description: DoctorDto.getFullName(doctor)
          };
          jobs.push(newJob);
        });
        return this.openRouteService.getOptimizedRoute(vehicle, jobs);
      })
    );
  }

  getLayer(item: Doctor): Layer {
    return marker([item.lat, item.long], {
      title: item.title + ' ' + item.lastname + ', ' + item.firstname,
      icon: this.getIcon(item.isWaypoint)
    });
  }

  getIcon(isWaypoint: boolean): Icon {
    if (isWaypoint === true) {
      return icon({
        iconSize: [ 32, 32 ],
        iconAnchor: [ 16, 31 ],
        iconUrl: 'assets/marker-green.png',
        shadowUrl: 'assets/marker-green-shadow.png'
      });
    } else {
      return icon({
        iconSize: [ 32, 32 ],
        iconAnchor: [ 16, 31 ],
        iconUrl: 'assets/marker-red.png',
        shadowUrl: 'assets/marker-red-shadow.png'
      });
    }
  }

  getHomeLayer(settings: SettingsStateModel): Layer {
    return marker([settings.homeLatitude, settings.homeLongitude], {
      title: settings.homeTitle,
      icon: icon( {
        iconSize: [32, 32],
        iconAnchor: [16, 31],
        iconUrl: 'assets/marker-home.png',
        shadowUrl: 'assets/marker-home-shadow.png'
      })
    });
  }

  addClickHandler($event: LeafletEvent, item: Doctor): void {
    $event.target.addEventListener('click', () => {
      this.zone.run( () => this.selectedDoctor$.next(item));
    });
  }
}

