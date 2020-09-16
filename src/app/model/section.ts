import { Departure } from "./departure";
import { Arrival } from "./arrival";
import { Walk } from './walk';
import { Journey } from './journey';

export interface Section {
  walk: Walk;
  departure: Departure;
  arrival: Arrival;
  journey: Journey;
}
