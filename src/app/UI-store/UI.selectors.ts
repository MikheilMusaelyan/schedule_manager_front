import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from './index';

export const getUI = createFeatureSelector<UIState>('UI');

export const selectOpenComponent = createSelector(
    getUI, (state: UIState) => state.componentOpen
)

export const selectAbsoluteOpen = createSelector(
    getUI, (state: UIState) => state.absoluteOpen
)