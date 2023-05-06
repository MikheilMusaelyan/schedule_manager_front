import { Action, createReducer, on } from '@ngrx/store';
import { openAbsolute, openComponent } from './UI.actions';
import { getEvents } from '../event/event.actions';
import { actuallySelectDate } from '../calendar/calendar.actions';

export interface UIState {
  componentOpen: string,
}

export const initialState: UIState = {
  componentOpen: '',
};

export const UIReducer = createReducer(
  initialState,
  on(openComponent, (state, { component }) => ({
    ...state,
    componentOpen: component
  })),
);

