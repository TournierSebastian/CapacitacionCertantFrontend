import { Component, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Caso } from '../../models/casos/casos.model';
import { CasosService } from '../../services/casos/casos';
import { catchError, debounceTime, EMPTY, map, Subject, switchMap } from 'rxjs';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { SelectComponent, SelectOption } from '../../../shared/components/select/select.component';
import { SidePanelComponent } from '../../../shared/components/sidepanel.component/side-panel.component';
import { SidePanelContentComponent } from '../../../shared/components/sidepanel.component/side-panel-content.component/side-panel-content.component';
import { SidePanelFooterComponent } from '../../../shared/components/sidepanel.component/side-panel-footer.component/side-panel-footer.component';
import { SidePanelHeaderComponent } from '../../../shared/components/sidepanel.component/side-panel-header.component/side-panel-header.component';
import { BlockContainerComponent } from '../../../shared/components/block-container/block-container.component';
import { BlockLayoutComponent } from '../../../shared/components/block-layout/block-layout.component';
import { FlexLayoutComponent } from '../../../shared/components/flex-layout/flex-layout.component';
import { TableComponent } from '../../../shared/components/table.component/table.component';
import { TableBodyComponent } from '../../../shared/components/table.component/table-body/table-body.component';
import { TableCellComponent } from '../../../shared/components/table.component/table-cell/table-cell.component';
import { TableHeadComponent } from '../../../shared/components/table.component/table-head/table-head.component';
import { TableHeaderCellComponent } from '../../../shared/components/table.component/table-header-cell/table-header-cell.component';
import { TableRowComponent } from '../../../shared/components/table.component/table-row/table-row.component';
import { TextfieldComponent } from '../../../shared/components/textfield/textfield.component';

@Component({
  imports: [
    BadgeComponent,
    ButtonComponent,
    PaginatorComponent,
    SelectComponent,
    SidePanelComponent,
    SidePanelHeaderComponent,
    SidePanelContentComponent,
    SidePanelFooterComponent,
    BlockContainerComponent,
    BlockLayoutComponent,
    FlexLayoutComponent,
    TableBodyComponent,
    TableCellComponent,
    TableComponent,
    TableHeadComponent,
    TableHeaderCellComponent,
    TableRowComponent,
    TextfieldComponent,
  ],
  selector: 'app-casos-list-page',
  templateUrl: './casos-list-page.html',
})
export class CasosListPage implements OnInit {
  private readonly casosService = inject(CasosService);
  private readonly recargarCasos$ = new Subject<void>();
  readonly casos = signal<Caso[]>([]);
  readonly totalCasos = signal(0);
  readonly totalPaginasApi = signal(1);
  busqueda = '';
  estadoSeleccionado = '';
  prioridadSeleccionada = '';
  paginaActual = 1;
  readonly elementosPorPagina = 5;
  casoSeleccionado: Caso | null = null;
  mostrarPanel = false;

  readonly estados: SelectOption[] = [
    { label: 'Abierto', value: 'Abierto' },
    { label: 'En progreso', value: 'En progreso' },
    { label: 'Resuelto', value: 'Resuelto' },
  ];

  readonly prioridades: SelectOption[] = [
    { label: 'Alta', value: 'Alta' },
    { label: 'Media', value: 'Media' },
    { label: 'Baja', value: 'Baja' },
  ];

