import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers";

export const selectDateObject = (state: AppState) => state.calendar.dateObject;

export const selectDay = createSelector(
  selectDateObject,
  (dateObject) => dateObject
);

// export const selectTimezone = createSelector(
//   selectDateObject
// )