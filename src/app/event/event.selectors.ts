import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventState } from "./reducers";
import { combineLatest } from "rxjs";

export const selectEventState = createFeatureSelector<EventState>('events')

export const detectChange = createSelector(
    selectEventState, 
    (state: EventState) => state.changed
)
export const detectGetEvents = createSelector(
    selectEventState,
    (state: EventState) => state.events
)


// messages & errors
export const messageSelector = createSelector(
    selectEventState, (state: EventState) => state.messages
)

export const errorSelector = createSelector(
    selectEventState, (state: EventState) => state.errors
)
