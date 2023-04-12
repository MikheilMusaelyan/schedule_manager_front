import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Eventt } from "src/app/single-day/event-model";
import { selectDate } from "../calendar.actions";

export const adapter = createEntityAdapter<Eventt>({});

export interface CalendarState extends EntityState<Eventt>{
    dateObject: {
        today: Date,
        timezone: string
    }
}

export const initialCalendarState = adapter.getInitialState({
    dateObject : {
        today: new Date(),
        timezone: 'Etc/GMT',
    }
})

export const calendarReducer = createReducer(
    initialCalendarState,
    on(selectDate, (state: any, { date }) => ({
        ...state, today: date
    }))
)