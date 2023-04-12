import { ActionReducerMap } from "@ngrx/store";
import { CalendarState, calendarReducer } from "../calendar/reducers/calendar.reducer";
import { UIReducer, UIState} from "../UI-store";

export interface AppState {
    calendar: CalendarState,
    UI: UIState
}
 export const reducers: ActionReducerMap<AppState> = {
    calendar: calendarReducer,
    UI: UIReducer
 }