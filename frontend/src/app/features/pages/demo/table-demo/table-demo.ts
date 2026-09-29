import { Component } from '@angular/core';
import { Caso } from '../../../services/casos/casos';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { TableComponent } from '../../../../shared/components/table.component/table.component';
import { TableBodyComponent } from '../../../../shared/components/table.component/table-body/table-body.component';
import { TableCellComponent } from '../../../../shared/components/table.component/table-cell/table-cell.component';
import { TableHeadComponent } from '../../../../shared/components/table.component/table-head/table-head.component';
import { TableHeaderCellComponent } from '../../../../shared/components/table.component/table-header-cell/table-header-cell.component';
import { TableRowComponent } from '../../../../shared/components/table.component/table-row/table-row.component';

@Component({
  imports: [
    BadgeComponent,
    TableBodyComponent,
    TableCellComponent,
    TableComponent,
    TableHeadComponent,
    TableHeaderCellComponent,
    TableRowComponent,
  ],
  selector: 'app-table-demo',
  styleUrl: './table-demo.css',
  templateUrl: './table-demo.html',
})
export class TableDemo {
  readonly casos: Caso[] = [
    {
      identificador: 1024,
      titulo: 'Error al iniciar sesión',
      estado: 'Abierto',
      prioridad: 'Alta',
      responsableAsignado: 'María González',
      fechaCreacion: '2026-09-20',
    },
    {
      identificador: 1025,
      titulo: 'Problema al guardar cambios',
      estado: 'En progreso',
      prioridad: 'Media',
      responsableAsignado: 'Juan Pérez',
      fechaCreacion: '2026-09-21',
    },
    {
      identificador: 1026,
      titulo: 'Actualizar datos de perfil',
      estado: 'Abierto',
      prioridad: 'Baja',
      responsableAsignado: 'Ana Gómez',
      fechaCreacion: '2026-09-22',
    },
    {
      identificador: 1027,
      titulo: 'Error en la búsqueda',
      estado: 'Cerrado',
      prioridad: 'Media',
      responsableAsignado: 'Pedro Ruiz',
      fechaCreacion: '2026-09-23',
    },
    {
      identificador: 1028,
      titulo: 'Carga lenta de la pantalla',
      estado: 'En progreso',
      prioridad: 'Alta',
      responsableAsignado: 'Lucía Fernández',
      fechaCreacion: '2026-09-24',
    },
    {
      identificador: 1029,
      titulo: 'Error al adjuntar archivos',
      estado: 'Abierto',
      prioridad: 'Alta',
      responsableAsignado: 'María González',
      fechaCreacion: '2026-09-25',
    },
    {
      identificador: 1030,
      titulo: 'Ajuste de estilos',
      estado: 'Cerrado',
      prioridad: 'Baja',
      responsableAsignado: 'Juan Pérez',
      fechaCreacion: '2026-09-26',
    },
  ];
}
