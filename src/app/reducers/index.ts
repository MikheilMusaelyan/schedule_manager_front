import { ActionReducerMap } from "@ngrx/store";
import { CalendarState, calendarReducer } from "../calendar/reducers/calendar.reducer";
import { UIReducer, UIState} from "../UI-store";
import { EventReducer, EventState } from "../event/reducers";

export interface AppState {
    calendar: CalendarState,
    UI: UIState,
    events: EventState
}
 export const reducers: ActionReducerMap<AppState> = {
    calendar: calendarReducer,
    UI: UIReducer,
    events: EventReducer
 }