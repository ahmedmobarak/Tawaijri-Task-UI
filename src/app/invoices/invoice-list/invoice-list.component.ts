import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/shared/interfaces/invoice';
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
    invoices: [] as Invoice[]
  }
  constructor(private invoiceService: InvoiceService) {
    
  }

  ngOnInit():void{
    this.getInvoices();
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
}
