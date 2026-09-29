import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-table-row',
  standalone: true,
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowComponent {
  readonly interactive = input(false);
  readonly rowClick = output<void>();

  protected onClick(): void {
    if (this.interactive()) {
      this.rowClick.emit();
    }
  }

  protected onKeydown(event: Event): void {
    if (this.interactive()) {
      event.preventDefault();
      this.rowClick.emit();
    }
  }
}