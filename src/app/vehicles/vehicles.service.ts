import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, merge, of } from 'rxjs';
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
    loading: false,
    total: 0,
    pages: [1]
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
      ...this.state,
      total,
      pages: Array(Math.ceil(total / this.params.getValue().perpage))
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
      switchMap( params => 
        merge(
          of(null),
          this.http.get<VehicleResponse>(this.api_url,{
            params:{
              search: params.query,          
              page: ""+params.page
            }
          })
        ),
      ),      
      map( (response:VehicleResponse) => {   
        if(response) {
          this.setTotal(+response.count);
          this.state.loading = false;
          return response.results;
        }     
        else {
          this.state.loading = true;
          return [];          
        }
      }),
      share(),      
    )
  } 

  constructor(private http:HttpClient) { }
}
