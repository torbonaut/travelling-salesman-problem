import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {DoctorsState} from './store/doctors.state';
import {DoctorsService} from './services/doctors.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ListboxModule} from 'primeng/listbox';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { MapComponent } from './components/map/map.component';
import {AccordionModule} from 'primeng/accordion';
import {HttpClientModule} from '@angular/common/http';
import {OpenRouteService} from './services/open.route.service';
import {ButtonModule} from 'primeng/button';
import { RouteListComponent } from './components/route-list/route-list.component';
import {RouteState} from './store/route.state';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsListComponent,
    MapComponent,
    RouteListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LeafletModule,
    ListboxModule,
    AccordionModule,
    ButtonModule,
    NgxsModule.forRoot([
      DoctorsState,
      RouteState
    ], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ name: 'travellingsalesmanproblem'})
  ],
  providers: [
    DoctorsService,
    OpenRouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
