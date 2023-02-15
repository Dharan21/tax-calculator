import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IncomeTax } from '../Models/income-tax.model';
import { TaxRegime } from '../Models/tax-regime.model';

@Injectable({ providedIn: 'root' })
export class TaxCalculationService {
  url = environment.url;
  taxRegimes: TaxRegime[] = [];
  taxRegimeSub = new Subject<TaxRegime[]>();

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<TaxRegime[]>(this.url).subscribe((data) => {
      this.taxRegimes = data;
      this.taxRegimeSub.next(this.taxRegimes);
    });
  }

  calculateTax(yearlyIncome: number, selectedTaxRegime: TaxRegime): IncomeTax {
    yearlyIncome = +yearlyIncome;
    let incomeTax: IncomeTax = {
      yearlyIncome: yearlyIncome,
      taxRegime: selectedTaxRegime,
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
      currentSlab.slabStartIncome = remainingIncome;
      if (currentSlab.range.upperBound == -1) {
        let slabDeductions = (remainingIncome * currentSlab.rate) / 100.0;
        currentSlab.amount = slabDeductions;
        tax += slabDeductions;
        currentSlab.ramainingIncome = 0;
        break;
      } else {
        let diff = currentSlab.range.upperBound - currentSlab.range.lowerBound;
        let slabDeductions =
          ((diff > remainingIncome ? remainingIncome : diff) *
            currentSlab.rate) /
          100.0;
        currentSlab.amount = slabDeductions;
        tax += slabDeductions;
        slabIndex++;
        remainingIncome -= diff;
        currentSlab.ramainingIncome = remainingIncome > 0 ? remainingIncome : 0;
      }
    }
    incomeTax.taxValue = tax;
    incomeTax.taxRegime.amount = tax;
    return incomeTax;
  }
}
