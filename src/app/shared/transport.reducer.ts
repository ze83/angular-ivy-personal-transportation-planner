import { Connection } from "../model/connection";
import { 
  ConnectionActions,
  ADD_CONNECTION,
  ADD_FAVORITE_CONNECTION,
  REMOVE_CONNECTION,
  REMOVE_FAVORITE_CONNECTION,
  SET_CONNECTIONS,
  SET_FAVORITE_CONNECTIONS
  } from "./transport.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State {
    addConnection: Connection,
    addFavoriteConnection: string,
    removeConnection: string,
    removeFavoriteConnection: string,
    connections: Connection[],
    favoriteConnections: Connection[]
}

const initialState: State = {
  addConnection: null,
  addFavoriteConnection: null,
  removeConnection: null,
  removeFavoriteConnection: null,
  connections: [],
  favoriteConnections: []
}

export function transportReducer(state = initialState, action: ConnectionActions) {
  switch(action.type) {
    case ADD_CONNECTION:
      console.log(action.payload);
      return {
        ...state,
        connections: state.connections.concat(action.payload)
      };
    case ADD_FAVORITE_CONNECTION:
      console.log(action.payload);
      let favorite = {...state.connections.find(connect => connect.id === action.payload)}
      favorite.favorite = true;     
      return {
        ...state,
        favoriteConnections: state.favoriteConnections.concat(favorite)
      };    
    case REMOVE_CONNECTION:
      return {
        ...state,
        connections: state.connections.filter(connct => connct.id !== action.payload)
      };
    case REMOVE_FAVORITE_CONNECTION:
      return {
        ...state,
        favoriteConnections: state.favoriteConnections.filter(connct => connct.id !== action.payload)
      };
    case SET_CONNECTIONS:
      return {
        ...state,
        connections: action.payload
      };
    case SET_FAVORITE_CONNECTIONS:
      return {
        ...state,
        favoriteConnections: state.favoriteConnections
      };      
    default: {
      return state;
    }
  }
}

export const getAddedConnection = (state: State) => state.connections;
export const getRemovedConnection = (state: State) => state.connections;
export const getConnections = (state: State) => state.connections;

export const getAddedFavoriteConnection = (state: State) => state.favoriteConnections;
export const getRemovedFavoriteConnection = (state: State) => state.favoriteConnections;
export const getFavoriteConnections = (state: State) => state.favoriteConnections;