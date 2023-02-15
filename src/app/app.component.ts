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
  income!: number | null;
  taxRegime!: TaxRegime;
  displayCalculations = false;

  constructor(private taxCalculationService: TaxCalculationService) {
    this.taxCalculationService.taxRegimeSub.subscribe(
      (data) => (this.taxRegime = data)
    );
  }

  onClear() {
    this.income = null;
    this.displayCalculations = false;
  }

  onSubmit() {
    console.log(this.income);
    let result = this.taxCalculationService.calculateTax(this.income ?? 0);
    this.taxRegime = result.taxRegime;
    this.displayCalculations = true;
    // alert("Tax: " + result.taxValue);
  }
}
