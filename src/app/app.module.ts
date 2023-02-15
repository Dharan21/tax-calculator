import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TaxRegimeTableComponent } from './Components/tax-regime-table/tax-regime-table.component';
import { AmountInLakhsCurrencyPipe } from './Pipes/amount-in-lakhs.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaxRegimeTableComponent,
    AmountInLakhsCurrencyPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
