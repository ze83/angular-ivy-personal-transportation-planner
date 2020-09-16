import { TransportsState } from './transport.reducer';
import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import * as fromTransports from './transport.reducer';

export const selectTransportsState = createFeatureSelector<TransportsState>('transports');

export const selectTransports = createSelector(
  selectTransportsState,
  fromTransports.selectAll
);

export const selectEntities = createSelector(
  selectTransportsState,
  fromTransports.selectEntities
);

export const selectCurrentConnectionId = createSelector(
  selectTransportsState,
  // fromTransports.getSelectedUserId
  state => state.selectedConnectionId
);

export const selectCurrentConnection = createSelector(
  selectEntities,
  selectCurrentConnectionId,
  (entities, connectionId) => entities[connectionId]
);

export const selectFavoriteTransports = createSelector(
  selectTransports,
  connections => connections.filter(connection => connection.favorite === true)
);

export const areTransportsLoaded = createSelector(
  selectTransportsState,
  state => state.allTransportsLoaded
);

export const loading = createSelector(
  selectTransportsState,
  state => state.loading
);

