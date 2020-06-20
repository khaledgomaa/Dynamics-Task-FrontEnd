export interface Invoice{
    StoreId: number;
    Taxes: number;
    Net: number;
}


export class PurchasedInvoice{
    id: number;
    StoreId: number;
    Taxes: number;
    Net: number;
    Date: string;
}

// tslint:disable-next-line: class-name
export class myPurchasedProducts{
    storeId: number;
    taxes: number;
    net: number;
}