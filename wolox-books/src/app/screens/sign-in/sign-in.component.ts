import { LocalStorageService } from './../../services/local-storage.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInData } from './interfaces/sign-in-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  session: any;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService) {}

  signIn(signInData: SignInData): void {
    this.loginService.login(signInData).subscribe(
      data => {
        this.session = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void{
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
    });
  }
}
