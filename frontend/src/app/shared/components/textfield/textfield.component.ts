import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type TextfieldType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

@Component({
  selector: 'app-textfield',
  standalone: true,
  templateUrl: './textfield.component.html',
  styleUrl: './textfield.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextfieldComponent), multi: true }],
})
export class TextfieldComponent implements ControlValueAccessor {
  readonly value = signal('');
  readonly disabled = signal(false);
  readonly placeholder = input('');
  readonly label = input('');
  readonly type = input<TextfieldType>('text');
  readonly icon = input<string | null>(null);
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected onInput(event: Event): void {
    const target = event.target;

    if (target instanceof HTMLInputElement) {
      this.value.set(target.value);
      this.onChange(target.value);
    }
  }

  protected onBlur(): void {
    this.onTouched();
  }
}