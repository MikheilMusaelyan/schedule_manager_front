import { createReducer, on } from "@ngrx/store";
import { EventFailure, addEvent, changeTree, pushEvent } from "../event.actions";
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
        if(data != null){
            return {
                ...state,
                events: data    
            }
        }
        return {
            ...state
        }
    }),
    on(pushEvent, (state: EventState, action) => {
        const day: number = new Date(action.event['date']).getDate();
        let updatedDay: any = []
        if(state.events[`d${day}`]){
            updatedDay = [...state.events[`d${day}`], action.event];
        } else {
            updatedDay = [action.event]
        }
        
        return {
            ...state,
            events: {
                ...state.events,
                [`d${day}`]: updatedDay
            }
        }
    })
)