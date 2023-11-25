import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {EMAIL_PATTERN} from "../../constants/validator.constant";
import {SignupService} from "../../services/signup.service";
import {Router} from "@angular/router";
import {UserRequest, UserResponse} from "../../models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'sign-up-assessment-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private readonly signupService: SignupService, private router: Router) {
  }

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
    const userModel: UserRequest = this.form.getRawValue();

    this.loading = true;
    this.subscription.add(
      this.signupService.signUp(userModel).subscribe((user: UserResponse) => {
        this.loading = false;
        /* We could probably introduce some kind of toaster to show a message that account has been created and
         then navigate to the sign in page.
         */
        this.router.navigate(['/sign-in']);
        console.log(user);
      })
    );
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

  /**
   * This method is called when the component is destroyed.
   * It unsubscribes from the subscription so that it doesn't continue to emit values after the component is gone.
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
