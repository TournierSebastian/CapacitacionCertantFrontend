import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { BlockContainerComponent } from '../../../../shared/components/block-container/block-container.component';

@Component({
  selector: 'app-block-container-demo',
  standalone: true,
  imports: [BlockContainerComponent],
  templateUrl: './block-container-demo.html',
  styleUrl: './block-container-demo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockContainerDemo {}