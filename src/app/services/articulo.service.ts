import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  constructor(private httpClient: HttpClient) {}

  public obtenerArticulosPorNombreYActivo(
    nombre: string,
    activo: boolean
  ): Observable<any> {
    let params = new HttpParams();
    params.append('Nombre', nombre);
    params.append('Activo', activo.toString());
    params.append('Pagina', '1');

    return this.httpClient.get<any>(`${environment.apiUrl}/articulos/`, {
      params,
    });
  }

  public obtenerArticuloPorId(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/articulos/${id}`);
  }

  public agregarArticulo(articulo: Articulo) {
    const { IdArticulo, ...articuloSinId } = articulo;
    return this.httpClient.post(
      `${environment.apiUrl}/articulos`,
      articuloSinId
    );
  }

  public editarArticulo(id: number, articulo: Articulo) {
    return this.httpClient.put(
      `${environment.apiUrl}/articulos/${id}`,
      articulo
    );
  }

  public eliminarArticulo(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/articulos/${id}`);
  }
}
