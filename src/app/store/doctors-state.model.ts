import {Doctor} from '../models/doctor.model';

export interface DoctorsStateModel {
  loading: boolean;
  items: Doctor[];
}

export const DoctorsStateDefaults = {
  loading: false,
  items: []
};
