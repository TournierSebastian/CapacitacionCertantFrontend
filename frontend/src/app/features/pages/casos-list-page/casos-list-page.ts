import { Component, inject, OnInit } from '@angular/core';
import { CasosService } from '../../services/casos/casos';
import { TablaCasos } from '../../../shared/components/tabla-casos/tabla-casos';
import { Caso } from '../../services/casos/casos';

@Component({
  imports: [TablaCasos],
  selector: 'app-casos-list-page',
  styleUrl: './casos-list-page.css',
  templateUrl: './casos-list-page.html',
})
export class CasosListPage implements OnInit {

  private readonly casosService = inject(CasosService);
  casos: Caso[] = [];

  ngOnInit(): void {
    this.casosService.listar().subscribe({
      next: (respuesta) => {
        this.casos = respuesta;
      },
      error: (error) => {
        console.error('Error al obtener los casos:', error);
      }
    });
  }

}
