import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";

export const appRoutes: Route[] = [
    {
        path: "", redirectTo: "sign-up", pathMatch: "full",
    },
    {
        path: '**',  component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
