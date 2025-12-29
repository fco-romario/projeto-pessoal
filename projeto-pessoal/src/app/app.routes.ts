import { Routes } from '@angular/router';
import { isAuthenticatedGuardGuard } from './core/auth/guards/is-authenticated-guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [
            isAuthenticatedGuardGuard
        ],
        loadComponent: () => import('./core/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                loadChildren: () => import('./features/routes')
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
