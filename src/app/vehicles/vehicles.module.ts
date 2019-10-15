import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { VehiclesService } from './vehicles.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    VehiclesListComponent,    
  ],
  exports:[VehiclesListComponent],
  providers: [VehiclesService]
})
export class VehiclesModule { }
