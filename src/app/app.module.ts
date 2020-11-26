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
import {ToolbarModule} from 'primeng/toolbar';
import {SidebarModule} from 'primeng/sidebar';
import {UiState} from './store/ui.state';
import {DialogModule} from 'primeng/dialog';
import { DoctorInfoModalComponent } from './components/doctor-info-modal/doctor-info-modal.component';
import { TermsPrivacyModalComponent } from './components/terms-privacy-modal/terms-privacy-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsListComponent,
    MapComponent,
    DoctorInfoModalComponent,
    TermsPrivacyModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LeafletModule,
    ListboxModule,
    ButtonModule,
    ToolbarModule,
    SidebarModule,
    DialogModule,
    NgxsModule.forRoot([
      DoctorsState,
      UiState
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
