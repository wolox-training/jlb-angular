import { MockUserCredentials } from './../screens/sign-in/mocks/mock-user-credentials';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('The login method should correctly perform the POST request', () => {
    service.login(MockUserCredentials).subscribe(() => {});
    const request = httpMock.expectOne(`${service.ROOT_URL}/users/sessions`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ session: MockUserCredentials});
  });
});
