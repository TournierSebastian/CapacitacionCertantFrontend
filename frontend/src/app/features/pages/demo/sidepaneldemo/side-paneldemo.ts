import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { SidePanelComponent } from '../../../../shared/components/sidepanel.component/side-panel.component';
import { SidePanelHeaderComponent } from '../../../../shared/components/sidepanel.component/side-panel-header.component/side-panel-header.component';
import { SidePanelContentComponent } from '../../../../shared/components/sidepanel.component/side-panel-content.component/side-panel-content.component';
import { SidePanelFooterComponent } from '../../../../shared/components/sidepanel.component/side-panel-footer.component/side-panel-footer.component';

@Component({
  selector: 'app-side-panel-demo',
  standalone: true,
  imports: [
    SidePanelComponent,
    SidePanelHeaderComponent,
    SidePanelContentComponent,
    SidePanelFooterComponent,
  ],
  templateUrl: './side-paneldemo.html',
  styleUrl: './side-paneldemo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelDemoComponent {
  panelAbierto = false;

  abrirPanel(): void {
    this.panelAbierto = true;
  }
}