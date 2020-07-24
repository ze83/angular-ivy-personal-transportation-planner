import { Departure } from "./departure";
import { Arrival } from "./arrival";

export interface Section {
  departure: Departure,
  arrival: Arrival
}