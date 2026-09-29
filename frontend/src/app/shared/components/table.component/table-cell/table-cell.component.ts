import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-table-cell',
  standalone: true,
  templateUrl: './table-cell.component.html',
  styleUrl: './table-cell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellComponent {
  readonly colspan = input<number | null>(null);
  readonly rowspan = input<number | null>(null);
}