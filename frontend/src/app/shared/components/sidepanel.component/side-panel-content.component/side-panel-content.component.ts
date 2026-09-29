import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-side-panel-content',
  standalone: true,
  templateUrl: './side-panel-content.component.html',
  styleUrl: './side-panel-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelContentComponent {}