import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Caso, CasoEstado, CasoPrioridad, FiltrosCasos } from '../../models/casos/casos.model';
import { CasoFormularioEdicion, crearFormularioEdicion } from '../../models/casos/casos-form.model';
import { CasosService } from '../../services/casos/casos';
import { ResponsablesService } from '../../services/responsables/responsables';
import { catchError, debounceTime, EMPTY, map, Subject, switchMap } from 'rxjs';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { SelectComponent, SelectOption } from '../../../shared/components/select/select.component';
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
import { ToastService } from '../../../shared/components/toast.component/toast.service';
import { CasoDetallePanelComponent } from './caso-detalle-panel/caso-detalle-panel.component';
import {
  crearOpcionesResponsables,
  ESTADOS_SELECT,
  getCasePriorityColor,
  getCaseStateColor,
  obtenerMensajeErrorApi,
  PRIORIDADES_SELECT,
} from './casos-list-page.utils';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ParagraphComponent } from '../../../shared/components/paragraph/paragraph.component';

@Component({
  imports: [
    BadgeComponent,
    ButtonComponent,
    PaginatorComponent,
    SelectComponent,
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
    CasoDetallePanelComponent,
    ReactiveFormsModule,
    ParagraphComponent, 
  ],
  selector: 'app-casos-list-page',
  templateUrl: './casos-list-page.html',
})
export class CasosListPage{
  private readonly casosService = inject(CasosService);
  private readonly responsablesService = inject(ResponsablesService);
  private readonly toastService = inject(ToastService);
  private readonly recargarCasos$ = new Subject<void>();
  readonly casos = signal<Caso[]>([]);
  readonly totalCasos = signal(0);
  readonly totalPaginasApi = signal(1);
  readonly cargandoCasos = signal(false);
  readonly errorListado = signal('');
  readonly guardando = signal(false);
  readonly cargandoDetalle = signal(false);
  readonly errorDetalle = signal('');
  readonly errorResponsables = signal('');
  readonly modoEdicion = signal(false);
  readonly modoCreacion = signal(false);
  readonly formularioEdicion = signal<CasoFormularioEdicion>(crearFormularioEdicion());
  readonly busquedaControl = new FormControl('');

  busqueda = signal('');
  estadoSeleccionado = signal<CasoEstado | ''>('');
  prioridadSeleccionada = signal<CasoPrioridad | ''>('');
  paginaActual = signal(1);
  
  readonly elementosPorPagina = 5;
  readonly casoSeleccionado = signal<Caso | null>(null);
  readonly mostrarPanel = signal(false);

  readonly estados: SelectOption[] = ESTADOS_SELECT;
  readonly prioridades: SelectOption[] = PRIORIDADES_SELECT;
  readonly responsablesOptions = signal<SelectOption[]>([]);

