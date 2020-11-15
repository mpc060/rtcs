import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Person } from 'src/app/shared/model/person';
import { AppState } from 'src/app/store';
import { PersonsService } from 'src/app/services/person.service';
import { PersonNew, PersonDelete } from 'src/app/store/person.actions';
import * as fromPersonSelectors from 'src/app/store/person.selectors';
import { RegisterPersonComponent } from '../register-person/register-person.component';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  mockData = {
    propertion: [
      {
        name: 'Review required',
        color: '#F1A636', 
        bars: [],
        num: 30, 
        total: 120,
      },
      {
        name: 'Issue confirmed',
        color: '#398F90',
        bars: [],
        num: 25,
        total: 120,
      },
      {
        name: 'No issue',
        color: '#8DA656',
        bars: [],
        num: 11,
        total: 120,
      },
      {
        name: 'issue 2',
        color: '#933401',
        bars: [],
        num: 34,
        total: 120,
      },
      {
        name: 'Issue 3',
        color: '#F06300',
        bars: [],
        num: 20,
        total: 120,
      },
    ],
  };

  date = new Date();

  people$: Observable<Person[]>;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private personService: PersonsService ) {}

  ngOnInit() {
    this.people$ = this.personService.list();

    this.people$.subscribe((res) => {
      res.map((item: Person) => {
        this.store.dispatch(new PersonNew({person: item}));
      })
    })
  }

  addNew() {
    let dialog = this.dialog.open(RegisterPersonComponent, {
      height: 'max-content',
      width: '56%',
    });

    dialog.afterClosed().subscribe((res) => {
      if(res) {
        this.people$ = this.store.select(fromPersonSelectors.selectAll);
        this.people$ = this.personService.list();
      }
    });
  }

  update(person: Person) { 
    let dialog = this.dialog.open(RegisterPersonComponent, {
      height: 'max-content',
      width: '56%',
      data: {person}
    });

    dialog.afterClosed().subscribe((res) => {
      if(res) {
        this.people$ = this.store.select(fromPersonSelectors.selectAll);
        this.people$ = this.personService.list();
      }
    });
  }

  delete(p: Person) {
    this.store.dispatch( new PersonDelete({id: p.id}));  
    this.people$ = this.store.select(fromPersonSelectors.selectAll);
    this.personService.delete(p.id).subscribe(() => {})
  }

}
