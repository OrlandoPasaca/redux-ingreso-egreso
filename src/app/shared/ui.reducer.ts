import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false
};

// tslint:disable-next-line:variable-name
export const _IUReducer = createReducer(initialState,
    on(isLoading, (state) => ({ ...state, isLoading: true })),
    on(stopLoading, (state) => ({ ...state, isLoading: false })));

export function IUReducer(state, action) {
    return _IUReducer(state, action);
}
