import { TaxRegime } from "./tax-regime.model";

export interface IncomeTax {
    yearlyIncome: number;
    taxRegime: TaxRegime;
    taxValue: number;
}