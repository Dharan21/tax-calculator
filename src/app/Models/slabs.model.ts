export interface Slabs {
    range: Range;
    rate: number;
    amount?: number;
}

export interface Range {
    lowerBound: number;
    upperBound: number;
}