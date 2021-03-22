import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { Global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers:[ProductoService, UploadService]
})
export class EditComponent implements OnInit {

  public title:string;
  public producto!:Producto;
  public saveProducto: any;
  public status!:string;
  public fileToUpload!:Array<File>;
  public url:string;

  constructor(
    private _productoService:ProductoService,
    private _uploadService:UploadService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
    this.title="Editar producto";
    this.url=Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params.id;
      this.getProducto(id);
    });
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

  onSubmit(form: { reset: () => void; }){
    this._productoService.updateProducto(this.producto).subscribe(
      response=>{
        if(response.producto){
          //subir la imagen
          if(this.fileToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.producto._id,[],this.fileToUpload,'image')
            .then((result:any)=>{
              this.saveProducto=result.producto;
              this.status='success';
              form.reset();
            });
          }else{
            this.saveProducto=response.producto;
            this.status='success';
            form.reset();
          }
        }else{
          this.status='failed';
        }
      },error=>{
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput:any){
    this.fileToUpload=<Array<File>>fileInput.target.files;
  }

}
