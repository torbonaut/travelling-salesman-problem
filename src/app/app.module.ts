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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
