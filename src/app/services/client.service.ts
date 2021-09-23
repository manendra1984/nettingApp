import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NettingType } from '../INettingType';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseURL: string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  
  getProductList(){
    return this.http.get(this.baseURL + 'products/').toPromise();
  }
  getNettingType(id){
    return this.http.get(this.baseURL + 'StaticData/'+id).toPromise();
  }

  addNettingType(data: NettingType, id:string){
    if(id)return this.http.put<any>(this.baseURL +'StaticData/'+id, data).toPromise();  
    return this.http.post<any>(this.baseURL +'StaticData', data).toPromise();  
  }
}
