import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

type BadgeColor = 'green' | 'blue' | 'gray' | 'red' | 'yellow';

@Component({
  selector: 'app-badgecomponent',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  readonly color = input<BadgeColor>('gray');
  readonly shadow = input(false);

  readonly badgeClasses = computed(() => [
    'badge',
    `badge--${this.color()}`,
    ...(this.shadow() ? ['badge--shadow'] : []),
  ]);
}