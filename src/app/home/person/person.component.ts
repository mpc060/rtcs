import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Person } from 'src/app/shared/model/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person: Person;

  @Output() delete: EventEmitter<Person> = new EventEmitter<Person>();

  @Output() update: EventEmitter<Person> = new EventEmitter<Person>();

  constructor() { }

  ngOnInit() {}

}
