import { Routes } from "@angular/router";
import { CreateCourseComponent } from "./create-course/create-course.component";
import { CoursesComponent } from "./courses-list.component";

export default [
  {
    path: '',
    data: { breadcrumb: '', title: '' },
    component: CoursesComponent,
  },
  { 
    path: 'create-course',
    data: { breadcrumb: 'Criar Cursos', title: 'Criar Cursos' },
    component: CreateCourseComponent
  }
] as Routes;
