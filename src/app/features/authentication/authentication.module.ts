import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [SignUpComponent],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        ReactiveFormsModule,
        NgOptimizedImage,
    ]
})
export class AuthenticationModule { }
