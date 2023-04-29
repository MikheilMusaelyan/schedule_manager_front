import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventState } from "./reducers";

export const selectEventState = createFeatureSelector<EventState>('events')

export const detectChange = createSelector(
    selectEventState, 
    (state: EventState) => state.changed
)
export const isLoading = createSelector(
    selectEventState, 
    (state: EventState) => state.loading
)

