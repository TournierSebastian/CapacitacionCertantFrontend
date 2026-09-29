import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-side-panel-header',
  imports: [ButtonComponent],
  standalone: true,
  templateUrl: './side-panel-header.component.html',
  styleUrl: './side-panel-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelHeaderComponent {
  readonly closed = output<void>();
}