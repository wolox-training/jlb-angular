import { Observable } from 'rxjs';
import { SignInData } from './../screens/sign-in/interfaces/sign-in-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly ROOT_URL = 'https://private-anon-0c50cfb094-wbooksapi.apiary-mock.com/api/v1';
  constructor(private http: HttpClient) { }

  login(userCredential: SignInData): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      `${this.ROOT_URL}/users/sessions`,
      { session: userCredential },
      { headers }
    );
  }
}
