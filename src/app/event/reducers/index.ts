import { createReducer, on } from "@ngrx/store";
import { addEvent, addEventSuccess, changeTree, deleteEvent, deleteEventSuccess, moveEvent, moveEventSuccess } from "../event.actions";

export interface EventState {
    events: any[],
    changed: boolean,
    loading: boolean
}

export const initialEventState = {
    events: [],
    changed: false,
    loading: false
}

export const EventReducer = createReducer(
    initialEventState, 
    on(changeTree, (state: EventState, {tree}) =>  (
        {
            ...state,
            events: tree,
            changed: !state.changed
        }
    )),
    on(addEvent, (state: EventState, {event}) => (
        {
            ...state,
            loading: true
        }
    )),
    on(addEventSuccess, (state: EventState) => (
        {
            ...state,
            loading: false
        }
    )),
    on(deleteEvent, (state: EventState, {id}) => (
        {
            ...state,
            loading: true
        }
    )),
    on(deleteEventSuccess, (state: EventState) => (
        {
            ...state,
            loading: false
        }
    )),
    on(moveEvent, (state: EventState) => (
        {
            ...state,
            loading: true
        }
    )),
    on(moveEventSuccess, (state: EventState) => (
        {
            ...state,
            loading: false
        }
    ))
)