import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackendResponses } from '../core/backend.responses';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backendUrl = environment.backend_url;

  constructor(private http: HttpClient) { }

  saveTaxFormDetails(data:any):Observable<any> {
    return this.http.post<BackendResponses>(this.backendUrl+'/save/taxdetails',data)
    .pipe(map(res=>{
        return res.success ? res.data : {}
    }));
  }

  saveItemisedDeductionDetails(data:any): Observable<any> {
    return this.http.post<BackendResponses>(this.backendUrl+"/save/itemdeduction",data)
    .pipe(map(res=>{
        return res.success ? res.data : {}
    }));
  }

  getAllTaxFormDetails(id:number): Observable<any> {
    return this.http.get<BackendResponses> (this.backendUrl+"/get/taxdetails/"+id)
    .pipe(map(res=>{
       return res.success ? res.data : {}
    }))
  }

  getAllItemisedDeductionDetails(id:number): Observable<any> {
    return this.http.get<BackendResponses> (this.backendUrl+"/get/allitemisedtaxdetails/"+id)
    .pipe(map(res=>{
        return res.success ? res.data:{}
    }))
  }
  
  getTaxBracketsByStatus(status:string): Observable<any> {
    return this.http.post<BackendResponses>(this.backendUrl+"/get/taxbracket",status)
    .pipe(map(res=>{
      return res.success ? res.data:{}
    }))
  }

  getItemisedDeductionByformId(id:number): Observable<any> {
    return this.http.get<BackendResponses>(this.backendUrl+"/get/itemiseddeductionbyiformid/"+id)
    .pipe(map(res=>{
       return res.success ? res.data:{}
    }))
  }

}
