import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CalendarState } from "./reducers/calendar.reducer";

export const selectCalendarState = createFeatureSelector<CalendarState>('calendar');

export const selectToday = createSelector(
  selectCalendarState,
  (state: CalendarState) => state.dateObject.today
);

export const selectTimezone = createSelector(
  selectCalendarState,
  (state: CalendarState) => state.dateObject.timezone
);