import { State } from "../enums/state";
import { Customer } from "./customer";

export interface Invoice{
    invoiceId?: number;
    customerId: number;
    customer?: Customer;
    invoiceDate?: Date;
    value: number;
    state: State 
}