import { Component } from '@angular/core';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import type { SelectOption } from '../../../../shared/components/select/select.component';

@Component({
  selector: 'app-selectdemo',
  standalone: true,
  imports: [SelectComponent],
  templateUrl: './selectdemo.html',
  styleUrl: './selectdemo.css',
})
export class Selectdemo {
  estadoSeleccionado = '';

  readonly estados: SelectOption[] = [
    { label: 'Abierto', value: 'Abierto' },
    { label: 'En progreso', value: 'En progreso' },
    { label: 'Cerrado', value: 'Cerrado' },
  ];

}