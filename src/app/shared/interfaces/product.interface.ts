export interface ProductModel{
    ProductId: number;
    id: number;
    name: string;
    price: number;
    amount: number;
    discountFlag: boolean;
    Qty: number ;
    total: number;
    discount: number;
}

export class InvoiceProduct{
    productId: number;
    qty: number;
    price: number;
    discount: number;
}