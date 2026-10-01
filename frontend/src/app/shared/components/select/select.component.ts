import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }],
})
export class SelectComponent implements ControlValueAccessor {
  readonly options = input.required<readonly SelectOption[]>();
  readonly placeholder = input('Seleccionar');
  readonly ariaLabel = input('Seleccionar una opción');

  readonly value = model('');
  readonly disabled = signal(false);
  private propagateChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.propagateChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected onSelectChange(event: Event): void {
    const select = event.target;

    if (select instanceof HTMLSelectElement) {
      this.value.set(select.value);
      this.propagateChange(select.value);
      this.onTouched();
    }
  }
}