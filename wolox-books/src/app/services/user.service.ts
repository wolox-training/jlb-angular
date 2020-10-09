import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../screens/sign-up/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly ROOT_URL = 'https://books-training-rails.herokuapp.com/api/v1';

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.ROOT_URL + '/users', user, {headers});
  }
}
