import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";
import { getPersonByIdResolver } from "./user/resolvers/get-person-by-id-resolver";
import { CoursesComponent } from "./courses/courseslist.component";
import { CreateCourseComponent } from "./courses/components/create-course/create-course.component";

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
 {
    path: 'courses',
    data: { breadcrumb: 'Cursos', title: 'Cursos' },
    component: CoursesComponent,
 },
  {
    path: 'create-course',
    data: { breadcrumb: 'Criar Cursos', title: 'Cursos' },
    component: CreateCourseComponent
  }
] as Routes;
