import { createReducer, on } from "@ngrx/store";
import { EventFailure, addEvent, changeTree, CREATEvent, UPDATEvent, deleteEvent, REMOVEvent, setMessage, getEvents } from "../event.actions";
import { actuallySelectDate } from "src/app/calendar/calendar.actions";
import { state } from "@angular/animations";

export interface EventState {
    changed: boolean,
    errors: number,
    messages: any
    events: any,
    loading: boolean
}

export const initialEventState = {
    changed: false,
    errors: null,
    messages: {
        message: '',
        bool: false
    },
    events: {},
    loading: false
}

export const EventReducer = createReducer(
    initialEventState, 
    on(EventFailure, (state: EventState) => {
        return {
          ...state,
          errors: new Date().getTime()
        };
    }),
    on(changeTree, (state: EventState, {}) =>  {
        return {
            ...state,
            changed: !state.changed
        };
    }),
    on(actuallySelectDate, (state, {date, data}) => {
        if(data != null){
            return {
                ...state,
                events: data,
            }
        }
        return {
            ...state,
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
            }
        }
    }),
    on(UPDATEvent, (state: EventState, action) => {
        const day: number = new Date(action.event['date']).getDate();
        const updatedEvents = state.events[`d${day}`].map((event: any) => {
            if (event.id === action.event.id) {
                return { ...event, ...action.event };
            }
            return event;
        }); 
          
        return {
            ...state,
            events: {
                ...state.events,
                [`d${day}`]: updatedEvents,
            }
        };
    }),
    on(REMOVEvent, (state: EventState, action) => {
        const updatedEvents = state.events[`d${action.eventDay}`].filter((event: any) => {
            return event.id !== action.eventId;
        });
    
        return {
            ...state,
            events: {
                ...state.events,
                [`d${action.eventDay}`]: updatedEvents
            }
        };
    }),
    on(setMessage, (state: EventState, message: any) => {
        return {
            ...state,
            messages: {
                message: message,
                bool: !state.messages.bool
            }
        }
    })
)