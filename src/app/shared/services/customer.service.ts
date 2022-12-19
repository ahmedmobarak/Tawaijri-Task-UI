import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiRoutes } from '../models/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http: HttpClient) { }

  getCustomers(): Observable<any>{
    return this.http.get(environment.apiUrl+ApiRoutes.customer.main);
  }

  findCustomer(id: any): Observable<any>{
    return this.http.get(environment.apiUrl+ApiRoutes.customer.main+id);
  }

  addCustomer(customer: any): Observable<any>{
    return this.http.post(environment.apiUrl+ApiRoutes.customer.main, customer);
  }

  editCustomer(id: any, customer: any): Observable<any>{
    return this.http.put(environment.apiUrl+ApiRoutes.customer.main+id, customer);
  }

  deleteCustomer(id: any): Observable<any>{
    return this.http.delete(environment.apiUrl+ApiRoutes.customer.main+id);
  }

  countCustomer(): Observable<any>{
    return this.http.get(environment.apiUrl+ApiRoutes.customer.count);
  }
}
