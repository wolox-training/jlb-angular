import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveSession(session): void {
    localStorage.setItem('access_token', session.access_token);
    localStorage.setItem('renew_id', session.renew_id);
  }

  removeSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('renew_id');
  }
}
