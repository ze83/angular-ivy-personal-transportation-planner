import { Action, createAction, props } from '@ngrx/store';
import { Connection } from '../model/connection';
import { Transport } from '../model/transport';
import { Update } from '@ngrx/entity';


export const loadTransportParam = createAction (

  '[Load Transport Parameters] All Transport Parameters loaded',
  props<{transport: any}>()

);

export const loadTransports = createAction (

  '[Load Transports Effect] All Transports Found',
  props<{transports: Connection[]}>()

);

export const setConnectionFavorited = createAction (

  '[Edit Connection Preference] Set Connection preferited',
  props<{update: Update<Connection>}>()

);

export const setConnectionId = createAction(

  '[Set Connection] Connection Detail Opened',
  props<{id: string}>()

);
