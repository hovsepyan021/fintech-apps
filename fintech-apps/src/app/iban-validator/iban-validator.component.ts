import { Component } from '@angular/core';

@Component({
  selector: 'app-iban-validator',
  templateUrl: './iban-validator.component.html',
  styleUrls: ['./iban-validator.component.scss']  // ✅ note the correct key: `styleUrls`, not `styleUrl`
})
export class IbanValidatorComponent {
  iban: string = '';
  isValid: boolean | null = null;
  countryCode: string = '';
  flagUrl: string | null = null;
  showCopied = false;

  sampleIbans: Record<string, string> = {
    DE: 'DE44 5001 0517 5407 3249 31',
    FR: 'FR14 2004 1010 0505 0001 3M02 606',
    GB: 'GB29 NWBK 6016 1331 9268 19',
    NL: 'NL91 ABNA 0417 1643 00',
    ES: 'ES91 2100 0418 4502 0005 1332',
  };

  get countryName(): string {
    return this.countryCode
      ? new Intl.DisplayNames(['en'], { type: 'region' }).of(this.countryCode) || ''
      : '';
  }

  get ibanLength(): number {
    return this.iban.replace(/\s+/g, '').length;
  }

  onInput() {
    this.iban = this.formatIban(this.iban);
    this.validateIBAN();
  }

  formatIban(input: string): string {
    return input.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
  }

  validateIBAN() {
    const raw = this.iban.replace(/\s+/g, '').toUpperCase();
    if (!/^[A-Z0-9]+$/.test(raw) || raw.length < 15 || raw.length > 34) {
      this.setResult(false, raw);
      return;
    }

    const rearranged = raw.slice(4) + raw.slice(0, 4);
    const numeric = rearranged.replace(/[A-Z]/g, (char) =>
      (char.charCodeAt(0) - 55).toString()
    );

    let total = '';
    for (let i = 0; i < numeric.length; i++) {
      total += numeric[i];
      if (total.length > 9) {
        total = (parseInt(total, 10) % 97).toString();
      }
    }

    this.setResult(parseInt(total, 10) % 97 === 1, raw);
  }

  setResult(valid: boolean, raw: string) {
    this.isValid = valid;
    this.countryCode = raw.slice(0, 2);
    this.flagUrl = `https://flagcdn.com/w40/${this.countryCode.toLowerCase()}.png`;
  }

  copyIban() {
    navigator.clipboard.writeText(this.iban);
    this.showCopied = true;
    setTimeout(() => (this.showCopied = false), 1500);
  }

  useSample(iban: string) {
    this.iban = iban;
    this.onInput();
  }
}
