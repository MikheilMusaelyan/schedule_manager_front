import { createReducer, on } from "@ngrx/store";
import { changeTree } from "../event.actions";

export interface EventState {
    events: any[],
    changed: boolean
}

export const initialEventState = {
    events: [],
    changed: false
}

export const EventReducer = createReducer(
    initialEventState, 
    on(changeTree, (state: EventState, {tree}) =>  (
        {
            ...state,
            events: tree,
            changed: !state.changed
        }
    ))
)