import { createReducer, on } from "@ngrx/store";
import { EventFailure, addEvent, changeTree, CREATEvent, UPDATEvent, deleteEvent, REMOVEvent } from "../event.actions";
import { actuallySelectDate } from "src/app/calendar/calendar.actions";

export interface EventState {
    changed: boolean,
    errors: string,
    messages: string
    events: any,
}

export const initialEventState = {
    changed: false,
    errors: '',
    messages: '',
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
                events: data,   
            }
        }
        return {
            ...state
        }
    }),
    on(CREATEvent, (state: EventState, action) => {
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
            },
            messages: 'Event Created!'
        }
    }),
    on(UPDATEvent, (state: EventState, action) => {
        const day: number = new Date(action.event['date']).getDate();
        
        const updatedEvents = state.events[`d${day}`].map((event: any) => {
            if (event.serverId === action.event.serverId) {
              return { ...event, ...action.event };
            }
            return event;
        }); 
          
        return {
          ...state,
          events: {
            ...state.events,
            [`d${day}`]: updatedEvents,
          },
          messages: 'Event Updated!'
        };
    }),
    on(REMOVEvent, (state: EventState, action) => {
        const updatedEvents = state.events[`d${action.eventDay}`].filter((event: any) => {
            return event.serverId !== action.eventId;
        });
    
        return {
            ...state,
            events: {
                ...state.events,
                [`d${action.eventDay}`]: updatedEvents
            },
            messages: 'Event Removed!'
        };
    })
    
)