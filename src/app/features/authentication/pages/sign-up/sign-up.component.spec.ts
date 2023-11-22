import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from "@angular/forms";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  // Happy path

  it('should have a valid form', ()=>{
    const form = component.form;
    form.setValue({
      firstName: 'Velid',
      lastName: 'Duranovic',
      email: 'validemail@mymail.com',
      password: 'MyPassword123',
    });
    expect(form.valid).toBeTruthy();
  })
});
