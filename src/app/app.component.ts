import { PersonNew, PersonAll, PersonUpdate, PersonDelete } from './store/person.actions';
import { Person } from './shared/model/person';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as faker from 'faker';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import * as fromPersonSelectors from './store/person.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  people$: Observable<Person[]>;

  constructor(
    private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new PersonAll());
    this.people$ = this.store.select(fromPersonSelectors.selectAll);
  }

  addNew() {
    let person: Person = {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      age: Math.round( Math.random( )* 100),
      id: new Date().getMilliseconds().toString()
    }
    this.store.dispatch(new PersonNew({person}));
  }

  update(p: Person) { 
    const person = {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      age: Math.round(Math.random() * 100)
    };
    this.store.dispatch(new PersonUpdate({ id: p.id, changes: person }));
  }

  delete(p: Person) {
    this.store.dispatch( new PersonDelete({id: p.id}));  
  }

}
