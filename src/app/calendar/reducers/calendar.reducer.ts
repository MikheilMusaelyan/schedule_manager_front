import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Eventt } from "src/app/single-day/event-model";

export const adapter = createEntityAdapter<Eventt>({});
export interface CalendarState extends EntityState<Eventt>{
    dateObject: {
        today: number,
        currentYear: number,
        currentMonth: number,
        currentDay: number,
        daysInMonth: number,
        firstDayOfMonth: number
    }
}

const today: Date = new Date();
const currentYear: number = today.getFullYear();
const currentMonth: number = today.getMonth();
const currentDay: number = today.getDate();
const daysInMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();
const firstDayOfMonth: number = new Date(currentYear, currentMonth, 1).getDay();

export const initialCalendarState = adapter.getInitialState({
    dateObject : {
        today,
        currentYear,
        currentMonth,
        currentDay,
        daysInMonth,
        firstDayOfMonth
    }
})