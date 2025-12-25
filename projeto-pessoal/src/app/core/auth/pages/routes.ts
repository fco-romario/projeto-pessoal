import { Routes } from "@angular/router";
import { LayoutComponent } from "../../layout/layout.component";
import { LoginComponent } from "./login/login.component";

export default [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    }
] as Routes;