import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-side-panel-footer',
  standalone: true,
  templateUrl: './side-panel-footer.component.html',
  styleUrl: './side-panel-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelFooterComponent {}