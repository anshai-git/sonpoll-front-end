import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-email',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerification implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onResend(): void {
    // TODO: discuss resend strategy
    console.log('Not implemented');
  }

  openUrl(url: string) {
    window.open(url, "_blank");
  }
}
