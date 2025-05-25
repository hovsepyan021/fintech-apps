import { Routes } from '@angular/router';
import { IbanValidatorComponent } from "./iban-validator/iban-validator.component";

export const routes: Routes = [
  { path: 'iban-validator', component: IbanValidatorComponent },
  { path: '', redirectTo: 'iban-validator', pathMatch: 'full' },
  { path: '**', redirectTo: 'iban-validator' },
];
