import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { FlexLayoutComponent } from '../../../../shared/components/flex-layout/flex-layout.component';

@Component({
  selector: 'app-flex-layout-demo',
  standalone: true,
  imports: [FlexLayoutComponent],
  templateUrl: './flex-layout-demo.html',
  styleUrl: './flex-layout-demo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutDemo{}