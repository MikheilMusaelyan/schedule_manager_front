import { ActionReducerMap } from "@ngrx/store";
import { CalendarState, calendarReducer } from "../calendar/reducers/calendar.reducer";
import { UIReducer, UIState} from "../UI-store";
import { EventReducer, EventState } from "../single-day/reducers";

export interface AppState {
    calendar: CalendarState,
    UI: UIState,
    Events: EventState
}
 export const reducers: ActionReducerMap<AppState> = {
    calendar: calendarReducer,
    UI: UIReducer,
    Events: EventReducer
 }