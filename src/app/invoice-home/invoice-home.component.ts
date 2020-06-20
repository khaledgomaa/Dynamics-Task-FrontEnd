import { Component, OnInit } from '@angular/core';
import { InvoicePurchase } from '../shared/services/invoice.service';
import { PurchasedInvoice, myPurchasedProducts } from '../shared/interfaces/myInvoice.interface';
import { InvoiceOrder, MyInvoiceOrder } from '../shared/interfaces/invoice.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-home',
  templateUrl: './invoice-home.component.html',
  styleUrls: ['./invoice-home.component.css']
})
export class InvoiceHomeComponent implements OnInit {

  constructor(private invoicePurchase: InvoicePurchase , private router: Router) { }

  getInvoiceByID: MyInvoiceOrder = new MyInvoiceOrder();

  InvoiceSearch: number;

  getInvoiceFromApiById(){
    this.invoicePurchase.getInvoiceById(this.InvoiceSearch).subscribe(
      res =>
       {
         this.getInvoiceByID = res as MyInvoiceOrder;
         console.log(res);
        }
  );
    console.log(this.getInvoiceByID);
  }

  getNetMoney(){
    let net=0;
    if(this.getInvoiceByID.invoiceProducts != null){
    for(let i=0 ; i<this.getInvoiceByID.invoiceProducts.length ;i++){
      if(this.getInvoiceByID.invoiceProducts[i].discount !== 0){
        let x=this.getInvoiceByID.invoiceProducts[i].price * this.getInvoiceByID.invoiceProducts[i].qty;
        let itemNet = x - x * this.getInvoiceByID.invoiceProducts[i].discount;
        net +=itemNet;
      }
      else{
        net+=this.getInvoiceByID.invoiceProducts[i].price * this.getInvoiceByID.invoiceProducts[i].qty;
      }
    }}
    return net;
  }

  getTotalMoney(){
    let total =0;
    let net = this.getNetMoney();
    if(this.getInvoiceByID.invoiceProducts != null){
      total=  net + net * this.getInvoiceByID.invoice.taxes;
    }
    return Math.round(total);
  }

  navigateToInvoice(){
    this.router.navigateByUrl('invoice');
  }

  ngOnInit(): void {
    this.getInvoiceByID.invoice = new myPurchasedProducts();
  }

}
