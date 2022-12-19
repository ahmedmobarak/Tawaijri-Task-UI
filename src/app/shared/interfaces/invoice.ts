import { State } from "../enums/state";

export interface Invoice{
    invoiceId?: number;
    customerId: number;
    invoiceDate?: Date;
    value: number;
    state: State 
}