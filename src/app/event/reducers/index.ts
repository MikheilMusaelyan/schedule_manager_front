import { createReducer, on } from "@ngrx/store";
import { EventFailure, changeTree } from "../event.actions";
import { actuallySelectDate } from "src/app/calendar/calendar.actions";

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
    on(actuallySelectDate, (state, {date, data}) => {
        if(data){
            return {
                ...state,
                events: data    
            }
        }
        return {
            ...state
        }
    }),
    
)