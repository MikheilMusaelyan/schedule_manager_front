import { createAction, props } from "@ngrx/store";

export const changeTree = createAction(
    '[singleDay] Change Tree',
    props<{tree: any[]}>()
);

//add
export const addEvent = createAction(
    '[Event] Add Event',
    props<{event: any}>() // TYPE OF EVENT
)
export const addEventSuccess = createAction(
    '[Effect] Add Event Success',
)

// delete
export const deleteEvent = createAction(
    '[Event] Delete Event',
    props<{id: number}>() // TYPE OF EVENT
)
export const deleteEventSuccess = createAction(
    '[Event] Delete Event Success',
)

//move
export const moveEvent = createAction(
    '[Event] Move Event',
    props<{id: number, event: any}>() // TYPE OF EVENT
)
export const moveEventSuccess = createAction(
    '[Event] Move Event Success',
)

