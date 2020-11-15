import { ActionReducerMap } from '@ngrx/store';
import * as fromPersonReducer from './person.reducer';

export interface AppState {
    people: fromPersonReducer.peopleState;
}

export const appReducers : ActionReducerMap<AppState> = {
    people: fromPersonReducer.reducer
}

  