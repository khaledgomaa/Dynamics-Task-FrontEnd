import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProductComponent } from './product/product.component';
import { InvoiceHomeComponent } from './invoice-home/invoice-home.component';

export const appRoutes: Routes=[
    {path: '', component: InvoiceHomeComponent},
    {path: 'invoice', component: InvoiceComponent},
    {path: 'invoiceHome' , component:InvoiceHomeComponent}
]