import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-table-header-cell',
  standalone: true,
  templateUrl: './table-header-cell.component.html',
  styleUrl: './table-header-cell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderCellComponent {
  readonly scope = input<'col' | 'row' | 'colgroup' | 'rowgroup'>('col');
}