import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ROUTES_STRINGS } from '../constants/routing';
import { MainComponent } from './containers/main/main.component';
import { HomeComponent } from './containers/home/home.component';
import { TableComponent } from './containers/table/table.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: ROUTES_STRINGS.HOME,
        component: HomeComponent
      },
      {
        path: ROUTES_STRINGS.TABLE,
        component: TableComponent
      },
      {
        path: '**',
        redirectTo:  ROUTES_STRINGS.HOME
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
