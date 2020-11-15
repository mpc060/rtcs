import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PersonsService } from 'src/app/services/person.service';
import { Person } from 'src/app/shared/model/person';
import { AppState } from 'src/app/store';
import { PersonNew, PersonUpdate } from 'src/app/store/person.actions';

@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss']
})
export class RegisterPersonComponent implements OnInit {

  register: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Person,
    public dialog: MatDialogRef<RegisterPersonComponent>,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private personService: PersonsService) {}

  ngOnInit() {
    if (this.data) {
      this.createForm(this.data['person']);
    } else {
      this.createForm(this.initializeForm());
    }
  }

  private createForm(person: Person): void {
    this.register = this.fb.group({
      name: [person.name, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      age: [person.age, [Validators.required, Validators.maxLength(2)]],
      address: [person.address, [Validators.required]],
      city: [person.city, [Validators.required]],
      country: [person.country, [Validators.required, Validators.min(0), Validators.max(64)]],
    });
  }

  private initializeForm(): Person {
    return {
      id: null,
      name: null,
      age: null,
      address: null,
      city: null,
      country: null
    } as Person;
  }

  submit() {
    if (this.register.invalid) return;

    const person = this.register.getRawValue() as Person;

    if (this.data) {
      this.edit(person);
    } else {
      this.save(person);
    }
  }

  edit(person: Person) {
    person.id = this.data['person'].id ;
    console.log(person);
    this.personService.edit(person).subscribe((res) => {
      this.store.dispatch(new PersonUpdate({ id: person.id, changes: person }));
      this.dialog.close({data: person});
    },
    (error) => {
      console.log(error);
    });
  }

  save(person: Person) {
    this.personService.save(person).subscribe((res) => {
      this.store.dispatch(new PersonNew({person}));
      this.dialog.close({data: person});
    },
    (error) => {
      console.log(error);
    });
  }

  close() {
    this.dialog.close();
    this.register.reset();
  }

}
