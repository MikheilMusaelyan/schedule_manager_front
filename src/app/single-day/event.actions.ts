import { createAction, props } from "@ngrx/store";

export const changeTree = createAction(
    '[singleDay] Change Tree',
    props<{tree: any[]}>()
);

