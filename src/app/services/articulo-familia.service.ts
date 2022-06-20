import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticuloFamilia } from '../models/articulo-familia';

@Injectable({
  providedIn: 'root',
})
export class ArticuloFamiliaService {
  constructor(private httpClient: HttpClient) {}

  public obtenerArticuloFamilias(): Observable<ArticuloFamilia[]> {
    return this.httpClient.get<ArticuloFamilia[]>(
      `${environment.apiUrl}/articulosfamilias`
    );
  }
}
