import { createReducer, on } from "@ngrx/store";
import { EventFailure, getEventsSuccess } from "../event.actions";

export interface EventState {
    changed: boolean,
    errors: string,
    events: any
}

export const initialEventState = {
    changed: false,
    errors: '',
    events: {}
}

export const EventReducer = createReducer(
    initialEventState, 
    on(EventFailure, (state: EventState) => {
        setTimeout(() => {
            return {
              ...state,
              errors: null
            };
        }, 2000);
        return {
          ...state,
          errors: 'There is an error'
        };
    }),
    on(getEventsSuccess, (state: EventState, {data}) => {
        return {
            ...state,
            events: data
        }
    })
)