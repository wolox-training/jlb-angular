import { SignInData } from './../interfaces/sign-in-data';
import { Observable, of, } from 'rxjs';

export class MockLoginService {

  login(userCredentials: SignInData): Observable<any> {
    return of({
      access_token: 'eyJ0eXAiOiJKV1QiLCJhbiAoOiJIUzI1NiJ9.eyJvX2F1dGhfYXBwbGljYXRpb25faWQiOjF9.h7ZNPpbd_Bu8yL27fmCAI_wgyZJI44b5eRRxwWUcwaQ',
      renew_id: 'KV1QiLCJhbiAoOiJIUzI1'
    });
  }
}
