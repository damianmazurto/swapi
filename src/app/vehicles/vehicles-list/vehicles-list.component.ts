import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../vehicles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap, share, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {

  vehicles = this.vehicleService.getVehicles();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private vehicleService:VehiclesService) { }

  setPage(page) {
    this.navigateWithParams({page});
  }

  search(search) {
    if(search)
    this.navigateWithParams({search, page:1});
    else {
      this.router.navigate([]);
    }
  }

  navigateWithParams(params) {
    this.router.navigate([], { 
      relativeTo: this.route, 
      queryParams: params, 
      queryParamsHandling: 'merge'});
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(
      ((params) => {
        this.vehicleService.setParams({
          query: params.get('search') || '',
          page: params.get('page') || 1
        })        
      }),
    );
  }

}
