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
        path: '**',
        redirectTo: ''
    }
];
