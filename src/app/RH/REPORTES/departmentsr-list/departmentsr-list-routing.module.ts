import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentsRListComponent} from './departmentsr-list.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsRListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRListRoutingModule { }