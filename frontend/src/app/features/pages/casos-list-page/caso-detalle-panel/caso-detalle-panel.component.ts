import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SelectComponent, type SelectOption } from '../../../../shared/components/select/select.component';
import { SidePanelComponent } from '../../../../shared/components/sidepanel.component/side-panel.component';
import { SidePanelContentComponent } from '../../../../shared/components/sidepanel.component/side-panel-content.component/side-panel-content.component';
import { SidePanelFooterComponent } from '../../../../shared/components/sidepanel.component/side-panel-footer.component/side-panel-footer.component';
import { SidePanelHeaderComponent } from '../../../../shared/components/sidepanel.component/side-panel-header.component/side-panel-header.component';
import { BlockLayoutComponent } from '../../../../shared/components/block-layout/block-layout.component';
import { TextfieldComponent } from '../../../../shared/components/textfield/textfield.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { ParagraphComponent } from '../../../../shared/components/paragraph/paragraph.component';
import type { Caso } from '../../../models/casos/casos.model';
import type { CasoFormularioEdicion } from '../../../models/casos/casos-form.model';
import { getCasePriorityColor, getCaseStateColor } from '../casos-list-page.utils';

@Component({
  selector: 'app-caso-detalle-panel',
  standalone: true,
  imports: [
    BadgeComponent,
    ButtonComponent,
    ReactiveFormsModule,
    SelectComponent,
    SidePanelComponent,
    SidePanelContentComponent,
    SidePanelFooterComponent,
    SidePanelHeaderComponent,
    TextfieldComponent,
    ParagraphComponent,
  ],
  templateUrl: './caso-detalle-panel.component.html',
})
export class CasoDetallePanelComponent {
  readonly caso = input<Caso | null>(null);
  readonly open = input(false);
  readonly modoEdicion = input(false);
  readonly modoCreacion = input(false);
  readonly formulario = input.required<CasoFormularioEdicion>();
  readonly estados = input<SelectOption[]>([]);
  readonly prioridades = input<SelectOption[]>([]);
  readonly responsablesOptions = input<SelectOption[]>([]);
  readonly guardando = input(false);
  readonly cargandoDetalle = input(false);
  readonly errorDetalle = input('');
  readonly errorResponsables = input('');

  readonly cerrar = output<void>();
  readonly editar = output<void>();
  readonly guardar = output<void>();
  readonly crear = output<void>();
  readonly eliminar = output<void>();

  protected readonly colorEstado = getCaseStateColor;
  protected readonly colorPrioridad = getCasePriorityColor;

}
