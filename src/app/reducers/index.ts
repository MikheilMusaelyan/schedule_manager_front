import { ActionReducerMap } from "@ngrx/store";
import { CalendarState, calendarReducer } from "../calendar/reducers/calendar.reducer";

export interface AppState {
    calendar: CalendarState
}
 export const reducers: ActionReducerMap<AppState> = {
    calendar: calendarReducer
 }