import { createReducer, on } from "@ngrx/store";
import { EventFailure } from "../event.actions";

export interface EventState {
    changed: boolean,
    errors: string
}

export const initialEventState = {
    changed: false,
    errors: ''
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
)