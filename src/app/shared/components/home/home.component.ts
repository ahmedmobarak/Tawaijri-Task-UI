import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  state = {
    isLoading: true,
    customers: 0,
    invoices: 0
  }

  constructor(
    private customerService: CustomerService,
    private invoiceService: InvoiceService
  ) {
    
  }
  ngOnInit(): void {
    this.getCustomers();
    this.getInvoices();
  }

  getCustomers(){
    this.customerService.countCustomer().subscribe(res => this.state.customers = res);
  }

  getInvoices(){
    this.invoiceService.countInvoices().subscribe(res => {
      this.state.isLoading = false;
      this.state.invoices = res;
    }
      );
  }

}
