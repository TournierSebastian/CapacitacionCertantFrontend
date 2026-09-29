import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  readonly options = input.required<SelectOption[]>();
  readonly placeholder = input('Seleccionar');
  readonly ariaLabel = input('Seleccionar una opción');

  readonly value = model('');

  protected onChange(event: Event): void {
    const select = event.target;

    if (select instanceof HTMLSelectElement) {
      this.value.set(select.value);
    }
  }

}