  constructor() {
    this.escucharBusqueda();
    this.cargarResponsables();

    this.recargarCasos$
      .pipe(
        debounceTime(250),
        switchMap(() => {
          this.cargandoCasos.set(true);
          this.errorListado.set('');
          const filtros = this.filtrosApi();
          const respuesta = this.busqueda().trim()
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
              .listar(this.paginaActual(), this.elementosPorPagina, filtros)
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
              this.cargandoCasos.set(false);
              this.errorListado.set('');
              this.toastService.error(
                obtenerMensajeErrorApi(error, 'No se pudieron cargar los casos. Intentá nuevamente.'),
              );
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
        this.cargandoCasos.set(false);
        this.casos.set(resultado.casos);
        this.totalCasos.set(resultado.total);
        this.totalPaginasApi.set(resultado.totalPaginas);
      });
    this.recargarCasos$.next();
  }

  private escucharBusqueda(): void {
    this.busquedaControl.valueChanges
      .pipe(
        debounceTime(250),
        takeUntilDestroyed(),
      )
      .subscribe((valor) => {
        this.cambiarBusqueda(valor ?? '');
      });
  }

  private cargarResponsables(): void {
    this.errorResponsables.set('');
    this.responsablesService.listar().subscribe({
      next: (responsables) => {
        this.responsablesOptions.set(crearOpcionesResponsables(responsables));
      },
      error: (error) => {
        console.error('Error al cargar responsables:', error);
        this.errorResponsables.set('');
        this.toastService.error(
          obtenerMensajeErrorApi(error, 'No se pudieron cargar los responsables.'),
        );
      },
    });
  }

  readonly casosFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();

    if (!texto) {
      return this.casos();
    }

    return this.casos().filter((caso) =>
      caso.titulo.toLowerCase().includes(texto) ||
      caso.responsableNombre.toLowerCase().includes(texto) ||
      String(caso.id).includes(texto),
    );
  });

  readonly totalPaginas = computed(() =>
    this.busqueda().trim()
      ? Math.max(1, Math.ceil(this.casosFiltrados().length / this.elementosPorPagina,),)
      : this.totalPaginasApi(),
  );

  readonly casosPaginados = computed(() => {
    if (!this.busqueda().trim()) {
      return this.casos();
    }

    const inicio = (this.paginaActual() - 1) * this.elementosPorPagina;

    return this.casosFiltrados().slice(
      inicio,
      inicio + this.elementosPorPagina,
    );
  });

  readonly desde = computed(() =>
    this.totalElementos() === 0 ? 0 : (this.paginaActual() - 1) * this.elementosPorPagina + 1,
  );

  readonly hasta = computed(() =>
    Math.min(this.paginaActual() * this.elementosPorPagina,this.totalElementos(),)
  );

  readonly totalElementos = computed(() =>
    this.busqueda().trim() ? this.casosFiltrados().length : this.totalCasos(),
  );

  readonly paginas = computed(() =>
    Array.from({ length: this.totalPaginas() }, (_, indice) => indice + 1,),
  );

  readonly formularioEdicionValido = computed(
    () => this.formularioEdicion().valid,
  );

  cambiarBusqueda(valor: string): void {
    this.busqueda.set(valor);
    this.paginaActual.set(1);
    this.recargarCasos$.next();
  }

  cambiarEstado(valor: string): void {
    this.estadoSeleccionado.set(valor as CasoEstado | '');
    this.paginaActual.set(1);
    this.recargarCasos$.next();
  }

  cambiarPrioridad(valor: string): void {
    this.prioridadSeleccionada.set(valor as CasoPrioridad | '');
    this.paginaActual.set(1);
    this.recargarCasos$.next();
  }

  irAPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas()) {
      return;
    }

    this.paginaActual.set(pagina);

    if (!this.busqueda().trim()) {
      this.recargarCasos$.next();
    }
  }
  
  readonly filtrosApi = computed<FiltrosCasos>(() => ({
    estado: this.estadoSeleccionado() || undefined,
    prioridad: this.prioridadSeleccionada() || undefined,
  }));
  abrirDetalle(caso: Caso): void {
    this.casoSeleccionado.set(null);
    this.cargandoDetalle.set(true);
    this.errorDetalle.set('');
    this.mostrarPanel.set(true);
    this.casosService.obtener(caso.id).subscribe({
      next: (detalle) => {
        this.casoSeleccionado.set(detalle);
        this.cargandoDetalle.set(false);
        this.modoEdicion.set(false);
      },
      error: (error) => {
        console.error('Error al obtener el detalle del caso:', error);
        this.cargandoDetalle.set(false);
        this.errorDetalle.set('');
        this.toastService.error(
          error.status === 404
            ? `No se encontró el caso #${caso.id}.`
            : obtenerMensajeErrorApi(error, 'No se pudo cargar el detalle del caso.'),
        );
      },
    });
  }

  iniciarEdicion(caso: Caso): void {
    this.casoSeleccionado.set(caso);
    const responsableId = caso.responsableId == null
      ? this.responsablesOptions().find((option) => option.label === caso.responsableNombre)?.value ?? ''
      : String(caso.responsableId);
    this.formularioEdicion.set(
      crearFormularioEdicion({ ...caso, responsableId: responsableId ? Number(responsableId) : null }),
    );

    this.responsablesOptions.update((opciones) => {
      const actual = caso.responsableNombre.trim();

      if (!responsableId || opciones.some((option) => option.value === responsableId)) {
        return opciones;
      }

      return [{ label: actual || `Responsable #${responsableId}`, value: responsableId }, ...opciones];
    });

    this.errorDetalle.set('');
    this.modoCreacion.set(false);
    this.modoEdicion.set(true);
    this.mostrarPanel.set(true);
  }

  guardarEdicion(): void {
    const caso = this.casoSeleccionado();

    if (!caso) {
      return;
    }
  
    const formulario = this.formularioEdicion();
    if (formulario.invalid) {
      formulario.markAllAsTouched();
      return;
    }

    const datos = formulario.getRawValue();
    this.guardando.set(true);

    this.casosService
      .modificar(caso.id, {
        titulo: datos.titulo.trim(),
        descripcion: datos.descripcion.trim(),
        estado: datos.estado,
        prioridad: datos.prioridad,
        responsableId: datos.responsableId ? Number(datos.responsableId) : null,
      })
      .subscribe({
        next: (casoActualizado) => {
          this.guardando.set(false);
          this.casoSeleccionado.set(casoActualizado);
          this.modoEdicion.set(false);
          this.mostrarPanel.set(false);
          this.toastService.success('Los cambios se guardaron correctamente.');
          this.recargarCasos$.next();
        },
        error: (error) => {
          console.error('Error al actualizar el caso:', error);
          this.guardando.set(false);
          this.toastService.error(
            obtenerMensajeErrorApi(error, 'No se pudieron guardar los cambios.'),
          );
        },
      });
  }

  guardarCreacion(): void {
    const formulario = this.formularioEdicion();
    if (formulario.invalid) {
      formulario.markAllAsTouched();
      return;
    }

    const datos = formulario.getRawValue();
    this.guardando.set(true);

    this.casosService
      .crear({
        titulo: datos.titulo.trim(),
        descripcion: datos.descripcion.trim(),
        estado: datos.estado,
        prioridad: datos.prioridad,
        responsableId: datos.responsableId ? Number(datos.responsableId) : null,
      })
      .subscribe({
        next: () => {
          this.guardando.set(false);
          this.cerrarPanel();
          this.formularioEdicion.set(crearFormularioEdicion());
          this.toastService.success('El caso se creó correctamente.');
          this.recargarCasos$.next();
        },
        error: (error) => {
          console.error('Error al crear el caso:', error);
          this.guardando.set(false);
          this.toastService.error(
            obtenerMensajeErrorApi(error, 'No se pudo crear el caso.'),
          );
        },
      });
  }

  eliminarCaso(): void {
    const caso = this.casoSeleccionado();
    if (!caso) {
      return;
    }
    const confirmado = window.confirm(`¿Eliminar el caso "${caso.titulo}"? Esta acción no se puede deshacer.`);

    if (!confirmado) {
      return;
    }

    this.guardando.set(true);
    this.casosService.eliminar(caso.id).subscribe({
      next: () => {
        this.guardando.set(false);
        this.cerrarPanel();
        this.toastService.success('El caso se eliminó correctamente.');
        this.recargarCasos$.next();
      },
      error: (error) => {
        console.error('Error al eliminar el caso:', error);
        this.guardando.set(false);
        this.toastService.error(
          obtenerMensajeErrorApi(error, 'No se pudo eliminar el caso.'),
        );
      },
    });
  }

  cerrarPanel(): void {
    this.mostrarPanel.set(false);
    this.modoEdicion.set(false);
    this.modoCreacion.set(false);
  }

  crearCaso(): void {
    this.casoSeleccionado.set(null);
    this.formularioEdicion.set(crearFormularioEdicion());
    this.modoEdicion.set(false);
    this.modoCreacion.set(true);
    this.mostrarPanel.set(true);
  }

  editarCaso(): void {
    const caso = this.casoSeleccionado();
    if (caso) {
      this.iniciarEdicion(caso);
    }
  }

  colorEstado(estado: CasoEstado): 'yellow' | 'blue' | 'green' | 'gray' {
    return getCaseStateColor(estado);
  }

  colorPrioridad(prioridad: CasoPrioridad): 'red' | 'yellow' | 'gray' {
    return getCasePriorityColor(prioridad);
  }
}
