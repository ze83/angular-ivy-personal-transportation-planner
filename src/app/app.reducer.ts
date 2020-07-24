import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTransport from './shared/transport.reducer';

export interface State {
  transport: fromTransport.State;
}


export const reducers: ActionReducerMap<State> = {
  transport: fromTransport.transportReducer
};

export const getTransportState = createFeatureSelector<fromTransport.State>('transport');

export const getAddedConnection = createSelector(getTransportState, fromTransport.getAddedConnection);
export const getRemovedConnection = createSelector(getTransportState, fromTransport.getRemovedConnection);
export const getConnections = createSelector(getTransportState, fromTransport.getConnections);

export const getAddedFavoriteConnection = createSelector(getTransportState, fromTransport.getAddedFavoriteConnection);
export const getRemovedFavoriteConnection = createSelector(getTransportState, fromTransport.getRemovedFavoriteConnection);
export const getFavoriteConnections = createSelector(getTransportState, fromTransport.getFavoriteConnections);