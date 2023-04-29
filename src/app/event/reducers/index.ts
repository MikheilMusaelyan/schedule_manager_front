import { createReducer, on } from "@ngrx/store";
import { addEvent, addEventSuccess, addeventFailure, changeTree, deleteEvent, deleteEventSuccess, moveEvent, moveEventSuccess } from "../event.actions";

export interface EventState {
    events: any[],
    changed: boolean,
    loading: boolean,
    errors: string
}

export const initialEventState = {
    events: [],
    changed: false,
    loading: false,
    errors: ''
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
    on(addeventFailure, (state: EventState) => {
        setTimeout(() => {
            return {
              ...state,
              loading: false,
              errors: null
            };
        }, 3000);
        return {
          ...state,
          loading: false,
          errors: 'There is an error'
        };
    }),
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