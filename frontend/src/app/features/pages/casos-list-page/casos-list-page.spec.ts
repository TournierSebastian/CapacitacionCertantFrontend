import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { Caso } from '../../models/casos/casos.model';
import { CasosService } from '../../services/casos/casos';
import { CasosListPage } from './casos-list-page';

describe('CasosListPage', () => {
  let component: CasosListPage;
  let fixture: ComponentFixture<CasosListPage>;
  const caso: Caso = {
    identificador: 30,
    titulo: 'Permiso de consulta habilitado',
    estado: 'Cerrado',
    prioridad: 'Alta',
    responsableAsignado: 'Ana Torres',
    fechaCreacion: '2026-09-28',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasosListPage],
      providers: [
        {
          provide: CasosService,
          useValue: {
            listar: () => of({
              casos: [caso],
              total: 30,
              pagina: 1,
              limite: 10,
              totalPaginas: 3,
            }),
            listarTodos: () => of([caso]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CasosListPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders cases when the request completes without filter interaction', async () => {
    vi.useFakeTimers();

    try {
      fixture.detectChanges();
      await vi.advanceTimersByTimeAsync(250);
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Permiso de consulta habilitado');
    } finally {
      vi.useRealTimers();
    }
  });
});
