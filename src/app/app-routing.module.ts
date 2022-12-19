import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { InvoiceFormComponent } from './invoices/invoice-form/invoice-form.component';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { AppRoutes } from './shared/models/appRoutes';

const routes: Routes = [
  {
    path: AppRoutes.customer.main,
    children: [
       {
          path: AppRoutes.customer.list,
          component: CustomerListComponent,
       },
       {
          path: AppRoutes.customer.new,
          component: CustomerFormComponent,
       },
       {
        path: AppRoutes.customer.edit,
        component: CustomerFormComponent,
     }
    ],
 },
 {
  path: AppRoutes.invoice.main,
  children: [
     {
        path: AppRoutes.invoice.list,
        component: InvoiceListComponent,
     },
     {
        path: AppRoutes.invoice.new,
        component: InvoiceFormComponent,
     },
     {
      path: AppRoutes.invoice.edit,
      component: InvoiceFormComponent,
   }
  ],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
