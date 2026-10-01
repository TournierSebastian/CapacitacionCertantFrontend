import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Caso,
  CasoApi,
  CrearCasoInput,
  CasosApiResponse,
  CasosPagina,
  CasoEstado,
  CasoEstadoApi,
  CasoPrioridad,
  CasoPrioridadApi,
} from '../../models/casos/casos.model';

export type {
  Caso,
  CasoApi,
  CrearCasoInput,
  CasosApiResponse,
  CasosPagina,
} from '../../models/casos/casos.model';

const ESTADOS_API: Record<CasoEstado, CasoEstadoApi> = {
  Abierto: 'ABIERTO',
  'En progreso': 'EN_PROGRESO',
  Resuelto: 'RESUELTO',
  Cerrado: 'CERRADO',
};

const PRIORIDADES_API: Record<CasoPrioridad, CasoPrioridadApi> = {
  Alta: 'ALTA',
  Media: 'MEDIA',
  Baja: 'BAJA',
};

@Injectable({
  providedIn: 'root',
})
export class CasosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/casos`;
  private readonly listadoCompletoCache = new Map<string, Observable<Caso[]>>();

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
    const claveCache = JSON.stringify(
      Object.entries(filtros ?? {}).sort(([claveA], [claveB]) => claveA.localeCompare(claveB)),
    );
    const listadoCacheado = this.listadoCompletoCache.get(claveCache);

    if (listadoCacheado) {
      return listadoCacheado;
    }

    const listado = this.listar(1, 10, filtros).pipe(
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
      tap({ error: () => this.listadoCompletoCache.delete(claveCache) }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    this.listadoCompletoCache.set(claveCache, listado);
    return listado;
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
    const estados: Record<CasoEstadoApi, CasoEstado> = {
      ABIERTO: 'Abierto',
      EN_PROGRESO: 'En progreso',
      RESUELTO: 'Resuelto',
      CERRADO: 'Cerrado',
    };

    const prioridades: Record<CasoPrioridadApi, CasoPrioridad> = {
      ALTA: 'Alta',
      MEDIA: 'Media',
      BAJA: 'Baja',
    };

    return {
      id: caso.id,
      titulo: caso.titulo,
      descripcion: caso.descripcion ?? '',
      estado: estados[caso.estado],
      prioridad: prioridades[caso.prioridad],
      responsableNombre: caso.responsableNombre ?? 'Sin asignar',
      responsableId: caso.responsableId ?? null,
      fechaCreacion: caso.fechaCreacion,
    };
  }

  private mapearAApi(datos: Partial<CrearCasoInput>,): Record<string, string | number | null> {
    const payload: Record<string, string | number | null> = {};

    if (datos.titulo !== undefined) {
      payload['titulo'] = datos.titulo;
    }

    if (datos.descripcion !== undefined) {
      payload['descripcion'] = datos.descripcion;
    }

    if (datos.estado !== undefined) {
      payload['estado'] = ESTADOS_API[datos.estado] ?? datos.estado;
    }

    if (datos.prioridad !== undefined) {
      payload['prioridad'] = PRIORIDADES_API[datos.prioridad] ?? datos.prioridad;
    }

    if (datos.responsableId !== undefined) {
      payload['responsableId'] = datos.responsableId;
    }

    return payload;
  }

  /** GET /casos/{id} — Obtiene un caso por su identificador. */
  obtener(id: string | number): Observable<Caso> {
    return this.http
      .get<CasoApi>(`${this.apiUrl}/${id}`)
      .pipe(map((caso) => this.normalizarCaso(caso)));
  }

  /** POST /casos — Crea un caso. */
  crear(datos: CrearCasoInput): Observable<Caso> {
    return this.http
      .post<CasoApi>(this.apiUrl, this.mapearAApi(datos))
      .pipe(
        map((caso) => this.normalizarCaso(caso)),
        tap(() => this.listadoCompletoCache.clear()),
      );
  }

  /** PATCH /casos/{id} — Modifica parcialmente un caso. */
  modificar(id: string | number, datos: Partial<CrearCasoInput>): Observable<Caso> {
    return this.http
      .patch<CasoApi>(`${this.apiUrl}/${id}`, this.mapearAApi(datos))
      .pipe(
        map((caso) => this.normalizarCaso(caso)),
        tap(() => this.listadoCompletoCache.clear()),
      );
  }

  /** DELETE /casos/{id} — Elimina un caso. */
  eliminar(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.listadoCompletoCache.clear()),
    );
  }
}
