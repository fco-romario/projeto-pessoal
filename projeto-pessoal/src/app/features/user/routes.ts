import { Routes } from "@angular/router";
import { getPersonByIdResolver } from "./resolvers/get-person-by-id-resolver";
import { UserComponent } from "./user.component";

export default [
 {
   path: '',
   data: { breadcrumb: '', title: '' },
   component: UserComponent,
   resolve: {
      person: getPersonByIdResolver,
   }
 }
] as Routes;
