import { createAction, props } from "@ngrx/store";

export const toggleMonth = createAction(
    '[Month Component] Toggle Month',
    props<{ bool : boolean }>()
)
export const toggleYear = createAction(
    '[Year Component] Toggle Year',
    props<{ bool : boolean }>()
)
