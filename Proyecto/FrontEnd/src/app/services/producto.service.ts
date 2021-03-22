import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Producto } from '../models/producto';
import { Global } from './global';

@Injectable()
export class ProductoService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }

    saveProducto(producto:Producto):Observable<any>{
        let params=JSON.stringify(producto);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'save-producto',params,{headers:headers});
        //http://localhost:3700/api/saveproject
    }

    getProductos():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'productos',{headers:headers});
        //http://localhost:3700/api/projects
    }

    getProducto(id: string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'producto/'+id,{headers:headers});
        //http://localhost:3700/api/projects
    }

    deleteProducto(id: string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'producto/'+id,{headers:headers});
        //http://localhost:3700/api/projects
    }

    updateProducto(producto: { _id: string; }):Observable<any>{
        let params=JSON.stringify(producto);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'producto/'+producto._id,params,{headers:headers});
        //http://localhost:3700/api/projects
    }

}