import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Venta } from '../models/venta';
import { Global } from './global';

@Injectable()
export class VentaService {
    public url: string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    saveVenta(venta: Venta): Observable<any> {
        let params = JSON.stringify(venta);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'save-venta', params, { headers: headers });
    }

}