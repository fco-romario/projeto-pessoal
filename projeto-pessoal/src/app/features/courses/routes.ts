import { Routes } from "@angular/router";
import { CreateCourseComponent } from "./components/create-course/create-course.component";
import { CoursesComponent } from "./courses-list.component";

export default [
  {
    path: '',
    data: { breadcrumb: '', title: '' },
    component: CoursesComponent,
  },
  { 
    path: 'create-course',
    data: { breadcrumb: 'Lista', title: 'Lista' },
    component: CreateCourseComponent
  }
] as Routes;
