import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../interfaces/product.interface';

@Pipe({
    name: 'filter'
})

// tslint:disable-next-line: class-name
export class filterList implements PipeTransform {
    transform(productList: ProductModel[] , filterKey: string): any {
        if(filterKey != null)
        {return productList.filter(item => item.name.toLowerCase().includes(filterKey.toLowerCase())); }
        else{
            return productList;
        }
    }
}