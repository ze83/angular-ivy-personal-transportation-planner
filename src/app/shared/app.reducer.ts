import { 
  ActionReducerMap, 
  createFeatureSelector,
  createSelector,
  ActionReducer, 
  MetaReducer 
} from '@ngrx/store';
import { transportReducer } from './transport.reducer';
import { environment } from '../../environments/environment';

export interface State {
}


export const reducers: ActionReducerMap<State> = {
  transports: transportReducer
};






export function logger(reducer: ActionReducer<any>)
    : ActionReducer<any> {
    return (state, action) => {
        console.log("state before: ", state);
        console.log("action", action);

        return reducer(state, action);
    }

}


export const metaReducers: MetaReducer<State>[] =
    !environment.production ? [logger] : [];

