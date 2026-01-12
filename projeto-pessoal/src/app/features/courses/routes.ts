import { Routes } from "@angular/router";
import { CreateCourseComponent } from "./create-course/create-course.component";
import { CoursesComponent } from "./courses-list.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { getCourseByIdResolver } from "./edit-course/resolvers/get-course-by-id-resolver";

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
  },
  { 
    path: 'edit-course/:id',
    data: { breadcrumb: 'Editar Cursos', title: 'Editar Cursos' },
    component: EditCourseComponent,
    resolve: {
      course: getCourseByIdResolver
    }
  }
] as Routes;
