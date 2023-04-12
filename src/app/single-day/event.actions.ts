import { createAction, props } from "@ngrx/store";
import { Eventt } from "./event-model";

export const changeTree = createAction(
    '[singleDay] Change Tree',
    props<{tree: any[]}>()
);

