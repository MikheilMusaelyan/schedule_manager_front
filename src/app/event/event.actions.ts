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
    props<{event: any}>() 
)
export const moveEventSuccess = createAction(
    '[Event] Move Event Success',
)

//failure
export const EventFailure = createAction(
    '[Effect] Add Event Failure'
)

export const getEvents = createAction(
    '[App Component] Get Events',
    props<{date: Date}>()
)

export const CREATEvent = createAction(
    '[Effect] CREATE event',
    props<{event: any}>()
)
export const REMOVEvent = createAction(
    '[Effect] REMOVE event',
    props<{eventId: any, eventDay: number}>()
)
export const UPDATEvent = createAction(
    '[Effect] UPDATE event',
    props<{event: any}>()
)
export const setMessage = createAction(
    '[Effect] Set Message',
    props<{message: string}>()
)