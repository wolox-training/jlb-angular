import { MockUserCredentials } from './mocks/mock-user-credentials';
import { SignInData } from './interfaces/sign-in-data';
import { MockLoginService } from './mocks/mock-login-service';
import { LoginService } from './../../services/login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SignBaseModule } from './../../components/sign-base/sign-base.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';

describe('SignInComponent', () => {
  let fixture: ComponentFixture<SignInComponent>;
  let component: SignInComponent;
  let router: Router;
  let location: Location;

  const routes: Routes = [
    { path: 'sign-up', component: SignInComponent }
  ];

  function fillForm(userCredentials: SignInData): void {
    component.form.controls.email.setValue(userCredentials.email);
    component.form.controls.password.setValue(userCredentials.password);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        SignBaseModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        { provide: LoginService, useClass: MockLoginService}
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
  });

  describe('Test: when the component is started', () => {
    it('should create the SignUpComponent', () => {
      expect(component).toBeTruthy();
    });

    it('Submit button should be disabled', () => {
      const submitButton = fixture.nativeElement.querySelector('.form__submit');
      fixture.detectChanges();
      expect(submitButton.disabled).toBeTruthy();
    });
  });

  describe('Test: input fields filled in', () => {
    it('Submit (login) button should be enabled when form is filled', () => {
      fillForm(MockUserCredentials);
      const submitButton = fixture.nativeElement.querySelector('.form__submit');
      fixture.detectChanges();
      expect(submitButton.disabled).toBeFalsy();
      const alertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(alertMsg).toBeNull();
    });
  });

  describe('Test: alert messages and input validations', () => {
    it('Display alert msg when the email field is empty', () => {
      component.form.controls.email.markAsTouched();
      fixture.detectChanges();
      const emailAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(emailAlertMsg).toBeDefined();
      expect(emailAlertMsg.innerHTML).toContain('Debes completar este campo');
    });

    it('Display alert msg when the password field is empty', () => {
      component.form.controls.password.markAsTouched();
      fixture.detectChanges();
      const passwordAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(passwordAlertMsg).toBeDefined();
      expect(passwordAlertMsg.innerHTML).toContain('Debes completar este campo');
    });

    it('Display email alert msg when the input format is incorrect', () => {
      component.form.controls.email.setValue('asdf');
      component.form.controls.email.markAsTouched();
      fixture.detectChanges();
      const emailAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(emailAlertMsg).toBeDefined();
      expect(emailAlertMsg.innerHTML).toContain('Correo inválido');
    });
  });

  describe('Test: user login service', () => {
    it('should return a session object', () => {
      component.signIn(MockUserCredentials);
      fixture.detectChanges();
      expect(component.session).toBeDefined();
    });
  });

  describe('Test: login and sign-up buttons', () => {
    it('login button click should get the session', () => {
      fillForm(MockUserCredentials);
      const submitButton = fixture.debugElement.nativeElement.querySelector('.form__submit');
      fixture.detectChanges();
      submitButton.click();
      fixture.detectChanges();
      expect(component.session).toBeDefined();
    });

    it('sign-up button click should navigate to sign-up route', () => {
      const redirectButton = fixture.debugElement.nativeElement.querySelector('.button__redirect');
      fixture.detectChanges();
      redirectButton.click();
      fixture.detectChanges();
      expect(location.path()).toBe('/sign-up');
    });
  });
});
