import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Transport } from '../model/transport';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Connection } from '../model/connection';
import { TransportActions } from './action-types';

export interface TransportsState extends EntityState<Connection> {
  allTransportsLoaded: boolean; //
  loading: boolean;
  selectedConnectionId: string;
}

export const adapter = createEntityAdapter<Connection>(

);

export const initialTransportsState = adapter.getInitialState({
  allTransportsLoaded: false,
  loading: false,
  selectedConnectionId: null
});

export const transportReducer = createReducer(

    initialTransportsState,

    on(TransportActions.loadTransportParam,
      (state, action) => {

        if (action.transport.page === 0) {
          return adapter.removeAll(
            {
              ...state,
              allTransportsLoaded: false,
              loading: true
            }
            );
        } else {
          return {
            ...state,
            allTransportsLoaded: true,
            loading: true
          };
        }

      }
    ),

    on(TransportActions.loadTransports,
      (state, action) => adapter.addMany(
          action.transports,
          {...state,
            allTransportsLoaded: true,
            loading: false
          }
      )),

    on(TransportActions.setConnectionFavorited,
      (state, action) => adapter.updateOne(action.update, state)),

    on(TransportActions.setConnectionId,
      (state, action) => ({...state, selectedConnectionId: action.id})
      )

);

export const getSelectedUserId = (state: TransportsState) => state.selectedConnectionId;


export const {
  selectEntities,
  selectAll
} = adapter.getSelectors();
