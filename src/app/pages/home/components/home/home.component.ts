import { Component, OnInit } from '@angular/core';
import { Subject, } from 'rxjs';
import { Account } from 'src/app/core/interfaces/account';
import { AccountService } from 'src/app/core/services/account.service';
import { takeUntil } from 'rxjs/operators';
import { SessionStorageChange } from 'src/app/core/interfaces/session-storage-change';
import { isEqual } from 'lodash'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  accountSelected?: Account | null

  private destroy$ = new Subject<void>();

  lastChange?: SessionStorageChange;

  constructor(private _accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccount()
  }

  /**
   * Obtiene los datos de la cuenta seleccionada
   */
  getAccount(): void {
    this._accountService.initialize();

    this._accountService.watchAccountChanges()
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        if (change.newValue) {
          this.accountSelected = change.newValue
        } else {
          this.accountSelected = null
        }

      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
