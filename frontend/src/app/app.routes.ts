import { Routes } from '@angular/router';
import { CasosListPage } from './features/pages/casos-list-page/casos-list-page';
import { ResponsablesPage } from './features/pages/responsables-page/responsables-page';
import { ParagraphDemo } from './features/pages/demo/paragraph-demo/paragraph-demo';
import { TableDemo } from './features/pages/demo/table-demo/table-demo';
import { Badgedemo } from './features/pages/demo/badge-demo/badgedemo';
import { Selectdemo } from './features/pages/demo/selectdemo/selectdemo';
import { Buttondemo } from './features/pages/demo/buttondemo/buttondemo';
import { TextfieldDemo } from './features/pages/demo/textfield-demo/textfield-demo';
import { Paginatordemo } from './features/pages/demo/paginatordemo/paginatordemo';
import { SidePanelDemoComponent } from './features/pages/demo/sidepaneldemo/side-paneldemo';
import { BlockContainerDemo } from './features/pages/demo/block-container-demo/block-container-demo';
import { BlockLayoutDemo } from './features/pages/demo/block-layout-demo/block-layout-demo';
import { FlexLayoutDemo } from './features/pages/demo/flex-layout-demo/flex-layout-demo';
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
    path: 'demo/paragraph',
    component: ParagraphDemo,
  },
  {
    path: 'demo/table',
    component: TableDemo,
  },
  {
    path: 'demo/badge',
    component: Badgedemo,
  },
  {
    path: 'demo/button',
    component: Buttondemo,
  },
  {
    path: 'demo/select',
    component: Selectdemo,
  },
   {
    path: 'demo/textfield',
    component: TextfieldDemo,
  },
  {
    path: 'demo/paginator',
    component: Paginatordemo,
  },
  {
    path: 'demo/sidepanel',
    component: SidePanelDemoComponent,
  },
  {
    path: 'demo/block-container',
    component: BlockContainerDemo
  },
  {
    path: 'demo/block-layout',
    component: BlockLayoutDemo
  },
  {
    path: 'demo/flex-layout',
    component: FlexLayoutDemo
  },
  {
    path: '**',
    redirectTo: 'casos'
  }
];