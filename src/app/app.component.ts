import { Component } from '@angular/core';
import { HardcodeAccountService } from './core/services/hardcode-account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mf-base';

  constructor(private _hardcodeAccountService: HardcodeAccountService) {
    if (environment.production === false) {//La funcion solo se ejecuta en fase de desarrollo
      this._hardcodeAccountService.saveAccountSelectedInSessionStorage()
    }
  }
}
