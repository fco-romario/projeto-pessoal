import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";

export default [
 {
   path: '',
   data: { breadcrumb: 'Dashboard', title: 'Dashboard' },
   component: HomeComponent,
 },
 {
   path: 'user',
   data: { breadcrumb: 'user', title: 'Usuário' },
   component: UserComponent,
 },
] as Routes;
