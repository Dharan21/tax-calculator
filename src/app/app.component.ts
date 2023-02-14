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
  income!: number;
  taxRegime!: TaxRegime;

  constructor(private taxCalculationService: TaxCalculationService) {
    this.taxCalculationService.taxRegimeSub.subscribe(
      (data) => (this.taxRegime = data)
    );
  }

  onSubmit() {
    console.log(this.income);
    var result = this.taxCalculationService.calculateTax(this.income);
    alert("Tax: " + result.taxValue);
  }
}
