import { createAction, props } from "@ngrx/store";

export const openComponent = createAction(
    '[Any Component] Open Popup',
    props<{component: string}>()
)