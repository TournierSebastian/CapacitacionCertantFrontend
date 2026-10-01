import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { Caso, CasoEstado, CasoPrioridad } from './casos.model';

export interface CasoFormularioControles {
  titulo: FormControl<string>;
  descripcion: FormControl<string>;
  estado: FormControl<CasoEstado>;
  prioridad: FormControl<CasoPrioridad>;
  responsableId: FormControl<string>;
}

export type CasoFormularioEdicion = FormGroup<CasoFormularioControles>;

export function crearFormularioEdicion(caso?: Partial<Caso>): CasoFormularioEdicion {
  return new FormGroup<CasoFormularioControles>({
    titulo: new FormControl(caso?.titulo ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    }),
    descripcion: new FormControl(caso?.descripcion ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(1000)],
    }),
    estado: new FormControl(caso?.estado ?? 'Abierto', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    prioridad: new FormControl(caso?.prioridad ?? 'Media', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    responsableId: new FormControl(
      caso?.responsableId == null ? '' : String(caso.responsableId),
      { nonNullable: true },
    ),
  });
}
