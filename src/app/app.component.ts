import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {latLng, tileLayer} from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'travelling-salesman-problem';

  mapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(46.62472, 14.30528)
  };

  constructor(private primeNGConfig: PrimeNGConfig) {  }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
  }
}
