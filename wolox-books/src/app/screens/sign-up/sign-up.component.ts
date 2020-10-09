import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SignUpData } from './interfaces/sign-up-data';
import { matchingValidator } from './helpers/utilities/matching.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.pattern(/^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/)])],
      password_confirmation: [null, Validators.compose([Validators.required])]
    },
    {
      validator: matchingValidator('password', 'password_confirmation')
    });
  }

  signUp(signUpData: SignUpData) {
    console.log('signUpData', signUpData);
  }

  ngOnInit(): void {
  }

}
