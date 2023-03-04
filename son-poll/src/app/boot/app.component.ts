import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { loadAuthData } from '../auth/ngrx/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'son-poll';

  constructor(
    private store$: Store,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(loadAuthData());
  }

  ngOnDestroy(): void { }

}
