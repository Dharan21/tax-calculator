import { CurrencyPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'amountInLakhs'
})
export class AmountInLakhsCurrencyPipe extends CurrencyPipe implements PipeTransform {
    override transform(value: string | number, currencyCode?: string | undefined, display?: string | boolean | undefined, digitsInfo?: string | undefined, locale?: string | undefined): string | null;
    override transform(value: null | undefined, currencyCode?: string | undefined, display?: string | boolean | undefined, digitsInfo?: string | undefined, locale?: string | undefined): null;
    override transform(value: string | number | null | undefined, currencyCode?: string | undefined, display?: string | boolean | undefined, digitsInfo?: string | undefined, locale?: string | undefined): string | null;
    override transform(value: unknown, currencyCode?: unknown, display?: unknown, digitsInfo?: unknown, locale?: unknown): string | null {
        let amountInLakh = (+(value as number)) / 100000;
        return super.transform(amountInLakh, 'INR', 'symbol', '0.0-1') + ' Lakhs';
    }
}