import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { InvoiceOrder, MyInvoiceOrder } from '../interfaces/invoice.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InvoiceProduct } from '../interfaces/product.interface';
import { NgStyle } from '@angular/common';
import { PurchasedInvoice } from '../interfaces/myInvoice.interface';

@Injectable({providedIn: 'root'})
export class InvoicePurchase {
    constructor(private http: HttpClient , private toastr: ToastrService , private router: Router) { }

    invoiceId: PurchasedInvoice = new PurchasedInvoice();

    purchaseInvoice(invoice: InvoiceOrder){
        console.log(invoice);
        // let reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'true'});
        return this.http.post('http://localhost:58887/api/Invoices', invoice );
    }

    getInvoiceById(id: number){
        // tslint:disable-next-line: deprecation
        return this.http.get('http://localhost:58887/api/Invoices/' + id);
    }
}