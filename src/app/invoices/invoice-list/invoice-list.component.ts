import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/shared/interfaces/invoice';
import { InvoiceStates } from 'src/app/shared/models/invoicesStates';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  state = {
    isLoading: true,
    invoiceDeleted: false,
    invoices: [] as Invoice[],
    invoicesStates: InvoiceStates,
    term: undefined
  }
  constructor(private invoiceService: InvoiceService, private router: Router) {
    
  }

  ngOnInit():void{
    this.getInvoices();
  }

  getInvoiceStateText(id: number):string{
    let state = this.state.invoicesStates.filter(s => s.id == id)[0].title;
    return state;
  }

  getInvoices(){
    this.invoiceService.getInvoices().subscribe(res=> {
      this.state.isLoading = false;
      this.state.invoices = res;
      console.log(this.state.invoices);
    });
  }

  deleteInvoice(id: any){
    this.invoiceService.deleteInvoice(id).subscribe(res => {
      this.state.invoiceDeleted = true;
      this.ngOnInit();
    })
  }

  openDetails(id: any){
    this.router.navigate([`invoices/${id}`]);
  }

  search(){
    let filteredList = this.state.invoices.filter(invoice => (this.state.term !== undefined && this.state.term !== null ) ? invoice.customerId == this.state.term : invoice );
    return filteredList;
  }

}
