import { createReducer, on } from "@ngrx/store";
import { EventFailure, getEventSuccess, changeTree } from "../event.actions";

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
    on(changeTree, (state: EventState, {}) =>  {
        console.log('tree has changed')
        return {
            ...state,
            changed: !state.changed
        }
    }),
    on(getEventSuccess, (state, {data}) => {
        console.log('get events success')
        return {...state,
        events: data    }
    }),
    
)