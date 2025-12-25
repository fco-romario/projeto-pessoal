import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                loadChildren: () => import('./features/home/routes')
            }
        ]
    },
    {
        path: 'auth',
        loadComponent: () => import('./core/auth/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                loadChildren: () => import('./core/auth/pages/routes')
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
