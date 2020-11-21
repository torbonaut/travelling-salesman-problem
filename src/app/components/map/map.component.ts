import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {circle, latLng, Layer, Marker, marker, polygon, tileLayer} from 'leaflet';
import {environment} from '../../../environments/environment';
import {Select} from '@ngxs/store';
import {DoctorsState} from '../../store/doctors.state';
import {Observable, of} from 'rxjs';
import {Doctor} from '../../models/doctor.model';
import {OpenRouteService} from '../../services/open.route.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  @Select(DoctorsState.allDoctors) allDoctors$: Observable<Doctor[]>;

  mapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: environment.defaultZoom,
    center: latLng(environment.centerLat, environment.centerLong)
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
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
      title: item.name
    });
  }
}
