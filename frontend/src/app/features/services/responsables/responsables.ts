import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Responsable, ResponsableInput } from '../../models/responsables/responsable.model';

export type { Responsable, ResponsableInput } from '../../models/responsables/responsable.model';

@Injectable({
  providedIn: 'root',
})
export class ResponsablesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/responsables`;

  listar(
    filtros?: Record<string, string | number | boolean>
  ): Observable<Responsable[]> {
    let params = new HttpParams();

    if (filtros) {
      for (const [clave, valor] of Object.entries(filtros)) {
        params = params.set(clave, String(valor));
      }
    }

    return this.http.get<Responsable[]>(this.apiUrl, { params });
  }

  obtener(id: string | number): Observable<Responsable> {
    return this.http.get<Responsable>(`${this.apiUrl}/${id}`);
  }

  crear(datos: ResponsableInput): Observable<Responsable> {
    return this.http.post<Responsable>(this.apiUrl, datos);
  }

  modificar(
    id: string | number,
    datos: Partial<ResponsableInput>
  ): Observable<Responsable> {
    return this.http.patch<Responsable>(
      `${this.apiUrl}/${id}`,
      datos
    );
  }

  eliminar(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}