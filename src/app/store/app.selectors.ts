import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, appFeatureKey } from "./app.reducer";


export const appFeatureSelector = createFeatureSelector<State>(
    appFeatureKey
);

export const selectEmployees = createSelector(
    appFeatureSelector,
    (state:State) => state.employees
);

export const selectCurrentEmployee = createSelector(
    appFeatureSelector,
    (state:State) => state.selectedEmployee
);

export const isAdding = createSelector(
    appFeatureSelector,
    (state:State) => state.isAdding && !state.isEditing
)

export const isEditing = createSelector(
    appFeatureSelector,
    (state:State) => state.isEditing
)