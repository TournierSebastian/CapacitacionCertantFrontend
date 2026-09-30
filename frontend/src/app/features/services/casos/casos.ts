import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import {
  Caso,
  CasoApi,
  CasoInput,
  CasosApiResponse,
  CasosPagina,
} from '../../models/casos/casos.model';

export type { Caso, CasoInput, CasoApi, CasosApiResponse, CasosPagina } from '../../models/casos/casos.model';


@Injectable({
  providedIn: 'root',
})
export class CasosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/casos';

  /** GET /casos — Obtiene una página y devuelve la metadata del backend. */
  listar(
    pagina = 1,
    limite = 10,
    filtros?: Record<string, string | number | boolean>,
  ): Observable<CasosPagina> {
    return this.http
      .get<CasosApiResponse>(this.apiUrl, {
        params: this.crearParams(filtros, pagina, limite),
      })
      .pipe(map((respuesta) => this.normalizarPagina(respuesta)));
  }

  /** GET /casos — Obtiene todas las páginas, reservado para búsqueda global. */
  listarTodos(
    filtros?: Record<string, string | number | boolean>,
  ): Observable<Caso[]> {
    return this.listar(1, 10, filtros).pipe(
      switchMap((primeraPagina) => {
        const paginasRestantes = Array.from(
          { length: Math.max(primeraPagina.totalPaginas - 1, 0) },
          (_, indice) => indice + 2,
        );

        if (paginasRestantes.length === 0) {
          return of(primeraPagina.casos);
        }

        return forkJoin(
          paginasRestantes.map((pagina) =>
            this.listar(pagina, primeraPagina.limite, filtros),
          ),
        ).pipe(
          map((otrasPaginas) => [primeraPagina, ...otrasPaginas].flatMap((respuesta) => respuesta.casos)),
        );
      }),
    );
  }

  private crearParams(
    filtros?: Record<string, string | number | boolean>,
    pagina?: number,
    limite?: number,
  ): HttpParams {
    let params = new HttpParams();

    for (const [clave, valor] of Object.entries(filtros ?? {})) {
      params = params.set(clave, String(valor));
    }

    return params.set('pagina', pagina ?? 1).set('limite', limite ?? 10);
  }

  private normalizarPagina(respuesta: CasosApiResponse): CasosPagina {
    return {
      casos: respuesta.data.map((caso) => this.normalizarCaso(caso)),
      total: respuesta.paginacion.total,
      pagina: respuesta.paginacion.pagina,
      limite: respuesta.paginacion.limite,
      totalPaginas: respuesta.paginacion.paginas,
    };
  }

  private normalizarCaso(caso: CasoApi): Caso {
    const estados: Record<string, string> = {
      ABIERTO: 'Abierto',
      EN_PROGRESO: 'En progreso',
      RESUELTO: 'Resuelto',
    };
    const prioridades: Record<string, string> = {
      ALTA: 'Alta',
      MEDIA: 'Media',
      BAJA: 'Baja',
    };

    return {
      identificador: caso.id,
      titulo: caso.titulo,
      descripcion: caso.descripcion ?? '',
      estado: estados[caso.estado] ?? caso.estado,
      prioridad: prioridades[caso.prioridad] ?? caso.prioridad,
      responsableAsignado: caso.responsableNombre ?? 'Sin asignar',
      fechaCreacion: caso.fechaCreacion,
    };
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
