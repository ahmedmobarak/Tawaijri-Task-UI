import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InvoiceFormComponent,
    InvoiceListComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InvoicesModule { }
