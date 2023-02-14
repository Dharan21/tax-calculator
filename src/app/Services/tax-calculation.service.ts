import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IncomeTax } from '../Models/income-tax.model';
import { TaxRegime } from '../Models/tax-regime.model';

@Injectable({ providedIn: 'root' })
export class TaxCalculationService {
  url = environment.url;
  private taxRegime?: TaxRegime;
  taxRegimes: TaxRegime[] = [];
  taxRegimeSub = new Subject<TaxRegime>();

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<TaxRegime[]>(this.url).subscribe((data) => {
      this.taxRegimes = data;
      this.taxRegime = this.taxRegimes[0];
      this.taxRegimeSub.next({ ...this.taxRegime });
    });
  }

  calculateTax(yearlyIncome: number): IncomeTax {
    yearlyIncome = +yearlyIncome;
    let incomeTax: IncomeTax = {
      yearlyIncome: yearlyIncome,
      taxRegime: this.taxRegime as TaxRegime,
      taxValue: 0,
    };
    if (!incomeTax.yearlyIncome) {
      return incomeTax;
    }
    let tax = 0;
    let remainingIncome = yearlyIncome - incomeTax.taxRegime.standardDeduction;
    let slabs = incomeTax.taxRegime.slabs;
    let slabIndex = 0;
    let slabMaxIndex = slabs.length;
    while (remainingIncome > 0 && slabMaxIndex > slabIndex) {
      let currentSlab = slabs[slabIndex];
      if (currentSlab.range.upperBound == -1) {
        tax += (remainingIncome * currentSlab.rate) / 100.0;
        break;
      } else {
        let diff = currentSlab.range.upperBound - currentSlab.range.lowerBound;
        tax += (diff * currentSlab.rate) / 100.0;
        slabIndex++;
        remainingIncome -= diff;
      }
    }
    incomeTax.taxValue = tax;
    return incomeTax;
  }
}
