import { createReducer, on } from "@ngrx/store";
import { changeTree } from "../event.actions";

export interface EventState {
    events: any[]
}

export const initialEventState = {
    events: []
}

export const EventReducer = createReducer(
    initialEventState, 
    on(changeTree, (state: any, {tree}) => ({
        ...state,
        events: tree
    }))
)