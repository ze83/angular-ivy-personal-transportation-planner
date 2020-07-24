import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { from, Subject } from "rxjs";
import { tap, map, switchMap } from "rxjs/operators";
import { Connection } from "../model/connection";
import * as fromRoot from "../app.reducer";
import * as TransportActions from "../shared/transport.actions"
import { Departure } from "../model/departure";
import { Arrival } from "../model/arrival";



let URL = 'https://transport.opendata.ch/v1/connections?';
//let URL = 'https://transport.opendata.ch/v1/connections?from=dornach&to=Zurigo&datetime=';

@Injectable({
  providedIn: 'root'
})

export class TransportService {
  transportSubject = new Subject<Transport[]>();


  constructor(
    private store: Store<fromRoot.State>
  ) {

  }

  searchTransport(search: any) {
    //clean the search results before to get the news one:
    this.store.dispatch(new TransportActions.SetConnections([]));
    let query = `
      from=${search.from}&to=${search.to}&datetime=
    `;
    //console.log(query);
    let p = fetch(URL + query).then(result => result.json());
    from(p).pipe(
      switchMap(result => from(result.connections) || []),
      
      map(connect => {
        console.log(connect);
        let connection: Connection = {
          id: Math.random().toString(36).substring(2, 15),
          duration: this.getDuration(connect.duration),
          products: this.getProducts(connect.products) || '',
          sections: this.getTimeInfo(connect.sections) || [],
          favorite: false
        };
        return connection;
      })
      
      //tap(result => console.log(result)) //tap single connection
    ).subscribe(connection => {
      //console.log(connection);
      this.store.dispatch(new TransportActions.AddConnection(connection));
    });
  }

  addToFavorite(id: string) {
    this.store.dispatch(new TransportActions.AddFavoriteConnection(id));
  }

  removeFromFavorite(id: string) {
    this.store.dispatch(new TransportActions.RemoveFavoriteConnection(id));
  }

  loadTransports() {
    console.log('transports');
    let p = fetch(URL).then(result => result.json());
    from(p).pipe(
      tap(result => console.log(result))
    ).subscribe(result => result);
  }

  getDuration(duration: string) {
    if(duration != null) {
      return duration.substring(3);
    }
  }

  getProducts(products: any) {
    return products.join();
  }

  getTimeInfo(sections: any) {
    let info = [];
    let departure: Departure;
    let arrival: Arrival;
    let departureTime;
    let arrivalTime;
    if(sections.length === 1) {
      departure = sections[0].departure;
      arrival= sections[0].arrival;
    } else if(sections.length > 1){
      departure= sections[0].departure;
      arrival= sections[sections.length-1].arrival;
    }
    let departureDate = new Date(departure.departure);
    let arrivalDate = new Date(arrival.arrival);
    departureTime = 'Departure: ' + this.getHour(departureDate.getHours()) + ':' + this.getMinutes(departureDate.getMinutes());
    arrivalTime = 'Arrival: ' + this.getHour(arrivalDate.getHours()) + ':' + this.getMinutes(arrivalDate.getMinutes());

    console.log(departureTime);
    info.push(departureTime);
    info.push(arrivalTime);
    return info;
  }

  clearResults() {
    this.store.dispatch(new TransportActions.SetConnections([]));
  }

  getHour(hours: number) {
    if(hours<10) {
      return '0'+hours.toString();
    }else{
      return hours;
    }
  }

  getMinutes(minutes: number) {
    if(minutes<10) {
      return '0'+minutes.toString();
    }else{
      return minutes;
    }
  }
}