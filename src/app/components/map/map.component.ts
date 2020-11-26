import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Icon, icon, latLng, Layer, LeafletEvent, marker, tileLayer} from 'leaflet';
import {environment} from '../../../environments/environment';
import {Select} from '@ngxs/store';
import {DoctorsState} from '../../store/doctors.state';
import {Observable, Subject} from 'rxjs';
import {Doctor} from '../../models/doctor.model';
import {OpenRouteService} from '../../services/open.route.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  @Select(DoctorsState.allDoctors) allDoctors$: Observable<Doctor[]>;
  selectedDoctor$: Subject<Doctor> = new Subject();

  mapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: environment.defaultZoom,
    center: latLng(environment.centerLat, environment.centerLong)
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=' + environment.openCycleMapApiKey,
        { maxZoom: 18, attribution: '...' })
    }
  };

  constructor(
    private openRoute: OpenRouteService
  ) { }

  ngOnInit(): void {}

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

  addClickHandler($event: LeafletEvent, item: Doctor): void {
    $event.target.addEventListener('click', () => {
      this.selectedDoctor$.next(item);
    });
  }
}

