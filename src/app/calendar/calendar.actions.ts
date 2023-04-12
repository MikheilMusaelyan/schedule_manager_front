import { createAction, props } from "@ngrx/store";

export const selectDate = createAction(
    '[main page] Select Day',
    props<{ date: Date }>()
);