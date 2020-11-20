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

@NgModule({
  declarations: [
    AppComponent,
    DoctorsListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LeafletModule,
    ListboxModule,
    AccordionModule,
    NgxsModule.forRoot([
      DoctorsState
    ], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ name: 'travellingsalesmanproblem'})
  ],
  providers: [
    DoctorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
