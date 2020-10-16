import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from './../../environments/environment';
import { SignInData } from './../screens/sign-in/interfaces/sign-in-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  login(userCredential: SignInData): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const request = this.http.post(
      `${environment.rootLoginUrl}/users/sessions`,
      { session: userCredential },
      { headers }
    );
    request.subscribe(data => {
        this.localStorageService.saveSession(data);
        this.router.navigate(['/books']);
      }
    );
    return request;
  }

  loggedIn(): boolean {
    return this.localStorageService.validateSession();
  }
}
