import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../interfaces/product.interface';

@Injectable({providedIn: 'root'})
export class GetProduct {
    constructor(private httpService: HttpClient) { }

    productData: ProductModel[] = [];

    getProducts(){
        return this.httpService.get('http://localhost:58887/api/Products').toPromise().then(
            res => {this.productData = res as ProductModel[];}
        )
    }
}