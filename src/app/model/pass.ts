import { Station } from './station';

export interface Pass {
  station: Station;
  arrival: string;
  departure: string;
  delay: number;
  platform: string;
}
