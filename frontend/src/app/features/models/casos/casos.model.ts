export interface Caso {
  identificador: string | number;
  titulo: string;
  descripcion?: string;
  estado: string;
  prioridad: string;
  responsableAsignado: string;
  fechaCreacion: string;
}

export type CasoInput = Partial<Caso>;

export interface CasosPagina {
  casos: Caso[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
}

export interface CasoApi {
  id: string | number;
  titulo: string;
  descripcion?: string;
  estado: string;
  prioridad: string;
  responsableNombre?: string | null;
  fechaCreacion: string;
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
