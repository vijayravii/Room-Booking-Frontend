import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  loading = false;
  // submitted = false;
  // returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private router: Router,
      private userService : UserService
  ) {
      // // redirect to home if already logged in
      // if (this.userService.currentUserValue) { 
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // user(){
  //   this.username = this.loginForm.controls['username'].value;
  //   this.password = this.loginForm.controls['password'].value;

  // var credentials = {
  //   username : this.username;
  //   password : this.password;
  // }
  // }

  onSubmit(){
    // console.log("user values : ", this.user);

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

    this.loading = true;
    this.userService.login(this.loginForm.value)
    .subscribe(
      data => {
        // const authToken = data.headers.get('authorization');
        //   console.log("Auth token is : ", authToken);
        // this.router.navigate(['/user']);
          this.toastr.error("Toastr : Login Failed");
          this.loading = false;

        },
        error =>  {
          console.log("Logged in Failed");

          this.router.navigate(['/user']);
          this.loading = false;
      }
    );
    
  }
  
  // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  // onSubmit() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     if (this.loginForm.invalid) {
  //         return;
  //     }

  //     this.loading = true;
  //     this.userService.login(this.f.username.value, this.f.password.value)
  //         .pipe(first())
  //         .subscribe(
  //             data => {
  //                 this.router.navigate([this.returnUrl]);
  //             },
  //             error => {
  //                 this.alertService.error(error);
  //                 this.loading = false;
  //             });
  // }
}
