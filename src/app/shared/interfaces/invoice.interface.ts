import { ProductModel, InvoiceProduct } from './product.interface';
import { Invoice, myPurchasedProducts } from './myInvoice.interface';

export class InvoiceOrder{
    invoice: Invoice;
    InvoiceProducts: ProductModel[];
}

export class MyInvoiceOrder{
    invoice: myPurchasedProducts;
    invoiceProducts: InvoiceProduct[];
}

