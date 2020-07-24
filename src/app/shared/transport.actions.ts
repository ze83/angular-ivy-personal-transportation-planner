import { Action } from "@ngrx/store";
import { Connection } from "../model/connection";

export const ADD_CONNECTION = '[CONNECTION] Added a new Connection';
export const REMOVE_CONNECTION = '[CONNECTION] Removed a Connection';
export const SET_CONNECTIONS = '[CONNECTIONS] Set the Connections';
export const ADD_FAVORITE_CONNECTION = '[CONNECTIONS] Add the favorite Connection';
export const REMOVE_FAVORITE_CONNECTION = '[CONNECTIONS] Remove a favorite Connection';
export const SET_FAVORITE_CONNECTIONS = '[CONNECTIONS] Set the favorite Connections';

export class AddConnection implements Action {
  readonly type = ADD_CONNECTION;
  constructor(public payload: Connection) {}
}

export class AddFavoriteConnection implements Action {
  readonly type = ADD_FAVORITE_CONNECTION;
  constructor(public payload: string) {}
}

export class RemoveConnection implements Action {
  readonly type = REMOVE_CONNECTION;
  constructor(public payload: string) {}
}

export class RemoveFavoriteConnection implements Action {
  readonly type = REMOVE_FAVORITE_CONNECTION;
  constructor(public payload: string) {}
}

export class SetConnections implements Action {
  readonly type = SET_CONNECTIONS;
  constructor(public payload: Connection[]) {}
}

export class SetFavoriteConnections implements Action {
  readonly type = SET_FAVORITE_CONNECTIONS;
}


export type ConnectionActions = AddConnection | AddFavoriteConnection | RemoveConnection 
| RemoveFavoriteConnection | SetConnections | SetFavoriteConnections;