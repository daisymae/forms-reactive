import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
      'username': new FormControl(null),
      'email': new FormControl(null),
      'gender': new FormControl('male')
    });
  }

  // difference from template-driven is no longer need
  // to get local reference because created here in the code
  onSubmit() {
    console.log(this.signupForm);
  }
}
