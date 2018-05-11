import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    // initialize before rendering template
    this.signupForm = new FormGroup({
      // first parameter is default value for the form field
      // don't want to execute the required method, only want to pass the reference
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('male')
    });
  }

  // difference from template-driven is no longer need
  // to get local reference because created here in the code
  onSubmit() {
    console.log(this.signupForm);
  }
}
