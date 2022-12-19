import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerService } from '../shared/services/customer.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomerListComponent,
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomersModule { }
