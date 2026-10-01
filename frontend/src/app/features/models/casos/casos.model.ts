export type CasoEstado =
  | 'Abierto'
  | 'En progreso'
  | 'Resuelto'
  | 'Cerrado';

export type CasoPrioridad =
  | 'Baja'
  | 'Media'
  | 'Alta';

export type CasoEstadoApi =
  | 'ABIERTO'
  | 'EN_PROGRESO'
  | 'RESUELTO'
  | 'CERRADO';

export type CasoPrioridadApi =
  | 'ALTA'
  | 'MEDIA'
  | 'BAJA';

export interface Caso {
  id: number;
  titulo: string;
  descripcion: string;
  estado: CasoEstado;
  prioridad: CasoPrioridad;
  responsableId: number | null;
  responsableNombre: string;
  fechaCreacion: string;
}

export interface CasoApi {
  id: number;
  titulo: string;
  descripcion?: string | null;
  estado: CasoEstadoApi;
  prioridad: CasoPrioridadApi;
  responsableId?: number | null;
  responsableNombre?: string | null;
  fechaCreacion: string;
}

export interface CrearCasoInput {
  titulo: string;
  descripcion: string;
  estado: CasoEstado;
  prioridad: CasoPrioridad;
  responsableId: number | null;
}

export interface CasosPaginacion {
  pagina: number;
  limite: number;
  total: number;
  paginas: number;
}

export interface CasosApiResponse {
  data: CasoApi[];
  total: number;
  paginacion: CasosPaginacion;
}

export interface CasosPagina {
  casos: Caso[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
}