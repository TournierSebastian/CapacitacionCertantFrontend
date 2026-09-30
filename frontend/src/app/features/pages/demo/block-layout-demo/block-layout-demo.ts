import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { BlockLayoutComponent } from '../../../../shared/components/block-layout/block-layout.component';

@Component({
  selector: 'app-block-layout-demo',
  standalone: true,
  imports: [BlockLayoutComponent],
  templateUrl: './block-layout-demo.html',
  styleUrl: './block-layout-demo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockLayoutDemo{}