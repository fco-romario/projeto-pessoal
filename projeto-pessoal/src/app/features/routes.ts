import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";
import { isAuthenticatedGuardGuard } from "../core/auth/guards/is-authenticated-guard";

export default [
 {
   path: '',
  //  canActivate: [isAuthenticatedGuardGuard],
   data: { breadcrumb: 'Dashboard', title: 'Dashboard' },
   component: HomeComponent,
 },
 {
   path: 'user',
  //  canActivate: [isAuthenticatedGuardGuard],
   data: { breadcrumb: 'Usuário', title: 'Usuário' },
   component: UserComponent,
 },
] as Routes;
