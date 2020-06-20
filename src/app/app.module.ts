import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProductComponent } from './product/product.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { appRoutes } from './routes';
import { GetStores } from './shared/services/store.service';
import { HttpClientModule } from '@angular/common/http';
import { GetProduct } from './shared/services/product.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { filterList } from './shared/pipes/filter.pipe';
import { InvoicePurchase } from './shared/services/invoice.service';
import { InvoiceHomeComponent } from './invoice-home/invoice-home.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InvoiceComponent,
    ProductComponent,
    NavBarComponent,
    filterList,
    InvoiceHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [GetStores , GetProduct ,InvoicePurchase],
  bootstrap: [AppComponent]
})
export class AppModule { }
