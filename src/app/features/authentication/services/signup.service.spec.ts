import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { userRequestMock, userResponseMock } from "../mocks/sign-up.mock";
import { UserResponse } from "../models/user.model";
import { SignupService } from './signup.service';

describe('SignupService', () => {
  let service: SignupService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(SignupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call signUp and return created user from the API', ()=>{
   service.signUp(userRequestMock).subscribe((user: UserResponse) => {
     expect(user).toEqual(userResponseMock);
   })
    const req: TestRequest = httpTestingController.expectOne(
        {
          method: 'POST',
          url: 'https://demo-api.now.sh/users'
        }
    );
    req.flush(userRequestMock);
    httpTestingController.verify();
  })
});
