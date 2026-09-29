import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  readonly paginaActual = input.required<number>();
  readonly totalPaginas = input.required<number>();
  readonly paginas = input.required<number[]>();

  readonly cambiarPagina = output<number>();

  readonly puedeIrAnterior = computed(
    () => this.paginaActual() > 1,
  );

  readonly puedeIrSiguiente = computed(
    () => this.paginaActual() < this.totalPaginas(),
  );

  irAPagina(pagina: number): void {
    if (
      !Number.isInteger(pagina) ||
      pagina < 1 ||
      pagina > this.totalPaginas() ||
      pagina === this.paginaActual()
    ) {
      return;
    }

    this.cambiarPagina.emit(pagina);
  }

  irAnterior(): void {
    if (this.puedeIrAnterior()) {
      this.irAPagina(this.paginaActual() - 1);
    }
  }

  irSiguiente(): void {
    if (this.puedeIrSiguiente()) {
      this.irAPagina(this.paginaActual() + 1);
    }
  }
}