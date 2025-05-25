import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';

import { IbanValidatorComponent } from './iban-validator/iban-validator.component';

@NgModule({
  declarations: [IbanValidatorComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(IbanValidatorComponent, { injector });
    customElements.define('iban-validator-widget', el);
  }

  ngDoBootstrap() {}
}
