import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { SignInData } from './../screens/sign-in/interfaces/sign-in-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(userCredential: SignInData): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      `${environment.rootLoginUrl}/users/sessions`,
      { session: userCredential },
      { headers }
    );
  }
}
