export class Articulo {
  constructor(
    public IdArticulo: number,
    public Nombre: string,
    public Precio: number,
    public CodigoDeBarra: string,
    public IdArticuloFamilia: number,
    public Stock: number,
    public FechaAlta: string,
    public Activo: boolean
  ) {}
}
