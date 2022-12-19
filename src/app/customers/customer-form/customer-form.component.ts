import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  state = {
    isLoading: true,
    isEditting: false,
    savedCustomer: false
  }

  customerFormGroup: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
    ) {
    
  }
  ngOnInit(): void {
    this.initForm();
    if(this.router.url.includes('edit')){
      this.state.isEditting = true
      this.customerService.findCustomer(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(res => {
        this.customerFormGroup.patchValue({
          customerName: res.customerName,
          phoneNumber: res.phoneNumber
        })
      })
    }  else this.state.isEditting = false;
  }

  initForm(){
    this.customerFormGroup = this.formBuilder.group({
      customerName: [null, Validators.required],
      phoneNumber: [null, Validators.required]
    });
  }

  addCustomer(){
    this.customerService.addCustomer(this.customerFormGroup.value).subscribe((res) => {
      this.state.savedCustomer = true
    },
    (err) => console.log(err))
  }

  editCustomer(){
    let customer = this.customerFormGroup.value;
    let id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    customer.customerId = parseInt(id);
    this.customerService.editCustomer(customer.customerId, customer).subscribe((res) => {
      this.state.savedCustomer = true
    },
    (err) => console.log(err))
  }


}
