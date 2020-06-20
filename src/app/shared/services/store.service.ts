import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModel } from '../interfaces/store.interface';

@Injectable({providedIn: 'root'})
export class GetStores {
    constructor(public httpService: HttpClient) { }

    storeData: StoreModel[] = [];

    getStores(){
        return this.httpService.get('http://localhost:58887/api/Stores/').toPromise()
        .then(res =>
             {
                 this.storeData = res as StoreModel[];
                 console.log(this.storeData);
            });
    }
}