  constructor() {
    this.recargarCasos$
      .pipe(
        debounceTime(250),
        switchMap(() => {
          const filtros = this.filtrosApi;
          const respuesta = this.busqueda.trim()
            ? this.casosService.listarTodos(filtros).pipe(
                map((casos) => ({
                  casos,
                  total: casos.length,
                  totalPaginas: Math.max(
                    1,
                    Math.ceil(casos.length / this.elementosPorPagina),
                  ),
                })),
              )
            : this.casosService
                .listar(this.paginaActual, this.elementosPorPagina, filtros)
                .pipe(
                  map((pagina) => ({
                    casos: pagina.casos,
                    total: pagina.total,
                    totalPaginas: pagina.totalPaginas,
                  })),
                );

          return respuesta.pipe(
            catchError((error) => {
              console.error('Error al obtener los casos:', error);
              this.casos.set([]);
              this.totalCasos.set(0);
              this.totalPaginasApi.set(1);
              return EMPTY;
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((resultado) => {
        this.casos.set(resultado.casos);
        this.totalCasos.set(resultado.total);
        this.totalPaginasApi.set(resultado.totalPaginas);
      });
  }

  ngOnInit(): void {
    this.recargarCasos$.next();
  }

  get casosFiltrados(): Caso[] {
    const texto = this.busqueda.trim().toLowerCase();

    return this.casos().filter((caso) => {
      const coincideTexto =
        !texto ||
        caso.titulo.toLowerCase().includes(texto) ||
        caso.responsableAsignado.toLowerCase().includes(texto) ||
        String(caso.identificador).toLowerCase().includes(texto);

      return coincideTexto;
    });
  }

  get totalPaginas(): number {
    return this.busqueda.trim()
      ? Math.max(1, Math.ceil(this.casosFiltrados.length / this.elementosPorPagina))
      : this.totalPaginasApi();
  }

  get casosPaginados(): Caso[] {
    if (!this.busqueda.trim()) {
      return this.casos();
    }

    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.casosFiltrados.slice(inicio, inicio + this.elementosPorPagina);
  }

  get desde(): number {
    return this.totalElementos === 0
      ? 0
      : (this.paginaActual - 1) * this.elementosPorPagina + 1;
  }

  get hasta(): number {
    return Math.min(this.paginaActual * this.elementosPorPagina, this.totalElementos);
  }

  get totalElementos(): number {
    return this.busqueda.trim() ? this.casosFiltrados.length : this.totalCasos();
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, indice) => indice + 1);
  }

  cambiarBusqueda(valor: string): void {
    this.busqueda = valor;
    this.paginaActual = 1;
    this.recargarCasos$.next();
  }

  cambiarEstado(valor: string): void {
    this.estadoSeleccionado = valor;
    this.paginaActual = 1;
    this.recargarCasos$.next();
  }

  cambiarPrioridad(valor: string): void {
    this.prioridadSeleccionada = valor;
    this.paginaActual = 1;
    this.recargarCasos$.next();
  }

  irAPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      if (!this.busqueda.trim()) {
        this.recargarCasos$.next();
      }
    }
  }

  private get filtrosApi(): Record<string, string> {
    const filtros: Record<string, string> = {};
    const estadosApi: Record<string, string> = {
      Abierto: 'ABIERTO',
      'En progreso': 'EN_PROGRESO',
      'Resuelto': 'RESUELTO',
    };
    const prioridadesApi: Record<string, string> = {
      Alta: 'ALTA',
      Media: 'MEDIA',
      Baja: 'BAJA',
    };

    if (this.estadoSeleccionado) {
      filtros['estado'] = estadosApi[this.estadoSeleccionado];
    }
    if (this.prioridadSeleccionada) {
      filtros['prioridad'] = prioridadesApi[this.prioridadSeleccionada];
    }

    return filtros;
  }

  abrirDetalle(caso: Caso): void {
    this.casosService.obtener(caso.identificador).subscribe({
      next: (detalle) => {
        this.casoSeleccionado = detalle;
        this.mostrarPanel = true;
      },
      error: (error) => {
        console.error('Error al obtener el detalle del caso:', error);
      },
    });
  }

  cerrarPanel(): void {
    this.mostrarPanel = false;
  }

  crearCaso(): void {
    console.log('Crear caso');
  }

  editarCaso(): void {
    if (this.casoSeleccionado) {
      console.log('Editar caso:', this.casoSeleccionado);
    }
  }

  colorEstado(estado: string): 'yellow' | 'blue' | 'green' | 'gray' {
    switch (estado) {
      case 'Abierto': return 'yellow';
      case 'En progreso': return 'blue';
      case 'Resuelto': return 'green';
      default: return 'gray';
    }
  }

  colorPrioridad(prioridad: string): 'red' | 'yellow' | 'gray' {
    switch (prioridad) {
      case 'Alta': return 'red';
      case 'Media': return 'yellow';
      default: return 'gray';
    }
  }
}
