import { Action, createReducer, on } from '@ngrx/store';
import { toggleMonth, toggleYear } from './UI.actions';

export interface UIState {
  monthOpen: boolean,
  yearOpen: boolean
}

export const initialState: UIState = {
  monthOpen: false,
  yearOpen: false
};

export const UIReducer = createReducer(
  initialState,
  on(toggleMonth, (state, {bool}) => ({ ...state, monthOpen : bool })),
  on(toggleYear, (state, {bool}) => ({ ...state, yearOpen: bool }))
);

