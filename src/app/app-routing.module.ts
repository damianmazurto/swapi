import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { PageNotFoundComponent } from './navigation/page-not-found.component';


const routes: Routes = [
  {
    path: 'home',
    component: VehiclesListComponent
  },
  {
    path:'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'not-found',
    pathMatch:'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
