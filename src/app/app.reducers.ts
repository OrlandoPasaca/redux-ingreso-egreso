import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';

export interface AppState {
    user: auth.State;
    ui: ui.State;
}

export const appReducers: ActionReducerMap<AppState> =  {
    ui: ui.IUReducer,
    user: auth.authReducer
};
