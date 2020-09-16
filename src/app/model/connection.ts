import { Section } from "./section";
import { Station } from "./station";

export interface Connection {
  id: string;
  products: [];
  duration: string;
  sections: Section[];
  favorite: boolean;
  from: {station: Station, departure: string};
  to: {station: Station, arrival: string};
  transfers: number;
}