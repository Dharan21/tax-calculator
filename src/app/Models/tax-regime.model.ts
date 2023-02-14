import { Slabs } from "./slabs.model";

export interface TaxRegime {
    introducedYear: number;
    standardDeduction: number;
    slabs: Slabs[];
    amount?: number; 
}