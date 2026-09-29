import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';


@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './paginatordemo.html',
  styleUrl: './paginatordemo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Paginatordemo{
  readonly totalPaginas = 5;

  paginaActual = 1;

  readonly paginas = [1, 2, 3, 4, 5];

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
  }
}