import { Station } from './station';

export interface Departure {
  station: Station;
  departure: string;
  departureTimestamp: number;
  platform: string;
}
