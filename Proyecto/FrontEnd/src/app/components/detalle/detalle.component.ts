import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { Global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers:[ProductoService]
})
export class DetalleComponent implements OnInit {
  public url:string;
  public producto!:Producto;
  public confirm:boolean;
  static producto: any;

  constructor(
    private _productoService:ProductoService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.url=Global.url;
    this.confirm=false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params.id;
      this.getProducto(id);
    })
  }

  getProducto(id: string){
    this._productoService.getProducto(id).subscribe(
      response=>{
        this.producto=response.producto;
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  

  setConfirm(confirm: boolean){
    this.confirm=confirm;
  }

  deleteProducto(id: string){
    this._productoService.deleteProducto(id).subscribe(
      response=>{
        if(response.producto){
          this._router.navigate(['/productos']);
        }
      },
      error=>{
        console.log(<any>error);
      });
  }

}
