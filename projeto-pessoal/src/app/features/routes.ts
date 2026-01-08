import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";
import { getPersonByIdResolver } from "./user/resolvers/get-person-by-id-resolver";
import { CoursesComponent } from "./courses/courses-list.component";
import { CreateCourseComponent } from "./courses/components/create-course/create-course.component";

export default [
 {
   path: '',
   data: { breadcrumb: 'Dashboard', title: 'Dashboard' },
   loadChildren: () => import('./home/routes'),
 },
 {
   path: 'user',
   data: { breadcrumb: 'Usuário', title: 'Usuário' },
   loadChildren: () => import('./user/routes'),
 },
 {
    path: 'courses',
    data: { breadcrumb: 'Cursos', title: 'Cursos' },
    loadChildren: () => import('./courses/routes')
 },
] as Routes;
