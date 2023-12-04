import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-platform-boot',
  templateUrl: './platform-boot.component.html',
  styleUrls: ['./platform-boot.component.scss']
})
export class PlatformBootComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  on_create(): void {
    this.router.navigateByUrl("/web/create-poll");
  }
  on_join(): void {
    console.error("Join Poll NOT IMPLMEMENTED");
  }
}
