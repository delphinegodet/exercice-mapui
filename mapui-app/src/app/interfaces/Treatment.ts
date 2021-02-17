import {Doctor} from './Doctor';

export interface Treatment {
  start: Date;
  end: Date;
  text: string;
  doctor: Doctor;
  _id: string;
}
