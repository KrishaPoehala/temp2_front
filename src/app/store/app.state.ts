import { RouterReducerState } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, MetaReducer, createReducer } from "@ngrx/store";

import * as fromRouter from '@ngrx/router-store';
import { environment } from "src/environments/environment";
import { appFeatureKey, reducer } from "./app.reducer";
import * as fromAppState from './app.reducer'
export interface AppState{
    router: fromRouter.RouterReducerState;
    [fromAppState.appFeatureKey]:fromAppState.State;
}

export const routerKey = "router";

export const reducers:ActionReducerMap<AppState> = {
    [routerKey]:fromRouter.routerReducer,
    [fromAppState.appFeatureKey]:fromAppState.reducer,
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);
        
        return reducer(state, action);
    };
}
      
export const metaReducers: MetaReducer<AppState>[] = !environment.production
      ? [debug]
      : [];
