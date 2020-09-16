import { Station } from './station';

export interface Arrival {
  station: Station;
  arrival: string;
  arrivalTimestamp: number;
  platform: string;
}
