import { Section } from "./section";

export interface Connection {
  id: string,
  products: [],
  duration: string,
  sections: Section[],
  favorite: boolean
}