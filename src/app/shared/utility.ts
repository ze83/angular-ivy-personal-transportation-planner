import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';
import { Connection } from '../model/connection';
import { Update } from '@ngrx/entity';
import { TransportActions } from './action-types';

@Injectable()
export class Utility {

  constructor(
    private datePipe: DatePipe
  ) {}

  transformTimeFormat(timestamp: string) {
    return this.datePipe.transform(timestamp, 'HH:mm'); //12:00
  }

  convertInMin(sec: number) {
    return parseInt((sec/60).toPrecision(2));
  }

  updateAllConnections(store: Store<fromRoot.State>, connections: Connection[], connctSelected: Connection) {
    const updateArray: Update<Connection>[] = [];

    connections.map(
      conn => {
        const _connection: Connection = {...conn};

        if (_connection.id === connctSelected.id) {
          _connection.highlighted = true;
        } else {
          _connection.highlighted = false;
        }

        const update: Update<Connection> = {
          id: _connection.id,
          changes: _connection
        };

        updateArray.push(update);
      }
    );

    store.dispatch(TransportActions.setAllConnectionsUpdated({update: updateArray}));
  }

}
