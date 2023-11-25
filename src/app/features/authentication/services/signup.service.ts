import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {UserRequest, UserResponse} from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private url: string = 'https://demo-api.now.sh/users';

  constructor(private http: HttpClient) {}

  public signUp(user: UserRequest): Observable<UserResponse> {
    return this.http.post<any>(this.url, user);
  }
}
