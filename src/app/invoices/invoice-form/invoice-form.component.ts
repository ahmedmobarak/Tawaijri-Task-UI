import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/shared/interfaces/invoice';
import { InvoiceStates } from 'src/app/shared/models/invoicesStates';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  state = {
    isLoading: true,
    isEditting: false,
    savedInvoice: false,
    customers: [] as any
  }

  invoiceStates = InvoiceStates

  invoiceFormGroup = this.formBuilder.group({
    invoiceId: [Number as any, Validators.required],
    customerId: [Number, Validators.required],
    value: [Number, Validators.required],
    state: [1 as number, Validators.required],
    invoiceDate: [Date, Validators.required]

  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private customerService: CustomerService
    ) {
    
  }
  ngOnInit(): void {
    this.getCustomers();
    this.patchValues();
  }

  patchValues(){
    if(this.router.url.includes('edit')){
      this.state.isEditting = true
      this.invoiceService.findInvoice(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(res => {
        this.invoiceFormGroup.patchValue({
          invoiceId: res.invoiceId,
          customerId: res.customerId,
          value: res.value,
          invoiceDate: res.invoiceDate,
          state: res.state
        })
      })
    }  else this.state.isEditting = false;
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(res=> {
      this.state.isLoading = false;
      this.state.customers = res;
    });
  }

  addInvoice(){
    // convert State type to int
    this.invoiceFormGroup.patchValue({state: parseInt(this.invoiceFormGroup.controls.state.value!.toString())});
    
    this.invoiceService.addInvoice(this.invoiceFormGroup.value).subscribe((res) => {
      this.state.savedInvoice = true
    },
    (err) => console.log(err))
  }

  editInvoice(){
    this.invoiceFormGroup.patchValue({state: parseInt(this.invoiceFormGroup.controls.state.value!.toString())});
    let invoice = this.invoiceFormGroup.value;
    invoice.invoiceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.invoiceService.editInvoice(invoice.invoiceId, invoice).subscribe((res) => {
      this.state.savedInvoice = true
    },
    (err) => console.log(err))
  }


}
