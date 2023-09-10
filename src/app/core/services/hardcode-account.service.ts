import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodeAccountService {
  constructor() { }
  /**
   * Funcion que inserta una cuenta en el session storage, esta funcion solo se utiliza para ambientes de prueba
   */
  saveAccountSelectedInSessionStorage(): void {
    const accountSelected = {
      account: {
        idCuenta: 1,
        entidadCodigo: '1234',
        localidad: '',
        razonSocial: 'Cuenta de pruebas',
        numDocumento: null,
        cuit: '',
        email: null,
        telefono: null,
        comercialCodigo: '',
        comercialNombre: '',
        comercialSecundarioCodigo: null,
        comercialSecundarioNombre: null,
        originadorCodigo: null,
        originadorNombre: null,
        ganaderoCodigo: null,
        ganaderoNombre: null,
        fechaDeAlta: null,
        tipoUsuario: 2,
        tipoPersona: null,
      }
    }

    sessionStorage.setItem('account', JSON.stringify(accountSelected))
  }
}
