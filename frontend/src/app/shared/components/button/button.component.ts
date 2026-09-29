import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

type ButtonVariant = 'primary' | 'secondary'| 'tertiary' | 'disabled';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly disabled = input(false);
  readonly ariaLabel = input<string | null>(null);

  readonly clicked = output<void>();

  readonly buttonClasses = computed(() => [
    'btn',
    `btn--${this.variant()}`,
  ]);

  protected  onClick(): void {
    this.clicked.emit();
  }
}