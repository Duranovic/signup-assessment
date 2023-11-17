import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AuthenticationRoutingModule } from "./authentication-routing.module";

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
  ]
})
export class AuthenticationModule { }
