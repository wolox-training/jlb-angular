import { User } from './../interfaces/user';
import { Observable, of } from 'rxjs';

class MockUserService {

  createUser(user: User): Observable<any> {
    return of({
      id: 1,
      first_name: 'Carl',
      last_name: 'Sagan',
      email: 'carlsagan@cosmos.com',
      locale: 'en'
    });
  }
}
