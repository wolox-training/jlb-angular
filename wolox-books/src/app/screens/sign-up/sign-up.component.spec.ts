import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MockUserService } from './mocks/mock-user-service';
import { User } from './interfaces/user';
import { MockUser } from './mocks/mock-user';
import { UserService } from './../../services/user.service';
import { SignBaseModule } from './../../components/sign-base/sign-base.module';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let fixture: ComponentFixture<SignUpComponent>;
  let component: SignUpComponent;
  let router: Router;
  let elements;
  const selectors = [
    { name: 'firstName', className: '.form__input[formControlName=first_name]' },
    { name: 'lastName', className: '.form__input[formControlName=last_name]' },
    { name: 'email', className: '.form__input[formControlName=email]' },
    { name: 'password', className: '.form__input[formControlName=password]' },
    { name: 'passwordConfirmation', className: '.form__input[formControlName=password_confirmation]' },
    { name: 'signUpButton', className: '.form__submit' }
  ];

  function fillForm(mockUser: User): void {
    component.form.controls.first_name.setValue(mockUser.first_name);
    component.form.controls.last_name.setValue(mockUser.last_name);
    component.form.controls.email.setValue(mockUser.email);
    component.form.controls.password.setValue(mockUser.password);
    component.form.controls.password_confirmation.setValue(mockUser.password_confirmation);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignUpComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        SignBaseModule,
        RouterTestingModule
      ],
      providers: [
        { provide: UserService, useClass: MockUserService}
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callFake(() => { });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    elements = selectors.reduce((a, c) => {
      a[c.name] = fixture.debugElement.nativeElement.querySelector(c.className);
      return a;
    }, {});
    fixture.detectChanges();
  });

  describe('Test: when the component is started', () => {
    it('should create the SignUpComponent', () => {
      expect(component).toBeTruthy();
    });

    it('A form should be with first name, last name, email, password, password confirmation input and sign up button', () => {
      expect(elements.firstName).toBeDefined();
      expect(elements.lastName).toBeDefined();
      expect(elements.email).toBeDefined();
      expect(elements.password).toBeDefined();
      expect(elements.passwordConfirmation).toBeDefined();
      expect(elements.signUpButton).toBeDefined();
      expect(component.form.value.locale).toEqual('en');
    });

    it('form should be invalid', () => {
      fixture.detectChanges();
      expect(component.form.valid).toBeFalsy();
    });

    it('Submit button should be disabled', () => {
      fixture.detectChanges();
      expect(elements.signUpButton.disabled).toBeTruthy();
    });
  });

  describe('Test: input fields filled in', () => {
    it('Submit button should be enabled when form is filled', () => {
      fillForm(MockUser);
      fixture.detectChanges();
      expect(elements.signUpButton.disabled).toBeFalsy();
      const alertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(alertMsg).toBeNull();
    });
  });

  describe('Test: alert messages and input validations', () => {
    it('Display alert msgs when the first name field is empty', () => {
      component.form.controls.first_name.markAsTouched();
      fixture.detectChanges();
      const firstNameAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(firstNameAlertMsg).toBeDefined();
      expect(firstNameAlertMsg.innerHTML).toContain('Debes completar este campo');
    });

    it('Display alert msgs when the last name field is empty', () => {
      component.form.controls.last_name.markAsTouched();
      fixture.detectChanges();
      const lastNameAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(lastNameAlertMsg).toBeDefined();
      expect(lastNameAlertMsg.innerHTML).toContain('Debes completar este campo');
    });

    it('Display alert msgs when the email field is empty', () => {
      component.form.controls.email.markAsTouched();
      fixture.detectChanges();
      const emailAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(emailAlertMsg).toBeDefined();
      expect(emailAlertMsg.innerHTML).toContain('Debes completar este campo');
    });

    it('Display alert msgs when the password field is empty', () => {
      component.form.controls.password.markAsTouched();
      fixture.detectChanges();
      const passwordAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(passwordAlertMsg).toBeDefined();
      expect(passwordAlertMsg.innerHTML).toContain('Debes completar este campo');
    });

    it('Display alert msgs when the password confirmation field is empty', () => {
      component.form.controls.password_confirmation.markAsTouched();
      fixture.detectChanges();
      const passwordConfirmationAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(passwordConfirmationAlertMsg).toBeDefined();
      expect(passwordConfirmationAlertMsg.innerHTML).toContain('Debes completar este campo');
    });

    it('Display email alert msg when the input format is incorrect', () => {
      component.form.controls.email.setValue('asdf');
      component.form.controls.email.markAsTouched();
      fixture.detectChanges();
      const emailAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(emailAlertMsg).toBeDefined();
      expect(emailAlertMsg.innerHTML).toContain('Correo inválido');
    });

    it('Hidde email alert msg when the input format is correct', () => {
      component.form.controls.email.setValue(MockUser.email);
      component.form.controls.email.markAsTouched();
      fixture.detectChanges();
      const emailAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(emailAlertMsg).toBeNull();
    });

    it('Display password alert msg when the input format is incorrect', () => {
      component.form.controls.password.setValue(MockUser.password.toLowerCase());
      component.form.controls.password.markAsTouched();
      fixture.detectChanges();
      const passwordAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(passwordAlertMsg).toBeDefined();
      expect(passwordAlertMsg.innerHTML).toContain('Al menos una mayúscula y un número');
    });

    it('Hidde password alert msg when the input format is correct', () => {
      component.form.controls.password.setValue(MockUser.password);
      component.form.controls.password.markAsTouched();
      fixture.detectChanges();
      const passwordAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(passwordAlertMsg).toBeNull();
    });

    it('Display confirmation password alert msg when the input format is incorrect', () => {
      component.form.controls.password.setValue(MockUser.password);
      component.form.controls.password.markAsTouched();
      component.form.controls.password_confirmation.setValue(MockUser.password.slice(0, 2));
      component.form.controls.password_confirmation.markAsTouched();
      fixture.detectChanges();
      const confirmationPasswordAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(confirmationPasswordAlertMsg).toBeDefined();
      expect(confirmationPasswordAlertMsg.innerHTML).toContain('El password no coincide');
    });

    it('Hidde confirmation password alert msg when the input format is correct', () => {
      component.form.controls.password.setValue(MockUser.password);
      component.form.controls.password.markAsTouched();
      component.form.controls.password_confirmation.setValue(MockUser.password);
      component.form.controls.password_confirmation.markAsTouched();
      fixture.detectChanges();
      const confirmationPasswordAlertMsg = fixture.debugElement.nativeElement.querySelector('.form__alert');
      expect(confirmationPasswordAlertMsg).toBeNull();
    });
  });

  describe('Test: user registration service', () => {
    it('should return an user detial object', () => {
      component.signUp(MockUser);
      fixture.detectChanges();
      expect(component.user).toBeDefined();
    });

    it('should return an error object', () => {
      MockUser.email = 'julian.lopera@wolox.co';
      component.signUp(MockUser);
      fixture.detectChanges();
      expect(component.error).toBeDefined();
    });
  });
});
