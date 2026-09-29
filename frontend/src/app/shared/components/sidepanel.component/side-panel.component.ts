import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  effect,
  inject,
  model,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

import { SidePanelHeaderComponent } from './side-panel-header.component/side-panel-header.component';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [A11yModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelComponent {
  readonly open = model(false);

  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);

  private readonly header = contentChild(SidePanelHeaderComponent);

  constructor() {
    this.escucharCierreDelHeader();
    this.bloquearScrollDelFondo();
  }

  cerrar(): void {
    this.open.set(false);
  }

  private escucharCierreDelHeader(): void {
    effect((onCleanup) => {
      const header = this.header();

      if (!header) {
        return;
      }

      const subscription = header.closed.subscribe(() => {
        this.cerrar();
      });

      onCleanup(() => subscription.unsubscribe());
    });
  }

  private bloquearScrollDelFondo(): void {
    effect((onCleanup) => {
      if (!this.open()) {
        return;
      }

      const body = this.document.body;
      const previousOverflow = body.style.overflow;

      this.renderer.setStyle(body, 'overflow', 'hidden');

      onCleanup(() => {
        this.renderer.setStyle(body, 'overflow', previousOverflow);
      });
    });
  }
}