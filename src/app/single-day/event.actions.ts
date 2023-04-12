import { createAction, props } from "@ngrx/store";
import { Eventt } from "./event-model";

export const addEvent = createAction(
    '[singleDay] Add Event',
    props<{event: Eventt}>()
);
export const moveEvent = createAction(
    '[singleDay] Move Event',
    props<{event: Eventt, parent: Eventt, index: number}>()
);
export const resizeEvent = createAction(
    '[singleDay] Resize Event',
    props<{e: boolean, event: Eventt, parent: Eventt, index: number}>()
);
// export const deleteEvent = createAction(
//     '[singleDay] Delete Event',
//     props<{event: Eventt}>()
// );

