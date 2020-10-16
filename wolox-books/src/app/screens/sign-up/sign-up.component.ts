import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './interfaces/user';
import { matchingValidator } from './helpers/utilities/matching.validator';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  public user: any;
  public error: any;

  constructor(private fb: FormBuilder, private userSevice: UserService, private router: Router) {}

  signUp(user: User): void {
    this.userSevice.createUser(user).subscribe(
      (data: any) => {
        this.user = data;
        console.log('Success');
        this.router.navigate(['login']);
      },
      (err) => {
        console.log('Unsuccess');
        this.error = err;
        console.log('err', err);
      }
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.pattern(/^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/)])],
      password_confirmation: [null, Validators.compose([Validators.required])],
      locale: ['en']
    },
    {
      validator: matchingValidator('password', 'password_confirmation')
    });
  }
}
