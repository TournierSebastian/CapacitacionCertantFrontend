import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Caso, CasosPagina } from '../../models/casos/casos.model';
import { CasosService } from './casos';

describe('CasosService', () => {
  let service: CasosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CasosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns one API page with normalized fields and metadata', () => {
    let resultado: CasosPagina | undefined;

    service.listar(2, 10, { estado: 'ABIERTO' }).subscribe((respuesta) => {
      resultado = respuesta;
    });

    httpMock.expectOne((request) =>
      request.url === 'http://localhost:3000/api/casos' &&
      request.params.get('pagina') === '2' &&
      request.params.get('limite') === '10' &&
      request.params.get('estado') === 'ABIERTO',
    ).flush({
      data: [
        {
          id: 30,
          titulo: 'Caso cerrado',
          estado: 'RESUELTO',
          prioridad: 'ALTA',
          responsableNombre: 'Ana Torres',
          fechaCreacion: '2026-09-28',
        },
      ],
      total: 30,
      paginacion: { pagina: 2, limite: 10, total: 30, paginas: 3 },
    });

    expect(resultado).toEqual({
      casos: [
        {
          identificador: 30,
          titulo: 'Caso cerrado',
          descripcion: '',
          estado: 'Resuelto',
          prioridad: 'Alta',
          responsableAsignado: 'Ana Torres',
          fechaCreacion: '2026-09-28',
        },
      ],
      total: 30,
      pagina: 2,
      limite: 10,
      totalPaginas: 3,
    });
    httpMock.verify();
  });

  it('loads all pages only when explicitly requested', () => {
    let casos: Caso[] = [];

    service.listarTodos().subscribe((respuesta) => {
      casos = respuesta;
    });

    httpMock.expectOne((request) =>
      request.url === 'http://localhost:3000/api/casos' &&
      request.params.get('pagina') === '1' &&
      request.params.get('limite') === '10',
    ).flush({
      data: [{
        id: 30,
        titulo: 'Caso cerrado',
        estado: 'RESUELTO',
        prioridad: 'ALTA',
        responsableNombre: 'Ana Torres',
        fechaCreacion: '2026-09-28',
      }],
      total: 2,
      paginacion: { pagina: 1, limite: 1, total: 2, paginas: 2 },
    });

    httpMock.expectOne((request) =>
      request.url === 'http://localhost:3000/api/casos' &&
      request.params.get('pagina') === '2' &&
      request.params.get('limite') === '1',
    ).flush({
      data: [
        {
          id: 29,
          titulo: 'Caso abierto',
          estado: 'ABIERTO',
          prioridad: 'BAJA',
          responsableNombre: null,
          fechaCreacion: '2026-09-27',
        },
      ],
      total: 2,
      paginacion: { pagina: 2, limite: 1, total: 2, paginas: 2 },
    });

    expect(casos).toEqual([
      {
        identificador: 30,
        titulo: 'Caso cerrado',
        descripcion: '',
        estado: 'Resuelto',
        prioridad: 'Alta',
        responsableAsignado: 'Ana Torres',
        fechaCreacion: '2026-09-28',
      },
      {
        identificador: 29,
        titulo: 'Caso abierto',
        descripcion: '',
        estado: 'Abierto',
        prioridad: 'Baja',
        responsableAsignado: 'Sin asignar',
        fechaCreacion: '2026-09-27',
      },
    ]);
    httpMock.verify();
  });
});
