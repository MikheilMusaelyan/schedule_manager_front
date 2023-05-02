import { createAction, props } from "@ngrx/store";

export const changeTree = createAction(
    '[singleDay] Change Tree',
    props<{tree: any[]}>()
);

//add
export const addEvent = createAction(
    '[Event] Add Event',
    props<{event: any}>()
)
export const addEventSuccess = createAction(
    '[Effect] Add Event Success',
    props<{addedId: number, id: number}>()
)

// delete
export const deleteEvent = createAction(
    '[Event] Delete Event',
    props<{ id: number, parent: any, event: any, index: number }>()
)
export const deleteEventSuccess = createAction(
    '[Event] Delete Event Success',
)


//move
export const changeEvent = createAction(
    '[Event] Move Event',
    props<{id: number, event: any}>() 
)
export const moveEventSuccess = createAction(
    '[Event] Move Event Success',
)

//failure
export const EventFailure = createAction(
    '[Effect] Add Event Failure',
    props<{message: string}>()
)

