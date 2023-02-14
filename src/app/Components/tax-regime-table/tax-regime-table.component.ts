import { Component, Input } from "@angular/core";
import { TaxRegime } from "src/app/Models/tax-regime.model";

@Component({
    selector: 'app-tax-regime-table',
    templateUrl: 'tax-regime-table.component.html',
    styleUrls: []
})
export class TaxRegimeTableComponent {
    @Input() taxRegime!: TaxRegime;

}