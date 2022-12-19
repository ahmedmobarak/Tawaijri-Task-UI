import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http: HttpClient) { }

  getCustomers(): Observable<any>{
    return this.http.get(environment.apiUrl+'customers');
  }

  findCustomer(id: any): Observable<any>{
    return this.http.get(environment.apiUrl+'customers/'+id);
  }

  addCustomer(customer: any): Observable<any>{
    return this.http.post(environment.apiUrl+'customers', customer);
  }

  editCustomer(id: any, customer: any): Observable<any>{
    return this.http.put(environment.apiUrl+'customers/'+id, customer);
  }

  deleteCustomer(id: any): Observable<any>{
    return this.http.delete(environment.apiUrl+'customers/'+id);
  }
}
