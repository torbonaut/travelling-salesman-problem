import {Doctor} from '../models/doctor.model';

export interface DoctorsStateModel {
  loadingItems: boolean;
  loadedItems: boolean;
  loadingCoordinates: boolean;
  loadedCoordinates: boolean;
  items: Doctor[];
}

export const DoctorsStateDefaults = {
  loadingItems: false,
  loadedItems: false,
  loadingCoordinates: false,
  loadedCoordinates: false,
  items: []
};
