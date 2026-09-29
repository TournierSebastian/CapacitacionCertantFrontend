import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Caso {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'Abierto' | 'En progreso' | 'Cerrado';
  prioridad: 'Alta' | 'Media' | 'Baja';
  responsable: string;
  fecha: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  busqueda = '';
  estadoSeleccionado = '';
  prioridadSeleccionada = '';
  paginaActual = 1;
  elementosPorPagina = 5;

  casoSeleccionado: Caso | null = null;
  mostrarPanel = false;

  casos: Caso[] = [
    {
      id: 1,
      titulo: 'Error al iniciar sesión',
      descripcion: 'El usuario no puede ingresar con sus credenciales.',
      estado: 'Abierto',
      prioridad: 'Alta',
      responsable: 'María López',
      fecha: '2026-09-20',
    },
    {
      id: 2,
      titulo: 'Problema al guardar cambios',
      descripcion: 'Los cambios realizados no se guardan correctamente.',
      estado: 'En progreso',
      prioridad: 'Media',
      responsable: 'Juan Pérez',
      fecha: '2026-09-21',
    },
    {
      id: 3,
      titulo: 'Actualizar datos de perfil',
      descripcion: 'No se actualiza la información del perfil.',
      estado: 'Abierto',
      prioridad: 'Baja',
      responsable: 'Ana Gómez',
      fecha: '2026-09-22',
    },
    {
      id: 4,
      titulo: 'Error en la búsqueda',
      descripcion: 'El buscador no devuelve todos los resultados.',
      estado: 'Cerrado',
      prioridad: 'Media',
      responsable: 'Pedro Ruiz',
      fecha: '2026-09-23',
    },
    {
      id: 5,
      titulo: 'Carga lenta de la pantalla',
      descripcion: 'La pantalla principal tarda en cargar.',
      estado: 'En progreso',
      prioridad: 'Alta',
      responsable: 'Lucía Fernández',
      fecha: '2026-09-24',
    },
    {
      id: 6,
      titulo: 'Error al adjuntar archivos',
      descripcion: 'No permite adjuntar documentos al caso.',
      estado: 'Abierto',
      prioridad: 'Alta',
      responsable: 'María López',
      fecha: '2026-09-25',
    },
    {
      id: 7,
      titulo: 'Ajuste de estilos',
      descripcion: 'Corregir el espaciado de algunos elementos.',
      estado: 'Cerrado',
      prioridad: 'Baja',
      responsable: 'Juan Pérez',
      fecha: '2026-09-26',
    },
  ];

  get casosFiltrados(): Caso[] {
    const texto = this.busqueda.trim().toLowerCase();

    return this.casos.filter((caso) => {
      const coincideTexto =
        !texto ||
        caso.titulo.toLowerCase().includes(texto) ||
        caso.responsable.toLowerCase().includes(texto) ||
        String(caso.id).includes(texto);

      const coincideEstado =
        !this.estadoSeleccionado ||
        caso.estado === this.estadoSeleccionado;

      const coincidePrioridad =
        !this.prioridadSeleccionada ||
        caso.prioridad === this.prioridadSeleccionada;

      return coincideTexto && coincideEstado && coincidePrioridad;
    });
  }

  get totalPaginas(): number {
    return Math.max(
      1,
      Math.ceil(this.casosFiltrados.length / this.elementosPorPagina)
    );
  }

  get casosPaginados(): Caso[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;

    return this.casosFiltrados.slice(
      inicio,
      inicio + this.elementosPorPagina
    );
  }

  get desde(): number {
    return this.casosFiltrados.length === 0
      ? 0
      : (this.paginaActual - 1) * this.elementosPorPagina + 1;
  }

  get hasta(): number {
    return Math.min(
      this.paginaActual * this.elementosPorPagina,
      this.casosFiltrados.length
    );
  }

  cambiarFiltros(): void {
    this.paginaActual = 1;
  }

  irAPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  abrirDetalle(caso: Caso): void {
    this.casoSeleccionado = caso;
    this.mostrarPanel = true;
  }

  cerrarPanel(): void {
    this.mostrarPanel = false;
    this.casoSeleccionado = null;
  }

  crearCaso(): void {
    console.log('Crear caso');
  }

  editarCaso(caso: Caso): void {
    console.log('Editar caso:', caso);
  }

  get paginas(): number[] {
    return Array.from(
      { length: this.totalPaginas },
      (_, indice) => indice + 1
    );
  }
}