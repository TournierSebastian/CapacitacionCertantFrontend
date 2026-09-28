import { Component, inject, OnInit } from '@angular/core';
import { ResponsablesService } from '../../services/responsables/responsables';

@Component({
  imports: [],
  selector: 'app-responsables-page',
  styleUrl: './responsables-page.css',
  templateUrl: './responsables-page.html',
})
export class ResponsablesPage implements OnInit {

  private readonly responsablesService = inject(ResponsablesService);

  ngOnInit(): void {
    this.cargarResponsables();
  }

  cargarResponsables(): void {
    this.responsablesService.listar({ page: 2 }).subscribe({
      next: (respuesta) => {
        console.log('Responsables:', respuesta);
      },
      error: (error) => {
        console.error('Error al cargar responsables:', error);
      },
    });
  }
}
