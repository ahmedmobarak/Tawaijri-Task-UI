import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(public http: HttpClient) { }

  getInvoices(): Observable<any>{
    return this.http.get(environment.apiUrl+'invoices');
  }

  findInvoice(id: any): Observable<any>{
    return this.http.get(environment.apiUrl+'invoices/'+id);
  }

  addInvoice(invoice: any): Observable<any>{
    return this.http.post(environment.apiUrl+'invoices', invoice);
  }

  editInvoice(id: any, invoice: any): Observable<any>{
    return this.http.put(environment.apiUrl+'invoices/'+id, invoice);
  }

  deleteInvoice(id: any): Observable<any>{
    return this.http.delete(environment.apiUrl+'invoices/'+id);
  }
}
