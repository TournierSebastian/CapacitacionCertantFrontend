import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

type TextfieldType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

@Component({
  selector: 'app-textfield',
  standalone: true,
  templateUrl: './textfield.component.html',
  styleUrl: './textfield.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextfieldComponent {
  readonly value = model('');
  readonly placeholder = input('');
  readonly label = input('');
  readonly type = input<TextfieldType>('text');
  readonly icon = input<string | null>(null);

  protected onInput(event: Event): void {
    const target = event.target;

    if (target instanceof HTMLInputElement) {
      this.value.set(target.value);
    }
  }
}