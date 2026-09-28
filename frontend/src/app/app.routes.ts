import { Routes } from '@angular/router';
import { CasosListPage } from './features/pages/casos-list-page/casos-list-page';
import { ResponsablesPage } from './features/pages/responsables-page/responsables-page';
export const routes: Routes = [
  {
    path: 'casos',
    component: CasosListPage,
  },
  {
    path: 'responsables',
    component: ResponsablesPage,
  },
  {
    path: '**',
    redirectTo: 'casos'
  }
];