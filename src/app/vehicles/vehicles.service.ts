import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { share, map, switchMap } from 'rxjs/operators';

interface Params{
  perpage: number;
  page: number;
  query: string;
}

interface Vehicle {
  name: string, 
  model: string
}

interface VehicleResponse {
  count: number,
  results: Array<Vehicle>
}

@Injectable()

export class VehiclesService {

  api_url = "https://swapi.co/api/vehicles/";

  state = {
    total: 0,
    pages: 1
  }

  params = new BehaviorSubject<Params>({
    query:'',
    perpage:10,
    page: 1,
  })

  setPage(page:number){
    this.params.next({
      ...this.params.getValue(),
      page
    })
  }

  setTotal(total:number){
    this.state = {
      total,
      pages: Math.ceil(total / this.params.getValue().perpage)
    }
  }

  setParams(params) {
    this.params.next({
      ...this.params.getValue(),
      ...params
    })
  }

  query(query){
    this.params.next({
      ...this.params.getValue(),
      query,
      page: 1
    })
  }

  getVehicles() {
    return this.params.pipe(      
      switchMap( params => this.http.get<VehicleResponse>(this.api_url,{
        params:{
          search: params.query,          
          page: ""+params.page
        }
      })),      
      map( (response:VehicleResponse) => {        
        this.setTotal(+response.count);
        return response.results
      }),
      share(),      
    )
  } 

  constructor(private http:HttpClient) { }
}
