export interface Slabs {
    range: Range;
    rate: number;
    amount?: number;
    slabStartIncome?: number;
    ramainingIncome?: number;
}

export interface Range {
    lowerBound: number;
    upperBound: number;
}