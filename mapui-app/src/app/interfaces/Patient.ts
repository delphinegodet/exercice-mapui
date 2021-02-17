import {Treatment} from './Treatment';
import {Drug} from './Drug';

export interface Patient {
  firstName: string;
  lastName: string;
  age: number;
  sex: number;
  drugs: Drug[];
  treatments: Treatment[];
  _id: string;
}
