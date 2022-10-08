import { Check } from './check.model';
import { Sight } from './sight.model';

export class Patient {
  '_id': string;
  'name': string;
  'age': number;
  'fileNumber': number;
  'phoneNumber': string;
  'gender': string;
  'date': Date;
  'fileNo': string;
  'status': boolean;
  'allChecks': { check: Check; note: string }[];
  'visualAcuity': Sight;
}
