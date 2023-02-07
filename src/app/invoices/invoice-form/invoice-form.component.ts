import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  invoiceFormGroup: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private customerService: CustomerService
    ) {
    
  }
  ngOnInit(): void {
    this.initForm();
    this.patchValues();
  }

  patchValues(){
    if(this.router.url.includes('edit')){
      this.state.isEditting = true
      this.invoiceService.findInvoice(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(res => {
        this.invoiceFormGroup.patchValue({
          customerId: res.customerId,
          value: res.value,
          invoiceDate: res.invoiceDate,
          state: res.state
        })
      })
    }  else this.state.isEditting = false;
  }

  initForm(){
    this.getCustomers();
    this.invoiceFormGroup = this.formBuilder.group({
      customerId: [null, Validators.required],
      value: [null, Validators.required],
      state: [1, Validators.required]
    });
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(res=> {
      this.state.isLoading = false;
      this.state.customers = res;
      console.log(this.state.customers);
    });
  }

  addInvoice(){
    // convert State type to int
    this.invoiceFormGroup.patchValue({state: parseInt(this.invoiceFormGroup.controls.state.value)});
    
    this.invoiceService.addInvoice(this.invoiceFormGroup.value).subscribe((res) => {
      this.state.savedInvoice = true
    },
    (err) => console.log(err))
  }

  editInvoice(){
    this.invoiceFormGroup.patchValue({state: parseInt(this.invoiceFormGroup.controls.state.value)});
    let invoice = this.invoiceFormGroup.value;
    invoice.invoiceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.invoiceService.editInvoice(invoice.invoiceId, invoice).subscribe((res) => {
      this.state.savedInvoice = true
    },
    (err) => console.log(err))
  }


}
