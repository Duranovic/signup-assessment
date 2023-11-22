import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {EMAIL_PATTERN} from "../constants/validator.constant";

@Component({
  selector: 'sign-up-assessment-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;

  /**
   * Initializes the sign-up form.
   */
  public ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      password: new FormControl('', this.passwordValidator())
    })
  }

  /**
   * Gets the value of the firstName FormControl.
   *
   * @returns The value of the firstName FormControl, or null if the FormControl does not exist.
   */
  get firstName() {
    return this.form?.get('firstName')?.value || null;
  }
  /**
   * Gets the value of the lastName FormControl.
   *
   * @returns The value of the lastName FormControl, or null if the FormControl does not exist.
   */
  get lastName() {
    return this.form?.get('lastName')?.value || null;
  }

  /**
   * Handles the sign-up form submission.
   */
  public signUp(): void {
    console.log(this.form);
  }

  /**
   * Creates a ValidatorFn that validates the password.
   * * `password`: A required FormControl of type string. Must meet the following requirements:
   *   * At least 8 characters long
   *   * Contains at least one lowercase letter and one uppercase letter
   *   * Does not contain the user's first or last name
   *
   * @returns A ValidatorFn that validates the password.
   */
  private passwordValidator(): ValidatorFn | null {
    return Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).+$/),
      this.noFirstNameLastNameValidator(),
    ]);
  }

  /**
   * Creates a ValidatorFn that validates the password does not contain the user's first or last name.
   *
   * @returns A ValidatorFn that validates the password does not contain the user's first or last name.
   */
  private noFirstNameLastNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: string = control.value;
      if (password?.includes(this.firstName) || password?.includes(this.lastName)) {
        return { noFirstNameLastName: true };
      }

      return null;
    };
  }
}
