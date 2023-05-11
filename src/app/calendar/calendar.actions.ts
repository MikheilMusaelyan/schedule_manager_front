import { createAction, props } from "@ngrx/store";

export const selectDate = createAction(
    '[Main page] Validate Selecting A Day',
    props<{ date: Date }>()
);

export const actuallySelectDate = createAction(
    '[Effect] Select Day',
    props<{ date: Date, data: any, upcoming: any }>()
);
