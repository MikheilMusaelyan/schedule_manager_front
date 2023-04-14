import { createAction, props } from "@ngrx/store";

export const openComponent = createAction(
    '[Any Component] Open Popup',
    props<{component: string}>()
)

export const openAbsolute = createAction(
    '[single day] Open Absolute',
    props<{bool: boolean}>()
)