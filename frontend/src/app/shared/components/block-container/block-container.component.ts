import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type BlockAppearance = 'plain' | 'surface';

@Component({
  selector: 'app-block-container',
  standalone: true,
  templateUrl: './block-container.component.html',
  styleUrl: './block-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockContainerComponent {
  readonly appearance = input<BlockAppearance>('plain');
  readonly padding = input('0');

  readonly containerClasses = computed(() => [
    'block-container',
    `block-container--${this.appearance()}`,
  ]);
}