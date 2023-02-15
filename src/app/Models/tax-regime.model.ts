import { Slabs } from "./slabs.model";

export interface TaxRegime {
    name: string;
    standardDeduction: number;
    slabs: Slabs[];
    amount?: number; 
}