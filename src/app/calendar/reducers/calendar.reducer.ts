import { createReducer, on } from "@ngrx/store";
import { actuallySelectDate } from "../calendar.actions";
import { getEvents } from "src/app/event/event.actions";

export interface CalendarState {
    dateObject: {
        today: Date,
        timezone: string
    }
}

export const initialCalendarState = {
    dateObject : {
        today: new Date(),
        timezone: 'Etc/GMT',
    }
}

export const calendarReducer = createReducer(
    initialCalendarState,
    on(actuallySelectDate, (state, {date, data}) => {
        return {
            ...state,
            dateObject: {
                ...state.dateObject,
                today: date
            }  
        }
    }),
)