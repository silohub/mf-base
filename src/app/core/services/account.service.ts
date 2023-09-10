import { Injectable } from '@angular/core';
import { Account } from '../interfaces/account';
import { Observable, Subject, interval } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { SessionStorageChange } from '../interfaces/session-storage-change';
import { isEqual } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private storageSub = new Subject<SessionStorageChange>();
  private checkInterval = 1000;  // comprueba cada segundo
  private lastKnownAccount: Account | null = null;

  constructor() {
  }

  initialize(): void {
    setTimeout(() => {
      this.emitCurrentAccount();
      this.monitorSessionStorage();
    }, 5);
  }

  /**
   * Inicializa con el primer valor que se encuentre en el session storage
   */
  private emitCurrentAccount(): void {
    const currentAccount = this.getAccountSelected();
    this.storageSub.next({
      oldValue: null,  // En la primera emisión, consideramos que el oldValue es null
      newValue: currentAccount
    });
    this.lastKnownAccount = currentAccount;
  }

  /**
   * Monitorea el session storage en busca de cambios de datos de cuenta
   */
  private monitorSessionStorage(): void {
    interval(this.checkInterval).subscribe(() => {
      const currentAccount = this.getAccountSelected();
      if (!isEqual(this.lastKnownAccount, currentAccount)) {
        this.storageSub.next({
          oldValue: this.lastKnownAccount,
          newValue: currentAccount
        });
        this.lastKnownAccount = currentAccount;
      }
    });
  }

  /**
   * Obtiene la cuenta seleccionada
   */
  getAccountSelected(): Account | null {
    const value = sessionStorage.getItem('account');
    return value ? JSON.parse(value).account : null;
  }

  /**
   * notifica cuando hay cambios de la cuenta seleccionada
   * @returns
   */
  watchAccountChanges(): Observable<SessionStorageChange> {
    return this.storageSub.asObservable();
  }
}

