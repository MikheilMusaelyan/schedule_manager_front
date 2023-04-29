import { createAction, props } from "@ngrx/store";

export const changeTree = createAction(
    '[singleDay] Change Tree',
    props<{tree: any[]}>()
);

export const addEvent = createAction(
    '[Event] Add Event',
    props<{event: any}>() // TYPE OF EVENT
)

export const removeEvent = createAction(
    '[Event] Remove Event',
    props<{id: number}>() // TYPE OF EVENT
)

export const moveEvent = createAction(
    '[Event] Move Event',
    props<{id: number, event: any}>() // TYPE OF EVENT
)
