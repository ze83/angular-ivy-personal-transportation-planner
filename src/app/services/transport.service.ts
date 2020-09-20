import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { from, Subject, Observable } from "rxjs";
import { tap, map, switchMap } from "rxjs/operators";
import { Connection } from "../model/connection";
import * as fromRoot from "../shared/app.reducer";
import * as TransportActions from "../shared/transport.actions"
import { Departure } from "../model/departure";
import { Arrival } from "../model/arrival";
import { Section } from "../model/section";
import { Utility } from "../shared/utility";



let URL = 'https://transport.opendata.ch/v1/connections?';
//let URL = 'https://transport.opendata.ch/v1/connections?from=dornach&to=Zurigo&datetime=';

@Injectable({
  providedIn: 'root'
})

export class TransportService {
  transportSubject = new Subject<Transport[]>();
  connections$ = new Observable<Connection[]>();
  connections: Connection[] = [];
  constructor(
    private store: Store<fromRoot.State>,
    private utility: Utility
  ) {

  }

  async fetchTransports(param: string) {
    // console.log(URL+param);
    const p = await fetch(URL + param).then(result => result.json()).then(result => {
      // console.log(result.connections);
      return result.connections;
    }).catch(error => console.log('errore di connessione', error));

    // from(p).pipe(
      // map(connection => console.log(connection))
      //  tap(result => console.log(result))
    // );
    return p;
  }

  searchTransport(search: any): Observable<Connection[]> {
    // clean the search results before to get the news one:

    this.connections = [];

    const query = `
      from=${search.from}&
      to=${search.to}&
      date=${search.date}&
      time=${search.time}&
      page=${search.page}
    `;

    return from(this.fetchTransports(query)).pipe(
      // switchMap(result => from(result)),
      map((connects: Connection[]) => {

        if (connects != null) {
          connects.forEach((connect: Connection) => {
            const conn: Connection = {
              id: Math.random().toString(36).substring(2, 15),
              duration: this.getDuration(connect.duration),
              products: this.getProducts(connect.products) || '',
              // sections: this.getSections(connect) || [],
              sections: this.getSections(connect).sections || [],
              favorite: false,
              from: this.getFrom(connect),
              to: this.getTo(connect),
              transfers: connect.transfers,
              highlighted: false
            };
            this.connections.push(conn);
          });
        } else {
          console.log('error');
        }


        connects = this.connections;
        return connects;
      })
    );

  }

  addToFavorite(id: string) {
    // this.store.dispatch(new TransportActions.AddFavoriteConnection(id));
  }

  removeFromFavorite(id: string) {
    // this.store.dispatch(new TransportActions.RemoveFavoriteConnection(id));
  }

  loadTransports() {
    console.log('transports');
    let p = fetch(URL).then(result => result.json());
    from(p).pipe(
      tap(result => console.log(result))
    ).subscribe(result => result);
  }

  getDuration(duration: string) {
    if (duration != null) {
      const _new = duration.substring(3);
      const arr = _new.split(':', 2);
      return arr[0] + ' h ' + arr[1] + ' m ';
    }
  }

  getProducts(products: any) {
    return products.join();
  }

  getFrom(connection: Connection) {
    connection.from.departure = this.utility.transformTimeFormat(
      connection.from.departure
    );
    return connection.from;
  }

  getTo(connection: Connection) {
    connection.to.arrival = this.utility.transformTimeFormat(
      connection.to.arrival
    );
    return connection.to;
  }

  getSections(connection: Connection) {
    connection.sections.map(
      section => {
        section.departure.departure = this.utility.transformTimeFormat(section.departure.departure);
        section.arrival.arrival = this.utility.transformTimeFormat(section.arrival.arrival);
        section.journey = this.getJourney(section);
        return section;
      }
    );
    return connection;
  }

  getJourney(section: Section) {
    if (section.journey !== null) {
      section.journey.passList.map(
        pass => {
          if (pass.departure !== null) {
            pass.departure = this.utility.transformTimeFormat(pass.departure);
          }
          if (pass.arrival !== null) {
            pass.arrival = this.utility.transformTimeFormat(pass.arrival);
          }
          return pass;
        }
      );
      return section.journey; //a journey obj
    }
    return null;
  }

  getTimeInfo(sections: any) {
    const info = [];
    let departure: Departure;
    let arrival: Arrival;
    let departureTime: string;
    let arrivalTime: string;
    if (sections.length === 1) {
      departure = sections[0].departure;
      arrival = sections[0].arrival;
    } else if (sections.length > 1) {
      departure = sections[0].departure;
      arrival = sections[sections.length - 1].arrival;
    }
    const departureDate = new Date(departure.departure);
    const arrivalDate = new Date(arrival.arrival);
    departureTime = 'Departure: ' + this.getHour(departureDate.getHours()) + ':' + this.getMinutes(departureDate.getMinutes());
    arrivalTime = 'Arrival: ' + this.getHour(arrivalDate.getHours()) + ':' + this.getMinutes(arrivalDate.getMinutes());

    // console.log(departureTime);
    info.push(departureTime);
    info.push(arrivalTime);
    return info;
  }

  clearResults() {
    // this.store.dispatch(new TransportActions.SetConnections([]));
  }

  getHour(hours: number) {
    if (hours < 10) {
      return '0' + hours.toString();
    } else {
      return hours;
    }
  }

  getMinutes(minutes: number) {
    if(minutes < 10) {
      return '0' + minutes.toString();
    } else {
      return minutes;
    }
  }
}
