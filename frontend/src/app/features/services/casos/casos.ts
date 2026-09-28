import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio para consumir los endpoints de casos de la API de entrenamiento.
 *
 * Ajustá API_URL si tu backend corre en otra dirección.
 * La API documentada usa como base: http://localhost:3000/api
 */
export interface Caso {
  identificador: string | number;
  titulo: string;
  estado: string;
  prioridad: string;
  responsableAsignado: string;
  fechaCreacion: string;
}
export type CasoInput = Partial<Caso>;

@Injectable({
  providedIn: 'root',
})
export class CasosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/casos';

  /** GET /casos — Lista y filtra casos. */
  listar(filtros?: Record<string, string | number | boolean>): Observable<Caso[]> {
    let params = new HttpParams();

    if (filtros) {
      for (const [clave, valor] of Object.entries(filtros)) {
        params = params.set(clave, String(valor));
      }
    }

    return this.http.get<Caso[]>(this.apiUrl, { params });
  }

  /** GET /casos/{id} — Obtiene un caso por su identificador. */
  obtener(id: string | number): Observable<Caso> {
    return this.http.get<Caso>(`${this.apiUrl}/${id}`);
  }

  /** POST /casos — Crea un caso. */
  crear(datos: CasoInput): Observable<Caso> {
    return this.http.post<Caso>(this.apiUrl, datos);
  }

  /** PATCH /casos/{id} — Modifica parcialmente un caso. */
  modificar(id: string | number, datos: Partial<CasoInput>): Observable<Caso> {
    return this.http.patch<Caso>(`${this.apiUrl}/${id}`, datos);
  }

  /** DELETE /casos/{id} — Elimina un caso. */
  eliminar(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
