import { createAction, props } from "@ngrx/store";

export const addEvent = createAction(
    '[singleday] Move Event',
    props<{ event: any, parent: any, index: number }>()
);