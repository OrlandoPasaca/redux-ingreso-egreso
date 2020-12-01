import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario';
import { setUser, unSetUser } from './auth.actions';

export interface State {
    user: Usuario;
}

export const initialState: State = {
    user: null
};

// tslint:disable-next-line:variable-name
export const _authReducer = createReducer(initialState,
    on(setUser, (state, {user}) => ({...state, user})),
    on(unSetUser, state => ({ ...state, user: null})));

export function authReducer(state, action): State {
    return _authReducer(state, action);
}
