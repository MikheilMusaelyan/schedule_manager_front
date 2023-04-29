import { Action, createReducer, on } from '@ngrx/store';
import { openAbsolute, openComponent } from './UI.actions';

export interface UIState {
  componentOpen: string,
  absoluteOpen: boolean
}

export const initialState: UIState = {
  componentOpen: '',
  absoluteOpen: false
};

export const UIReducer = createReducer(
  initialState,
  on(openComponent, (state, { component }) => ({
    ...state,
    componentOpen: component
  })),
  on(openAbsolute, (state, { bool }) => ({
    ...state,
    absoluteOpen: bool
  }))
);

