import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target.value']) onInput(value: string) {
    if (isNaN(+value)) {
      const value = this.elementRef.nativeElement.value;

      this.elementRef.nativeElement.value = value.slice(0, value.length - 1);
    }
  }
}
