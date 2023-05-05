import { createAction, props } from "@ngrx/store";

export const changeTree = createAction(
    '[singleDay] Change Tree'
);

//add
export const addEvent = createAction(
    '[Event] Add Event',
    props<{event: any}>()
)

// delete
export const deleteEvent = createAction(
    '[Event] Delete Event',
    props<{ id: number, parent: any, event: any, index: number }>()
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

export const getEvents = createAction(
    '[App Component] Get Events',
    props<{date: Date}>()
)

export const pushEvent = createAction(
    '[Event Effect] push event',
    props<{event: any}>()
)
