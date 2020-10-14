import { User } from './../interfaces/user';
import { Observable, of, throwError } from 'rxjs';

export class MockUserService {

  createUser(user: User): Observable<any> {
    if (user.email === 'julian.lopera@wolox.co') {
      return throwError({
        errors: {
          email: ['has already been taken'],
          full_messages: ['Email has already been taken']
        }
      }
    );
    } else {
      return of({
        id: 1,
        first_name: 'Carl',
        last_name: 'Sagan',
        email: 'carlsagan@cosmos.com',
        locale: 'en'
      });
    }
  }
}
