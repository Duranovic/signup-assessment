import { of } from "rxjs";
import { Router } from "@angular/router";
import { TestBed } from '@angular/core/testing';
import { FormGroup } from "@angular/forms";
import { SignUpComponent } from './sign-up.component';
import { SignupService } from "../../services/signup.service";
import { userRequestMock, userResponseMock } from "../../mocks/sign-up.mock";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let signUpMockService = {
    signUp: jest.spyOn(SignupService.prototype,'signUp').mockReturnValue(of(userResponseMock)),
  };
  let routerMock = {
    navigate: jest.spyOn(Router.prototype,'navigate')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          SignUpComponent,
          { provide: SignupService, useValue: signUpMockService },
          { provide: Router, useValue: routerMock }
      ],
    });

    component = TestBed.inject(SignUpComponent);
    component.ngOnInit();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require first name', () => {
    const firstName = component.form.get('firstName');
    firstName?.setValue('');
    expect(firstName?.valid).toBeFalsy();
  });

  it('should require last name', () => {
    const lastName = component.form.get('lastName');
    lastName?.setValue('');
    expect(lastName?.valid).toBeFalsy();
  });

  it('should require a valid email', () => {
    const email = component.form.get('email');
    email?.setValue('invalidemail'); // Set an invalid email
    expect(email?.valid).toBeFalsy();
  });

  it('should require a valid password', () => {
    const password = component.form.get('password');
    password?.setValue('weak'); // Set a weak password
    expect(password?.valid).toBeFalsy();
  });

  it('should not allow password to contain first name', () => {
    const firstName = component.form.get('firstName');
    firstName?.setValue("Velid");

    const password = component.form.get('password');
    password?.setValue('Password123' + firstName?.value); // Set password containing first name
    expect(password?.hasError('noFirstNameLastName')).toBeTruthy();
  });

  it('should not allow password to contain last name', () => {
    const lastName = component.form.get('lastName');
    lastName?.setValue("Duranovic");

    const password = component.form.get('password');
    password?.setValue('Password123' + lastName?.value); // Set password containing first name
    expect(password?.hasError('noFirstNameLastName')).toBeTruthy();
  });

  it('should have a valid form', ()=>{
    const form: FormGroup = component.form;
    form.setValue({
      firstName: 'Velid',
      lastName: 'Duranovic',
      email: 'validemail@mymail.com',
      password: 'MyPassword123',
    });
    expect(form.valid).toBeTruthy();
  })

  it('should sign up the user', async () => {
    component.form.setValue(userRequestMock);
    component.signUp();
    expect(component.loading).toBeFalsy();
    expect(signUpMockService.signUp).toHaveBeenCalledWith(userRequestMock);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/sign-in']);
  });
});
