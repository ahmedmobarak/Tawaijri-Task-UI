import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/shared/interfaces/invoice';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {

  state = {
    invoice: {} as Invoice,
  }

  constructor(private activatedRoute: ActivatedRoute, private invoiceService: InvoiceService){

  }
  ngOnInit(): void {
    this.getInvoiceData();
  }

  

  getInvoiceData(){
    let invoiceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.invoiceService.findInvoice(invoiceId).subscribe((res) => {
      this.state.invoice = res;
    },
    (err) => console.log(err))
  }

  print(){
    window.print();
  }

}
