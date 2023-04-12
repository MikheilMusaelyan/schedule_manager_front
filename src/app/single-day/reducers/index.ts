import { createReducer, on } from "@ngrx/store";
import { addEvent } from "../event.actions";
import { Eventt } from "../event-model";

export interface EventState {
    events: Eventt[]
}

export const initialEventState = {
    events: []
}

export const EventReducer = createReducer(
    initialEventState, 
    on(addEvent, (state: any, {event}) => ({
        ...state
    }))
)