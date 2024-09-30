import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
password: any;
  constructor(private fb: FormBuilder,private userservice:UserService,private router:Router) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/),
        ],
      ],
    });
  }

  onSubmit(){

    if(this.form.valid){
      const userCredentials = this.form.value;
      this.userservice.storeUserCredentials(userCredentials);
      this.router.navigate(['/staff']);
    }

  };
}
