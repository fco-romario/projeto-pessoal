import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";
import { getPersonByIdResolver } from "./user/resolvers/get-person-by-id-resolver";

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
   resolve: {
      person: getPersonByIdResolver,
   }
 },
] as Routes;
