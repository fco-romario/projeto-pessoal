import { Routes } from "@angular/router";

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
