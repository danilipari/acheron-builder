import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private ngxSpinnerService: NgxSpinnerService) {}

  /**
   * Shows the spinner
   */
  show() {
    setTimeout(() => {
      this.ngxSpinnerService.show();
    }, 0);
  }

  /**
   * Hides the spinner
   */
  hide() {
    setTimeout(() => {
      this.ngxSpinnerService.hide();
    }, 250);
  }
}
