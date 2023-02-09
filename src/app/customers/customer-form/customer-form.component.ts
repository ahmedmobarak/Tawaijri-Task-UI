import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/interfaces/customer';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  state = {
    isLoading: true,
    hasSubmited: true,
    isEditting: false,
    savedCustomer: false
  }

  customerFormGroup = this.formBuilder.group({
    customerName: new FormControl<string | null>("", {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    customerId: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.max(236532323323)],
      nonNullable: true
    }),
    phoneNumber: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    })
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
    ) {
    
  }
  ngOnInit(): void {
    this.checkForEditPage();
  }

  checkForEditPage(){
    if(this.router.url.includes('edit')){
      this.state.isEditting = true;
      this.patchValues();
    }  else this.state.isEditting = false;
  }

  patchValues() {
    let id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.customerService.findCustomer(id).subscribe(res => {
      this.customerFormGroup.patchValue({
        customerId: parseInt(id),
        customerName: res.customerName,
        phoneNumber: res.phoneNumber
      });
    });
  }

  addCustomer(){
    this.customerService.addCustomer(this.customerFormGroup.value).subscribe((res) => {
      this.state.isLoading = false;
      this.state.hasSubmited = false;
      this.state.savedCustomer = true
    },
    (err) => {
      this.state.isLoading = false;
      this.state.hasSubmited = false;
      console.log(err)
    }
    )
  }

  editCustomer(){
    let customer = this.customerFormGroup.value;
    this.customerService.editCustomer(customer.customerId, customer).subscribe((res) => {
      this.state.savedCustomer = true
    },
    (err) => console.log(err))
  }


}
