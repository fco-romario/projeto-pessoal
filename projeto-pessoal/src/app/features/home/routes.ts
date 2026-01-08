import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

export default [
 {
   path: '',
   data: { breadcrumb: '', title: '' },
   component: HomeComponent,
 }
] as Routes;
