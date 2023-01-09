import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent implements OnInit {
  @Input() public qrdata!: string;

  constructor() {}

  ngOnInit(): void {
    /*  */
  }
}
