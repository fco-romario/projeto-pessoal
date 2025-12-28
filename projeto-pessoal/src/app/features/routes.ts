import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";

export default [
 {
    path: '',
    component: HomeComponent,
 },
 {
    path: 'user',
    component: UserComponent,
 },
] as Routes;
