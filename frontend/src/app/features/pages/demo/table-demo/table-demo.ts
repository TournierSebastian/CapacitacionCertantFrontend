import { Component } from '@angular/core';

import { Caso } from '../../../models/casos/casos.model';

import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { TableComponent } from '../../../../shared/components/table.component/table.component';
import { TableBodyComponent } from '../../../../shared/components/table.component/table-body/table-body.component';
import { TableCellComponent } from '../../../../shared/components/table.component/table-cell/table-cell.component';
import { TableHeadComponent } from '../../../../shared/components/table.component/table-head/table-head.component';
import { TableHeaderCellComponent } from '../../../../shared/components/table.component/table-header-cell/table-header-cell.component';
import { TableRowComponent } from '../../../../shared/components/table.component/table-row/table-row.component';

@Component({
  selector: 'app-table-demo',
  imports: [
    BadgeComponent,
    TableComponent,
    TableBodyComponent,
    TableCellComponent,
    TableHeadComponent,
    TableHeaderCellComponent,
    TableRowComponent,
  ],
  templateUrl: './table-demo.html',
  styleUrl: './table-demo.css',
})
export class TableDemo {
  readonly casos: Caso[] = [
    {
      id: 1024,
      titulo: 'Error al iniciar sesión',
      descripcion: '',
      estado: 'Abierto',
      prioridad: 'Alta',
      responsableId: 1,
      responsableNombre: 'María González',
      fechaCreacion: '2026-09-20',
    },
    {
      id: 1025,
      titulo: 'Problema al guardar cambios',
      descripcion: '',
      estado: 'En progreso',
      prioridad: 'Media',
      responsableId: 2,
      responsableNombre: 'Juan Pérez',
      fechaCreacion: '2026-09-21',
    },
    {
      id: 1026,
      titulo: 'Actualizar datos de perfil',
      descripcion: '',
      estado: 'Abierto',
      prioridad: 'Baja',
      responsableId: 3,
      responsableNombre: 'Ana Gómez',
      fechaCreacion: '2026-09-22',
    },
    {
      id: 1027,
      titulo: 'Error en la búsqueda',
      descripcion: '',
      estado: 'Cerrado',
      prioridad: 'Media',
      responsableId: 4,
      responsableNombre: 'Pedro Ruiz',
      fechaCreacion: '2026-09-23',
    },
    {
      id: 1028,
      titulo: 'Carga lenta de la pantalla',
      descripcion: '',
      estado: 'En progreso',
      prioridad: 'Alta',
      responsableId: 5,
      responsableNombre: 'Lucía Fernández',
      fechaCreacion: '2026-09-24',
    },
    {
      id: 1029,
      titulo: 'Error al adjuntar archivos',
      descripcion: '',
      estado: 'Abierto',
      prioridad: 'Alta',
      responsableId: 1,
      responsableNombre: 'María González',
      fechaCreacion: '2026-09-25',
    },
    {
      id: 1030,
      titulo: 'Ajuste de estilos',
      descripcion: '',
      estado: 'Cerrado',
      prioridad: 'Baja',
      responsableId: 2,
      responsableNombre: 'Juan Pérez',
      fechaCreacion: '2026-09-26',
    },
  ];
}