import { createReducer, on } from "@ngrx/store";
import { selectDate } from "../calendar.actions";


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
    on(selectDate, (state: any, { date }) => ({
        ...state, 
        dateObject: {
            ...state.dateObject,
            today: date
        }
    }))
)