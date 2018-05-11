import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    // initialize before rendering template
    this.signupForm = new FormGroup({
      // first parameter is default value for the form field
      // don't want to execute the required method, only want to pass the reference
      // can have FormGroup within a FormGroup
      'userData': new FormGroup({
        // need to bind 'this' to the validation because Angular will be calling the function, not this code
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this is for the entire form, but could be called on an individual formControl
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  // difference from template-driven is no longer need
  // to get local reference because created here in the code
  onSubmit() {
    console.log(this.signupForm);
  }

  // want to add an array of controls
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // {nameIsForbidden: true} <-- example return
    // need to check for -1; else -1 is interpreted as true and will always return true
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    // if validation is successful MUST pass null
    return null;
  }

  // asynchronous validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null)
        }
      }, 1500);
    });
    return promise;
  }
}
