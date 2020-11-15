import { state } from '@angular/animations';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Person } from '../shared/model/person';
import * as fromPersonActions from './person.actions';

export interface peopleState extends EntityState<Person> {}

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person> ({
    selectId: (p: Person) => p.id
});

export const initalState: peopleState = peopleAdapter.getInitialState({});

export function reducer(state=initalState, action: fromPersonActions.PersonActions) {
    switch(action.type) {   

        case fromPersonActions.PersonActionTypes.PERSON_NEW:
            return peopleAdapter.addOne(action.payload.person, state);

        case fromPersonActions.PersonActionTypes.PERSON_DELETE:
            return peopleAdapter.removeOne(action.payload.id, state);

        case fromPersonActions.PersonActionTypes.PERSON_UPDATE:
            return peopleAdapter.updateOne({id: action.payload.id, changes: action.payload.changes}, state);

        default:
            return state;
    }
}