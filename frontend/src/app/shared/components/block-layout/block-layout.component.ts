import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-block-layout',
  standalone: true,
  templateUrl: './block-layout.component.html',
  styleUrl: './block-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockLayoutComponent {
  readonly gap = input('0');
}