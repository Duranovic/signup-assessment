import { TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;

  beforeEach(() => {
     TestBed.configureTestingModule({
      providers: [SignInComponent],
    });

    component = TestBed.inject(SignInComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
