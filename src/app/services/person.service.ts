import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Person } from '../shared/model/person';

const url = environment.apiRegister;

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient) { }

  save = (person: Person): Observable<Person> => this.http.post<Person>(url, person);

  edit = (person: Person): Observable<Person> => this.http.put<Person>(url + person.id, person);

  list = (): Observable<Person[]> => this.http.get<Person[]>(url);

  view = (id: number): Observable<Person> => this.http.get<Person>(url + id);

  delete = (id: number): Observable<void> => this.http.delete<void>(url + id);

}
