import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Eventt } from "src/app/single-day/event-model";
import { addEvent } from "../calendar.actions";

const today: Date = new Date();

export const adapter = createEntityAdapter<Eventt>({});

export interface CalendarState extends EntityState<Eventt>{
    dateObject: {
        today: Date,
        timezone: string
    }
}

export const initialCalendarState = adapter.getInitialState({
    dateObject : {
        today: today,
        timezone: 'Etc/GMT'
    }
})

export const calendarReducer = createReducer(
    initialCalendarState,
    on(addEvent, (state: any) => ({
        ...state
    }))
)