import { Component, OnInit } from '@angular/core';
import { GetStores } from '../shared/services/store.service';
import { GetProduct } from '../shared/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductModel, InvoiceProduct } from '../shared/interfaces/product.interface';
import { InvoicePurchase } from '../shared/services/invoice.service';
import { InvoiceOrder} from '../shared/interfaces/invoice.interface';
import { Invoice, PurchasedInvoice } from '../shared/interfaces/myInvoice.interface';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [DatePipe]
})
export class InvoiceComponent implements OnInit {

  constructor(public storesApi: GetStores
             ,public productApi: GetProduct
             ,private toastr: ToastrService
             ,private invoicePurchase: InvoicePurchase
             ,private datePipe: DatePipe) {
             }

  productsInInvoice: ProductModel[] = [];


  invoiceId: PurchasedInvoice = new PurchasedInvoice();

  // tslint:disable-next-line: new-parens
  invoiceProduct: InvoiceProduct[] = [];

  invoiceOrder: InvoiceOrder = new InvoiceOrder();

  ListinvoiceOrder: PurchasedInvoice[] = [];

  invoice: Invoice = {
    Net : 0,
    StoreId: 0,
    Taxes: 0
  };

  total = 0;

  taxes = '14%';

  productSearch: string = null;

  myDate : any;

  selectedStoreId: number;

  // to get the stores from service
  getMyStores(){
    this.storesApi.getStores();
  }

  getCurrentDate(){
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  computeDiscountForEachItem(item: ProductModel,event){
    item.discount = Number(event.target.value / 100);
    let net = this.getNetForEachItem(item);
    item.total = net - Math.round(net * (event.target.value / 100));
  }

  getTotal(){
    return Math.round(this.getNetMoney() * 0.14 + this.getNetMoney());
  }

  addItemToInvoice(item: ProductModel){
    console.log(item);
    if (this.productsInInvoice.includes(item)){
        this.toastr.warning('this product alrady exist');
      }
      else{
        item.Qty = 1;
        item.total = item.price;
        item.discount = 0;
        item.ProductId = item.id;
        this.productsInInvoice.push(item);
        this.productSearch = null;
      }
  }

  updateProduct(item: ProductModel , event){
    if(this.productsInInvoice
      .find(p => p.name === item.name).amount >= event.target.value){
        item.Qty = Number(event.target.value);
        item.total = item.price * item.Qty;
        if(item.discount !== 0){
          item.total -= (item.price * item.Qty * item.discount);
        }
       }
     else{
       this.toastr.warning('Not enough amount for this product');
       console.log(item.Qty);
       event.target.value -= 1;
     }
  }
  cancelInvoice(){
    if(this.productsInInvoice.length > 0){
      this.productsInInvoice = [];
    }
    else{
      this.toastr.warning('There is no products');
    }

  }

// To get the net price to each product
  getNetForEachItem(item : ProductModel){
    return item.Qty * item.price;
  }

  getNetMoney(){
    let netMoney = 0;
    if(this.productsInInvoice != null){
      // tslint:disable-next-line: prefer-for-of
      for(let i=0; i <this.productsInInvoice.length;i++){
        netMoney += this.productsInInvoice[i].total;
      }
    }
    return netMoney;
  }

  removeProductFromCart(product: ProductModel){
    const index = this.productsInInvoice.indexOf(product, 0);
    if(index > -1){
      this.productsInInvoice.splice(index, 1);
    }
  }


  submitMyInvoice(){
    console.log(this.productsInInvoice);
    this.invoiceOrder.invoice = {
      Net : this.getNetMoney(),
      Taxes : 0.14,
      StoreId : this.selectedStoreId,
    }
    this.invoiceOrder.InvoiceProducts = this.productsInInvoice;
    // tslint:disable-next-line: prefer-for-of
    for(let i=0 ; i < this.invoiceOrder.InvoiceProducts.length;i++){
      this.invoiceOrder.InvoiceProducts[i].id = 0;
    }

    this.invoicePurchase.purchaseInvoice(this.invoiceOrder).toPromise().then(
      (data: PurchasedInvoice) => {
          this.invoiceId = data;
          console.log(this.invoiceId);
          this.toastr.success('Invoice has beed added');
      },
      (err: HttpErrorResponse) => {
          if(err.status === 401){this.toastr.error('Invalid information'); }
          else if(err.status === 500){this.toastr.warning('make sure you have seleted the store'); }
          else if(err.status ===400){this.toastr.info('Please purchase at least one product and select store,product from the box'); }
        });;
    this.productsInInvoice = [];
  }

  ngOnInit(): void {
    this.getMyStores();
    this.productApi.getProducts();
    this.myDate = this.getCurrentDate();
  }
}
