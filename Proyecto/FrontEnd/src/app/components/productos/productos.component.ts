import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Global } from '../../services/global';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers:[ProductoService]
})
export class ProductosComponent implements OnInit {

  public productos:Producto[] | undefined;
  public url:string;

  constructor(
    private _productoService:ProductoService
  ) {
    this.url=Global.url;
   }

  ngOnInit(): void {
    this.getProductos();
  }


  getProductos(){
    this._productoService.getProductos().subscribe(
      response=>{
        if(response.productos){
          this.productos=response.productos;
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

 


}
