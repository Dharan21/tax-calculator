import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IncomeTax } from './Models/income-tax.model';
import { TaxRegime } from './Models/tax-regime.model';
import { TaxCalculationService } from './Services/tax-calculation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tax-calculator';
  taxRegimes: TaxRegime[] = [];
  income?: number;
  taxRegime!: TaxRegime;
  selectedRegimeName?: string;
  displayCalculations = false;

  constructor(private taxCalculationService: TaxCalculationService) {
    this.taxCalculationService.taxRegimeSub.subscribe(
      (data) => (this.taxRegimes = data)
    );
  }

  onClear() {
    this.income = undefined;
    this.displayCalculations = false;
  }

  onTaxRegimeSelect() {
    this.taxRegime = this.taxRegimes.find(
      (regime) => regime.name == this.selectedRegimeName
    ) as TaxRegime;
    if (this.income) this.onSubmit();
  }

  onSubmit() {
    console.log(this.income);
    let result = this.taxCalculationService.calculateTax(this.income ?? 0, this.taxRegime);
    this.taxRegime = result.taxRegime;
    this.displayCalculations = true;
  }
}
