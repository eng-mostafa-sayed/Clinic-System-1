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
  'createdAt': Date;
  'cupdatedAt': Date;
  'fileNo': string;
  'appointmentType': string;
  'status': boolean;
  'diagnoses': string;
  'allChecks': Check[];
  'visualAcuity': Sight;
  'waitingTime': Date;
}
