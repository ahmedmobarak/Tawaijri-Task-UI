import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/services/customer.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  state = {
    isLoading: true,
    customerDeleted: false,
    customers: [] as Customer[],
  }

  constructor(private customerService: CustomerService) {
    
  }

  ngOnInit():void{
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(res=> {
      this.state.isLoading = false;
      this.state.customers = res;
      console.log(this.state.customers);
    });
  }

  deleteCustomer(id: any){
    this.customerService.deleteCustomer(id).subscribe(res => {
      this.state.customerDeleted = true;
      this.ngOnInit();
    })
  }
}
