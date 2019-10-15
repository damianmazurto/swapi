import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiclesModule } from './vehicles/vehicles.module';

import { PageNotFoundComponent } from './navigation/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VehiclesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
