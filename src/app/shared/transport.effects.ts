import { TransportService } from './../services/transport.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TransportActions } from './action-types';
import { tap, concatMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class TransportEffects {

  constructor(
    private actions$: Actions,
    private transportService: TransportService
    ) {

  }

  loadTransports$ = createEffect(

    () => this.actions$
          .pipe(
            ofType(TransportActions.loadTransportParam),
            concatMap(
              action => this.transportService.searchTransport(action.transport)
              // .pipe(
                // map(connections => TransportActions.loadTransports({transports: connections})),
                // catchError(() => EMPTY)
                // catchError(() => EMPTY)
              // )
            ),
            map(connections => TransportActions.loadTransports({transports: connections}))
          )

  );


}
