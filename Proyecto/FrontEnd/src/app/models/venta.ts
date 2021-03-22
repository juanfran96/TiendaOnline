export class Venta{
    constructor(
        public _id:string,
        public nombreCliente:string,
        public apellidoCliente:string,
        public numeroTarjeta:string,
        public fechaCaducidad:Date,
        public csv:string,
        public detalle:Array<string>,
        public total:string,
    ){}
}
